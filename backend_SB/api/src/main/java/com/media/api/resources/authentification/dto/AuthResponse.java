package com.media.api.resources.authentification.dto;


public class AuthResponse {

    private String token;

    private String userId;


    public String getToken() {

        return this.token;
    }

    public void setToken(String token) {

        this.token = token;
    }

    public String getUserId() {

        return this.userId;
    }

    public void setUserId(String userId) {

        this.userId = userId;
    }
}