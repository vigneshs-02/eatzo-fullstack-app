package com.vignesh.eatzo.security;

import com.vignesh.eatzo.model.User;
import com.vignesh.eatzo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.
    SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service 
public class UserDetailsServiceImpl 
    implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // Find user by email from DB
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> 
                    new UsernameNotFoundException(
                        "User not found: " + email));

        // Return Spring Security UserDetails object
        return new org.springframework.security.core
            .userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(
                    "ROLE_" + user.getRole()))
        );
    }
}