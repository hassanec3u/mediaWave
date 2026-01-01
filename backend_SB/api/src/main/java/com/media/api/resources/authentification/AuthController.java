package com.media.api.resources.authentification;


import com.media.api.config.JwtUtil;
import com.media.business.authentification.CustomUserDetailsService;
import com.media.domain.model.User;
import com.media.domain.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.media.api.resources.authentification.dto.AuthRequest;
import com.media.api.resources.authentification.dto.AuthResponse;

import java.util.ArrayList;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        try {
            auth = this.authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
            );

            final UserDetails userDetails = this.userDetailsService.loadUserByUsername(request.getUsername());

            User user = this.userRepository.findByUsername(request.getUsername()).orElseThrow(() -> new RuntimeException("User not found"));

            final String jwt = this.jwtUtil.generateToken(userDetails);

            AuthResponse authResponse = new AuthResponse();
            authResponse.setToken(jwt);
            authResponse.setUserId(user.getId());
            return ResponseEntity.ok(authResponse);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody AuthRequest request) {

        if (this.userRepository.findByUsername(request.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(this.passwordEncoder.encode(request.getPassword()));
        user.setEmail(request.getEmail());
        user.setRole("ROLE_USER");

        user.setFriends(new ArrayList<>());
        user.setFriendsRequests(new ArrayList<>());
        this.userRepository.save(user);

        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
