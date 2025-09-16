package com.media.business.post;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.business.comment.CommentAssembler;
import com.media.domain.model.Post;
import com.media.domain.model.User;
import com.media.domain.repository.CommentRepository;
import com.media.domain.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public PostDto save(PostDto postDto) {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        postDto.setPublisherId(currentUser.getId());

        if (postDto.getId() != null) {
            Optional<Post> existingPost = this.postRepository.findById(postDto.getId());
            if (existingPost.isPresent()) {
                postDto.setPublisherName(existingPost.get().getPublisherName());
                postDto.setPublisherId(existingPost.get().getPublisherId());
            } else {
                postDto.setPublisherName(currentUser.getUsername());
                postDto.setPublisherId(currentUser.getId());
            }
        } else {
            postDto.setPublisherName(currentUser.getUsername());
            postDto.setPublisherId(currentUser.getId());
        }
        return this.postAssembler.toDto(this.postRepository.save(this.postAssembler.fromDto(postDto)));
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
