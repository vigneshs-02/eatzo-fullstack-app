package com.vignesh.eatzo.controller;

import com.vignesh.eatzo.model.CartItem;
import com.vignesh.eatzo.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartService cartService;

    // ADD TO CART
    @PostMapping("/add")
    public ResponseEntity<String> addToCart(
            @RequestParam Long userId,
            @RequestParam Long foodId,
            @RequestParam Integer quantity) {
        return ResponseEntity.ok(
            cartService.addToCart(
                userId, foodId, quantity));
    }

    // REMOVE FROM CART
    @PostMapping("/remove")
    public ResponseEntity<String> removeFromCart(
            @RequestParam Long userId,
            @RequestParam Long foodId) {
        return ResponseEntity.ok(
            cartService.removeFromCart(userId, foodId));
    }
    
 // DELETE cart item completely
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteCartItem(
        @RequestParam Long userId,
        @RequestParam Long foodId) {
      return ResponseEntity.ok(
        cartService.deleteCartItem(userId, foodId));
    }
 
    // GET CART
    @GetMapping("/get/{userId}")
    public ResponseEntity<List<CartItem>> getCart(
            @PathVariable Long userId) {
        return ResponseEntity.ok(
            cartService.getCart(userId));
    }
}