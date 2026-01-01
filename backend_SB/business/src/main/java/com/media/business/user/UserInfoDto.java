package com.media.business.user;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.media.business.common.SimpleDto;

import java.util.Date;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserInfoDto implements SimpleDto {

    private static final long serialVersionUID = 1L;

    private String id;

    private String username;

    private String email;

    private String profilePicture;

    private String bio;

    private Date birthday;

    private String pays;

    public String getId() {

        return this.id;
    }

    public void setId(String id) {

        this.id = id;
    }


    public String getUsername() {

        return this.username;
    }

    public void setUsername(String username) {

        this.username = username;
    }

    public String getEmail() {

        return this.email;
    }

    public void setEmail(String email) {

        this.email = email;
    }

    public String getProfilePicture() {

        return this.profilePicture;
    }

    public void setProfilePicture(String profilePicture) {

        this.profilePicture = profilePicture;
    }

    public String getBio() {

        return this.bio;
    }

    public void setBio(String bio) {

        this.bio = bio;
    }

    public Date getBirthday() {

        return this.birthday;
    }

    public void setBirthday(Date birthday) {

        this.birthday = birthday;
    }

    public String getPays() {

        return this.pays;
    }

    public void setPays(String pays) {

        this.pays = pays;
    }

}
