package com.vignesh.eatzo.security;

import jakarta.servlet.FilterChain;


import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.*;
import org.springframework.security.core.context.
    SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.
    WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.core.authority
.SimpleGrantedAuthority;
import java.util.List;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    
    


    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain)
            throws ServletException, IOException {

        // Read Authorization header
        String authHeader = 
            request.getHeader("Authorization");

        String token = null;
        String email = null;

        // Check if header has Bearer token
        if (authHeader != null && 
                authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
            try {
                email = jwtUtil.extractEmail(token);
            } catch (Exception e) {
                // Token expired or invalid
                // Just continue without setting auth
                filterChain.doFilter(
                    request, response);
                return;
            }
        }

        // If email found and no auth set yet
        if (email != null && SecurityContextHolder
                .getContext()
                .getAuthentication() == null) {

            // ✅ Get role directly from TOKEN
            String role = jwtUtil.extractRole(token);

            SimpleGrantedAuthority authority =
                new SimpleGrantedAuthority(
                    "ROLE_" + role);

            if (jwtUtil.isTokenValid(token)) {
                UsernamePasswordAuthenticationToken 
                    authToken =
                    new UsernamePasswordAuthenticationToken(
                        email,
                        null,
                        List.of(authority)
                    );
                authToken.setDetails(
                    new WebAuthenticationDetailsSource()
                        .buildDetails(request));
                SecurityContextHolder.getContext()
                    .setAuthentication(authToken);
            }
        }

        filterChain.doFilter(request, response);
    }
}