package com.media.api.resources.authentification.dto;

import com.media.business.common.SimpleDto;



public class AuthRequest implements SimpleDto {

    private static final long serialVersionUID = 1L;

    private String username;

    private String password;

    private String email;

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
