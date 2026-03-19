package com.vignesh.eatzo.controller;

import com.vignesh.eatzo.model.Food;
import com.vignesh.eatzo.service.FoodService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/food")
@CrossOrigin(origins = "http://localhost:5173")
public class FoodController {

    @Autowired
    private FoodService foodService;

    // ADD FOOD (Admin only)
    @PostMapping("/add")
    public ResponseEntity<Food> addFood(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("price") Double price,
            @RequestParam("category") String category,
            @RequestParam("image") MultipartFile image)
            throws IOException {

        // Build food object from params
        Food food = new Food();
        food.setName(name);
        food.setDescription(description);
        food.setPrice(price);
        food.setCategory(category);

        Food saved = foodService.addFood(food, image);
        return ResponseEntity.ok(saved);
    }

    // GET ALL FOODS (Public)
    @GetMapping("/list")
    public ResponseEntity<List<Food>> getAllFoods() {
        return ResponseEntity.ok(
            foodService.getAllFoods());
    }

    // DELETE FOOD (Admin only)
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteFood(
            @PathVariable Long id) throws IOException {
        return ResponseEntity.ok(
            foodService.deleteFood(id));
    }

    // SERVE FOOD IMAGE
    @GetMapping("/image/{filename}")
    public ResponseEntity<byte[]> getImage(
            @PathVariable String filename) 
            throws IOException {
        Path imagePath = Paths.get(
            "uploads/foods/" + filename);
        byte[] imageBytes = Files.readAllBytes(imagePath);
        return ResponseEntity.ok()
            .header("Content-Type", "image/jpeg")
            .body(imageBytes);
    }
}