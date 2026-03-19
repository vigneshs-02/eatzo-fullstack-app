package com.vignesh.eatzo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.vignesh.eatzo.model.Order;
import com.vignesh.eatzo.model.User;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{
	
	 // Get all orders for a specific user
    List<Order> findByUser(User user);
    
 // In OrderRepository.java add:
    List<Order> findByUserOrderByCreatedAtDesc(
      User user);

}
  