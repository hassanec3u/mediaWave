package com.media.business.user;


import com.media.business.common.Assembler;
import com.media.domain.model.User;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserAssembler implements Assembler<User, UserInfoDto> {

    @Override
    public UserInfoDto toDto(User entity) {

        if (entity == null) {
            return null;
        }
        UserInfoDto dto = new UserInfoDto();
        dto.setId(entity.getId());
        dto.setUsername(entity.getUsername());
        dto.setEmail(entity.getEmail());
        dto.setProfilePicture(entity.getProfilePicture());
        dto.setBio(entity.getBio());
        dto.setBirthday(entity.getBirthday());
        dto.setPays(entity.getPays());
        return dto;
    }

    @Override
    public User fromDto(UserInfoDto dto) {

        if (dto == null) {
            return null;
        }
        User user = new User();
        user.setId(dto.getId());
        user.setUsername(dto.getUsername());
        user.setEmail(dto.getEmail());
        user.setProfilePicture(dto.getProfilePicture());
        user.setBio(dto.getBio());
        user.setBirthday(dto.getBirthday());
        user.setPays(dto.getPays());
        return user;
    }

    public void updateEntity(User target, UserInfoDto dto) {

        if (dto == null || target == null) {
            return;
        }

        if (dto.getProfilePicture() != null) target.setProfilePicture(dto.getProfilePicture());
        if (dto.getBio() != null) target.setBio(dto.getBio());
        if (dto.getBirthday() != null) target.setBirthday(dto.getBirthday());
        if (dto.getPays() != null) target.setPays(dto.getPays());
    }

    @Override
    public List<UserInfoDto> toDtoList(List<User> entities) {

        if (entities == null) {
            return List.of();
        }
        return entities.stream().map(this::toDto).toList();
    }

    @Override
    public List<User> fromDtoList(List<UserInfoDto> dtos) {

        if (dtos == null) {
            return List.of();
        }
        return dtos.stream().map(this::fromDto).toList();
    }
}
