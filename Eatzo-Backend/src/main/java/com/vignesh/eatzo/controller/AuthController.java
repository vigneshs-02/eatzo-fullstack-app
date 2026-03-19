package com.vignesh.eatzo.controller;

import com.vignesh.eatzo.dto.AuthResponse;
import com.vignesh.eatzo.dto.LoginRequest;
import com.vignesh.eatzo.dto.SignupRequest;
import com.vignesh.eatzo.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthService authService;

    // SIGNUP
    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody SignupRequest request) {
        return ResponseEntity.ok(
            authService.register(request));
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(
            authService.login(request));
    }
}