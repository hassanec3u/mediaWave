package com.media.business.user;


import com.media.domain.model.User;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    UserInfoDto toDto(User user);

    User fromDto(UserInfoDto dto);

    void updateUserFromDto(UserInfoDto dto, @MappingTarget User user);

}