package com.vignesh.eatzo.model;

import java.time.LocalDateTime;


import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "users")
public class User {
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;
	 
	 @NotBlank
	 private String name;
	  
	 @Column(unique = true,nullable = false)
	 @NotBlank
	 @Email
	 private String email;
	 
	 @NotBlank
	 private String password;
	 
	 private String role;
	 
	 private String authProvider;
	 
	 private String googleId;
	 
	 private String phone;
	 
	 private String profileImage;
	 
	 @CreationTimestamp
	 private LocalDateTime createdAt;
	 
	 @UpdateTimestamp
	 private LocalDateTime updatedAt;

	 public Long getId() {
		 return id;
	 }

	 public void setId(Long id) {
		 this.id = id;
	 }

	 public String getName() {
		 return name;
	 }

	 public void setName(String name) {
		 this.name = name;
	 }

	 public String getEmail() {
		 return email;
	 }

	 public void setEmail(String email) {
		 this.email = email;
	 }

	 public String getPassword() {
		 return password;
	 }

	 public void setPassword(String password) {
		 this.password = password;
	 }

	 public String getRole() {
		 return role;
	 }

	 public void setRole(String role) {
		 this.role = role;
	 }

	 public String getAuthProvider() {
		 return authProvider;
	 }

	 public void setAuthProvider(String authProvider) {
		 this.authProvider = authProvider;
	 }

	 public String getGoogleId() {
		 return googleId;
	 }

	 public void setGoogleId(String googleId) {
		 this.googleId = googleId;
	 }

	 public String getPhone() {
		 return phone;
	 }

	 public void setPhone(String phone) {
		 this.phone = phone;
	 }

	 public String getProfileImage() {
		 return profileImage;
	 }

	 public void setProfileImage(String profileImage) {
		 this.profileImage = profileImage;
	 }

	 public LocalDateTime getCreatedAt() {
		 return createdAt;
	 }

	 public void setCreatedAt(LocalDateTime createdAt) {
		 this.createdAt = createdAt;
	 }

	 public LocalDateTime getUpdatedAt() {
		 return updatedAt;
	 }

	 public void setUpdatedAt(LocalDateTime updatedAt) {
		 this.updatedAt = updatedAt;
	 }
	 
	 
	 
	 
}
