package com.vignesh.eatzo.service;

import com.vignesh.eatzo.model.CartItem;
import com.vignesh.eatzo.model.Food;
import com.vignesh.eatzo.model.User;
import com.vignesh.eatzo.repository.CartRepository;
import com.vignesh.eatzo.repository.FoodRepository;
import com.vignesh.eatzo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private FoodRepository foodRepository;

    // ADD TO CART
    public String addToCart(Long userId, 
                            Long foodId, 
                            Integer quantity) {

        // Find user
        User user = userRepository
            .findById(userId).orElse(null);
        if (user == null) return "User not found!";

        // Find food
        Food food = foodRepository
            .findById(foodId).orElse(null);
        if (food == null) return "Food not found!";

        // Check if already in cart
        CartItem existing = cartRepository
            .findByUserAndFood(user, food);

        if (existing != null) {
            // Already exists → increase quantity
            existing.setQuantity(
                existing.getQuantity() + quantity);
            cartRepository.save(existing);
        } else {
            // New item → add to cart
            CartItem cartItem = new CartItem();
            cartItem.setUser(user); 
            cartItem.setFood(food);
            cartItem.setQuantity(quantity);
            cartRepository.save(cartItem);
        }

        return "Cart updated successfully!";
    }

    // REMOVE FROM CART
    public String removeFromCart(Long userId, 
                                  Long foodId) {

        // Find user and food
        User user = userRepository
            .findById(userId).orElse(null);
        Food food = foodRepository
            .findById(foodId).orElse(null);

        if (user == null || food == null) {
            return "User or Food not found!";
        }

        // Find cart item
        CartItem cartItem = cartRepository
            .findByUserAndFood(user, food);

        if (cartItem == null) {
            return "Item not in cart!";
        }

        if (cartItem.getQuantity() > 1) {
            // Decrease quantity
            cartItem.setQuantity(
                cartItem.getQuantity() - 1);
            cartRepository.save(cartItem);
        } else {
            // Remove completely
            cartRepository.delete(cartItem);
        }

        return "Cart updated successfully!";
    }
    
 // DELETE cart item completely
    public String deleteCartItem(
        Long userId, Long foodId) {

      User user = userRepository
        .findById(userId).orElse(null);
      Food food = foodRepository
        .findById(foodId).orElse(null);

      if (user == null || food == null) {
        return "User or Food not found!";
      }

      CartItem cartItem = cartRepository
        .findByUserAndFood(user, food);

      if (cartItem == null) {
        return "Item not in cart!";
      }

      cartRepository.delete(cartItem);
      return "Item deleted from cart!";
    }

    // GET CART
    public List<CartItem> getCart(Long userId) {

        User user = userRepository
            .findById(userId).orElse(null);

        if (user == null) return null;

        return cartRepository.findByUser(user);
    }
}