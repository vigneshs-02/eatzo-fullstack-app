package com.vignesh.eatzo.service;

import com.vignesh.eatzo.dto.AuthResponse;
import com.vignesh.eatzo.dto.LoginRequest;
import com.vignesh.eatzo.dto.SignupRequest;
import com.vignesh.eatzo.model.User;
import com.vignesh.eatzo.repository.UserRepository;
import com.vignesh.eatzo.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // ── REGISTER ───────────────────────
    public AuthResponse register(
            SignupRequest request) {

        // Check if email already exists
        if (userRepository.findByEmail(
                request.getEmail()).isPresent()) {
            return new AuthResponse(
                null,
                null,
                "Email already exists!",
                null);        // ← null userId
        }

        // Create new user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());

        // Encode password
        user.setPassword(
            passwordEncoder.encode(
                request.getPassword()));

        // Check admin secret
        if ("EATZO@ADMIN2024".equals(
                request.getAdminSecret())) {
            user.setRole("ADMIN");
        } else {
            user.setRole("CUSTOMER");
        }

        user.setAuthProvider("LOCAL");

        // Save to DB
        userRepository.save(user);

        // Generate token
        String token = jwtUtil.generateToken(
            user.getEmail(), user.getRole());

        // ✅ Return with userId
        return new AuthResponse(
            token,
            user.getRole(),
            "Registration successful!",
            user.getId());
    }

    // ── LOGIN ──────────────────────────
    public AuthResponse login(
            LoginRequest request) {

        // Find user by email
        User user = userRepository
            .findByEmail(request.getEmail())
            .orElse(null);

        // User not found
        if (user == null) {
            return new AuthResponse(
                null,
                null,
                "User not found!",
                null);        // ← null userId
        }

        // Check password
        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {
            return new AuthResponse(
                null,
                null,
                "Invalid password!",
                null);        // ← null userId
        }

        // Generate token
        String token = jwtUtil.generateToken(
            user.getEmail(), user.getRole());

        // ✅ Return with userId
        return new AuthResponse(
            token,
            user.getRole(),
            "Login successful!",   // ← fixed message
            user.getId());
    }
}