package com.vignesh.eatzo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vignesh.eatzo.model.CartItem;
import com.vignesh.eatzo.model.Food;
import com.vignesh.eatzo.model.User;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long>{
	
	// Find single item by user and food
    CartItem findByUserAndFood(User user, Food food);

    // Find all items for a user
    List<CartItem> findByUser(User user);

}
