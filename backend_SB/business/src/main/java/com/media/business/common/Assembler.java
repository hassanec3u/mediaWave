package com.media.business.common;

import java.util.List;

/**
 * Generic interface for converting between Entity and DTO.
 *
 * @param <E> the entity type
 * @param <D> the DTO type
 */
public interface Assembler<E, D> {

    /**
     * Converts an entity to its corresponding DTO.
     *
     * @param entity the entity to convert
     * @return the converted DTO
     */
    D toDto(E entity);

    /**
     * Converts a DTO to its corresponding entity.
     *
     * @param dto the DTO to convert
     * @return the converted entity
     */
    E fromDto(D dto);


    /**
     * Converts a list of entities to a list of DTOs.
     *
     * @param entities the list of entities to convert
     * @return the list of converted DTOs
     */
    List<D> toDtoList(List<E> entities);

    /**
     * Converts a list of DTOs to a list of entities.
     *
     * @param dtos the list of DTOs to convert
     * @return the list of converted entities
     */
    List<E> fromDtoList(List<D> dtos);
}
