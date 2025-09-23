package com.media.business.post;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.business.comment.CommentAssembler;
import com.media.business.filestorage.FileStorageService;
import com.media.domain.model.Post;
import com.media.domain.model.User;
import com.media.domain.repository.CommentRepository;
import com.media.domain.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;


@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private PostAssembler postAssembler;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private CommentAssembler commentAssembler;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private FileStorageService fileStorageService;

    public PostDto save(PostDto postDto, MultipartFile file)    {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        postDto.setPublisherId(currentUser.getId());
        postDto.setPublisherName(currentUser.getUsername());
        postDto.setPublisherProfilePicture(currentUser.getProfilePicture());

        Post post;

        if (postDto.getId() != null) {
            Optional<Post> existingPostOpt = this.postRepository.findById(postDto.getId());
            if (existingPostOpt.isPresent()) {
                Post existingPost = existingPostOpt.get();
                postDto.setPublisherId(existingPost.getPublisherId());
                postDto.setPublisherName(existingPost.getPublisherName());
                postDto.setPublisherProfilePicture(existingPost.getPostPicture());
            }
        }

        post = this.postAssembler.fromDto(postDto);

        if (file != null && !file.isEmpty()) {
            String imageUrl;
            try {
                imageUrl = this.fileStorageService.uploadPostImage(post.getPublisherId(), file);
            } catch (IOException e) {
                throw new RuntimeException("Failed to upload image", e);
            }
            post.setPostPicture(imageUrl);
        }

        Post saved = this.postRepository.save(post);

        return this.postAssembler.toDto(saved);
    }


    //update post
    public PostDto update(PostDto dto) {

        Optional<Post> existingPostOpt = this.postRepository.findById(dto.getId());
        if (existingPostOpt.isEmpty()) {
            throw new RuntimeException("Post not found");
        }

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();
        Post existingPost = existingPostOpt.get();
        if (!existingPost.getPublisherId().equals(currentUser.getId())) {
            throw new RuntimeException("You are not the owner of this post");
        }

        dto.setPublisherName(existingPost.getPublisherName());
        dto.setPublisherId(existingPost.getPublisherId());

        return this.postAssembler.toDto(this.postRepository.save(this.postAssembler.fromDto(dto)));
    }


    public List<PostDto> getMyPosts() {
        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        List<Post> posts = this.postRepository.findByPublisherIdOrderByPostDateDesc(currentUser.getId());
        List<PostDto> postDtos = this.postAssembler.toDtoList(posts);

        attachPublisherProfilePictures(postDtos);
        return postDtos;
    }

    public List<PostDto> getFriendsPosts() {
        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        List<String> friendIds = currentUser.getFriends().stream()
                .map(User::getId)
                .toList();

        List<Post> posts = this.postRepository.findByPublisherIdInOrderByPostDateDesc(friendIds);
        List<PostDto> postDtos = this.postAssembler.toDtoList(posts);

        attachPublisherProfilePictures(postDtos);
        return postDtos;
    }


    public void delete(String postId) {

        this.postRepository.deleteById(postId);
    }

    public Optional<Post> findPostById(String postId) {

        return this.postRepository.findById(postId);
    }

    private void attachPublisherProfilePictures(List<PostDto> postDtos) {
        for (PostDto dto : postDtos) {
            Optional<User> publisherOpt = this.customUserDetailsService.findById(dto.getPublisherId());
            publisherOpt.ifPresent(user -> dto.setPublisherProfilePicture(user.getProfilePicture()));
        }
    }


}
