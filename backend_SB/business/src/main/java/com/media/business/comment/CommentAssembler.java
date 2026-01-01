package com.media.business.comment;

import com.media.business.common.Assembler;
import com.media.domain.model.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Assembler class for converting between Comment entities and CommentDto objects.
 */
@Service
public class CommentAssembler implements Assembler<Comment, CommentDto> {

    /**
     * {@inheritDoc}
     */
    @Override
    public CommentDto toDto(Comment entity) {

        if (entity == null) {
            return null;
        }
        CommentDto dto = new CommentDto();
        dto.setId(entity.getId());
        dto.setContent(entity.getContent());
        dto.setCreatedAt(entity.getCreatedAt());
        dto.setAuthorId(entity.getAuthorId());
        dto.setPostId(entity.getPostId());
        dto.setAuthorUsername(entity.getAuthorUsername());

        return dto;

    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Comment fromDto(CommentDto dto) {

        if (dto == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(dto.getId());
        comment.setContent(dto.getContent());
        comment.setCreatedAt(dto.getCreatedAt());
        comment.setAuthorId(dto.getAuthorId());
        comment.setPostId(dto.getPostId());
        comment.setAuthorUsername(dto.getAuthorUsername());

        return comment;
    }

    @Override
    public List<CommentDto> toDtoList(List<Comment> entities) {

        if (entities == null) {
            return List.of();
        }
        return entities.stream().map(this::toDto).toList();

    }

    @Override
    public List<Comment> fromDtoList(List<CommentDto> dtos) {

        if (dtos == null) {
            return List.of();
        }
        return dtos.stream().map(this::fromDto).toList();
    }
}
