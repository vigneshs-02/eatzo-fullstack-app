package com.vignesh.eatzo.service;

import com.vignesh.eatzo.model.*;
import com.vignesh.eatzo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    // PLACE ORDER
    public Order placeOrder(Long userId,
                            String street,
                            String city,
                            String state,
                            String pincode) {

        // Find user
        User user = userRepository
            .findById(userId).orElse(null);
        if (user == null) return null;

        // Get all cart items for this user
        List<CartItem> cartItems = 
            cartRepository.findByUser(user);

        if (cartItems.isEmpty()) return null;

        // Calculate total amount
        double total = 0;
        for (CartItem item : cartItems) {
            total += item.getFood().getPrice() 
                * item.getQuantity();
        }

        // Add delivery fee
        total += 40;

        // Create new order
        Order order = new Order();
        order.setUser(user);
        order.setTotalAmount(total);
        order.setStatus("PENDING");
        order.setStreet(street);
        order.setCity(city);
        order.setState(state);
        order.setPincode(pincode);
        order.setPaymentMethod("COD");
        order.setPaymentStatus(false);

        // Save order first to get order ID
        Order savedOrder = orderRepository.save(order);

        // Create order items from cart
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(savedOrder);
            orderItem.setFood(cartItem.getFood());
            orderItem.setFoodName(
                cartItem.getFood().getName());
            orderItem.setFoodPrice(
                cartItem.getFood().getPrice());
            orderItem.setFoodImage(
                cartItem.getFood().getImageUrl());
            orderItem.setQuantity(
                cartItem.getQuantity());
            orderItems.add(orderItem);
        }

        // Save all order items
        orderItemRepository.saveAll(orderItems);

        // Clear cart after order placed
        cartRepository.deleteAll(cartItems);

        return savedOrder;
    }

    // GET USER ORDERS
    public List<Order> getUserOrders(Long userId) {
    	  User user = userRepository
    	    .findById(userId).orElse(null);
    	  if (user == null) return null;
    	  
    	  // ✅ Returns newest orders first
    	  return orderRepository
    	    .findByUserOrderByCreatedAtDesc(user);
    	}

    // GET ALL ORDERS (Admin)
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    // UPDATE ORDER STATUS (Admin)
    public String updateOrderStatus(
                    Long orderId, 
                    String status) {

        Order order = orderRepository
            .findById(orderId).orElse(null);

        if (order == null) return "Order not found!";

        order.setStatus(status);
        orderRepository.save(order);
        return "Order status updated!";
    }
}