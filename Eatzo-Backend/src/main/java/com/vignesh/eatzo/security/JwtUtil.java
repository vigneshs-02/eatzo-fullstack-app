package com.vignesh.eatzo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // Secret key - must be at least 32 characters
    private static final String SECRET =
        "eatzo-secret-key-must-be-32-characters-long!!";

    // Token valid for 7 days
    private static final long EXPIRATION =
        7 * 24 * 60 * 60 * 1000L;

    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // Generate token with email and role
    public String generateToken(String email, String role) {
        return Jwts.builder()
                .subject(email)               // ✅ New syntax
                .claim("role", role)
                .issuedAt(new Date())         // ✅ New syntax
                .expiration(                  // ✅ New syntax
                    new Date(System.currentTimeMillis() 
                        + EXPIRATION))
                .signWith(getSigningKey())
                .compact();
    }

    // Get email from token
    public String extractEmail(String token) {
        return getClaims(token).getSubject();
    }

    // Get role from token
    public String extractRole(String token) {
        return getClaims(token).get("role", String.class);
    }

    // Check if token is valid
    public boolean isTokenValid(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException e) {
            return false;
        }
    }

    private Claims getClaims(String token) {
        return Jwts.parser()              // ✅ New syntax
                .verifyWith(             // ✅ New syntax
                    Keys.hmacShaKeyFor(
                        SECRET.getBytes()))
                .build()
                .parseSignedClaims(token) // ✅ New syntax
                .getPayload();            // ✅ New syntax
    }
}