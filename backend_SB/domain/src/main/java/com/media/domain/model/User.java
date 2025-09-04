package com.media.domain.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.List;

@Document(collection = "user")
public class User {

    @Id
    private String id;

    private String username;

    private String email;

    private String password;

    private String profilePicture;

    private String bio;

    private Date birthday;

    private String pays;

    @DBRef
    private List<User> friends;

    @DBRef
    private List<User> friendsRequests;

    private String role = "ROLE_USER";

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

    public String getPassword() {

        return this.password;
    }

    public void setPassword(String password) {

        this.password = password;
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

    public List<User> getFriends() {

        return this.friends;
    }

    public void setFriends(List<User> friends) {

        this.friends = friends;
    }

    public List<User> getFriendsRequests() {

        return this.friendsRequests;
    }

    public void setFriendsRequests(List<User> friendsRequests) {

        this.friendsRequests = friendsRequests;
    }

    public String getRole() {

        return this.role;
    }

    public void setRole(String role) {

        this.role = role;
    }

    @Override
    public boolean equals(Object o) {

        if (this == o) return true; // même instance
        if (!(o instanceof User)) return false; // pas le même type

        User other = (User) o;

        if (this.id == null || other.id == null) {
            return false;
        }

        return this.id.equals(other.id);
    }

    @Override
    public int hashCode() {
        return this.id != null ? this.id.hashCode() : 0;
    }

}
