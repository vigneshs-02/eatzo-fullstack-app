package com.vignesh.eatzo.dto;



public class AuthResponse {
	
	private String token; 
	
	private String role;
	
	private String message;
	
	 private Long userId;

	 public AuthResponse(String token, String role, String message, Long userId) {
		super();
		this.token = token;
		this.role = role;
		this.message = message;
		this.userId = userId;
	 }

	 public AuthResponse() {
		super();
	 }

	 public String getToken() {
		 return token;
	 }

	 public void setToken(String token) {
		 this.token = token;
	 }

	 public String getRole() {
		 return role;
	 }

	 public void setRole(String role) {
		 this.role = role;
	 }

	 public String getMessage() {
		 return message;
	 }

	 public void setMessage(String message) {
		 this.message = message;
	 }

	 public Long getUserId() {
		 return userId;
	 }

	 public void setUserId(Long userId) {
		 this.userId = userId;
	 }
	
	 
	

}
