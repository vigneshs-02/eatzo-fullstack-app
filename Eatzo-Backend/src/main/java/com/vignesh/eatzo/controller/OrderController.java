package com.vignesh.eatzo.controller;

import com.vignesh.eatzo.model.Order;
import com.vignesh.eatzo.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/order")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    @Autowired
    private OrderService orderService;

    // PLACE ORDER
    @PostMapping("/place")
    public ResponseEntity<Order> placeOrder(
            @RequestParam Long userId,
            @RequestParam String street,
            @RequestParam String city,
            @RequestParam String state,
            @RequestParam String pincode) {
        return ResponseEntity.ok(
            orderService.placeOrder(
                userId, street, 
                city, state, pincode));
    }

    // GET USER ORDERS
    @GetMapping("/userorders/{userId}")
    public ResponseEntity<List<Order>> getUserOrders(
            @PathVariable Long userId) {
    	
    	List<Order> orders = 
    		    orderService.getUserOrders(userId);

    		  if (orders == null) {
    		    return ResponseEntity.ok(
    		      new ArrayList<>());
    		  }
    		  
        return ResponseEntity.ok(
            orderService.getUserOrders(userId));
    }

    // GET ALL ORDERS (Admin)
    @GetMapping("/list")
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(
            orderService.getAllOrders());
    }

    // UPDATE ORDER STATUS (Admin)
    @PostMapping("/status")
    public ResponseEntity<String> updateStatus(
            @RequestParam Long orderId,
            @RequestParam String status) {
        return ResponseEntity.ok(
            orderService.updateOrderStatus(
                orderId, status));
    }
}