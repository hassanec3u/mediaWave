package com.media.business.post;


import com.media.business.common.Assembler;
import com.media.domain.model.Post;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostAssembler implements Assembler<Post, PostDto> {

    /**
     * {@inheritDoc}
     */
    @Override
    public PostDto toDto(Post entity) {

        if (entity == null) {
            return null;
        }
        PostDto dto = new PostDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setContent(entity.getContent());
        dto.setPostPicture(entity.getPostPicture());
        dto.setPostDate(entity.getPostDate());
        dto.setPublisherId(entity.getPublisherId());
        dto.setPublisherName(entity.getPublisherName());
        dto.setLikeUserIds(entity.getLikeUserIds() != null ? entity.getLikeUserIds() : List.of());
        return dto;

    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Post fromDto(PostDto dto) {

        if (dto == null) {
            return null;
        }
        Post entitie = new Post();
        entitie.setId(dto.getId());
        entitie.setTitle(dto.getTitle());
        entitie.setContent(dto.getContent());
        entitie.setPostPicture(dto.getPostPicture());
        entitie.setPostDate(dto.getPostDate());
        entitie.setPublisherId(dto.getPublisherId());
        entitie.setPublisherName(dto.getPublisherName());
        entitie.setLikeUserIds(dto.getLikeUserIds() != null ? dto.getLikeUserIds() : List.of());
        return entitie;
    }

    @Override
    public List<PostDto> toDtoList(List<Post> entities) {

        if (entities == null) {
            return List.of();
        }
        return entities.stream().map(this::toDto).toList();

    }

    @Override
    public List<Post> fromDtoList(List<PostDto> dtos) {

        if (dtos == null) {
            return List.of();
        }
        return dtos.stream().map(this::fromDto).toList();
    }
}
