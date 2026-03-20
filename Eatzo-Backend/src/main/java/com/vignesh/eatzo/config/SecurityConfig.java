package com.vignesh.eatzo.config;

import com.vignesh.eatzo.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    // ── CORS Configuration ─────────────
    @Bean
    public CorsConfigurationSource 
            corsConfigurationSource() {

        CorsConfiguration config = 
            new CorsConfiguration();

        // ✅ Allow React frontend
        config.setAllowedOrigins(
           List.of(
            "http://localhost:5173",
            "http://localhost:5174",
            "https://eatzo-fullstack-app.vercel.app",
            "https://eatzo-fullstack-app-uyr2.vercel.app",
            "https://eatzo-admin.vercel.app"
           ));

        // ✅ Allow all HTTP methods
        config.setAllowedMethods(
            List.of(
                "GET", "POST", 
                "PUT", "DELETE", 
                "OPTIONS"
            ));

        // ✅ Allow all headers
        config.setAllowedHeaders(
            List.of("*"));

        // ✅ Allow credentials
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source =
            new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration(
            "/api/**", config);

        return source;
    }

    // ── Security Filter Chain ──────────
    @Bean
    public SecurityFilterChain filterChain(
            HttpSecurity http) throws Exception {

        http
            .cors(cors -> cors
                .configurationSource(
                    corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session
                .sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(
                    "/api/auth/**",
                    "/api/food/list",
                    "/api/food/image/**"
                ).permitAll()
                .requestMatchers(
                    "/api/food/add",
                    "/api/food/delete/**",
                    "/api/order/list",
                    "/api/order/status"
                ).hasRole("ADMIN")
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtFilter,
                UsernamePasswordAuthenticationFilter
                    .class);

        return http.build();
    }

    // ── Password Encoder ───────────────
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // ── Authentication Manager ─────────
    @Bean
    public AuthenticationManager 
            authenticationManager(
            AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}