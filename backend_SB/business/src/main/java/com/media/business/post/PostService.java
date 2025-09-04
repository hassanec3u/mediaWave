package com.media.business.post;

import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.User;
import com.media.domain.model.Post;
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
    private CustomUserDetailsService customUserDetailsService;

    public PostDto save(PostDto dto) {
        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        dto.setPublisherId(currentUser.getId());

        if (dto.getId() != null) {
            Optional<Post> existingPost = this.postRepository.findById(dto.getId());
            if (existingPost.isPresent()) {
                dto.setPublisherName(existingPost.get().getPublisherName());
                dto.setPublisherId(existingPost.get().getPublisherId());
            } else {
                dto.setPublisherName(currentUser.getUsername());
                dto.setPublisherId(currentUser.getId());
            }
        } else {
            dto.setPublisherName(currentUser.getUsername());
            dto.setPublisherId(currentUser.getId());
        }

        return this.postAssembler.toDto(this.postRepository.save(this.postAssembler.fromDto(dto)));
    }



    public List<PostDto> getMyPosts() {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        List<Post> posts = this.postRepository.findByPublisherIdOrderByPostDateDesc(currentUser.getId());
        return this.postAssembler.toDtoList(posts);

    }

    public List<PostDto> getFriendsPosts() {

        User currentUser = this.customUserDetailsService.getAuthenticatedUser();

        List<User> friend = currentUser.getFriends();
        List<String> friendIds = friend.stream().map(User::getId).toList();
        List<Post> posts = this.postRepository.findByPublisherIdInOrderByPostDateDesc(friendIds);

        return this.postAssembler.toDtoList(posts);
    }


    public void delete(String postId) {

        this.postRepository.deleteById(postId);
    }

    public Optional<Post> findPostById(String postId) {

        return this.postRepository.findById(postId);
    }

}
