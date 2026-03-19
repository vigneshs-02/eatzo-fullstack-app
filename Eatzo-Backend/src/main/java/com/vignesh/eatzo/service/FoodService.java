package com.vignesh.eatzo.service;

import com.vignesh.eatzo.model.Food;
import com.vignesh.eatzo.repository.FoodRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@Service
public class FoodService {

    @Autowired
    private FoodRepository foodRepository;

    // Folder where images will be saved
    private final String uploadDir = "uploads/foods/";

    // ADD FOOD
    public Food addFood(Food food, 
                        MultipartFile imageFile) 
                        throws IOException {

        // Create uploads folder if not exists
        Files.createDirectories(Paths.get(uploadDir));

        // Save image to server
        String fileName = System.currentTimeMillis() 
            + "_" + imageFile.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.copy(imageFile.getInputStream(), 
            filePath, 
            StandardCopyOption.REPLACE_EXISTING);

        // Set image URL in food object
        food.setImageUrl(fileName);

        // Set available true by default
        food.setAvailable(true);

        // Save food to DB
        return foodRepository.save(food);
    }

    // GET ALL FOODS
    public List<Food> getAllFoods() {
        return foodRepository.findAll();
    }

    // DELETE FOOD
    public String deleteFood(Long id) 
            throws IOException {

        Food food = foodRepository
            .findById(id).orElse(null);

        if (food == null) {
            return "Food not found!";
        }

        // ✅ Set food to unavailable
        // instead of deleting!
        food.setAvailable(false);
        foodRepository.save(food);

        return "Food marked as unavailable!";
    }
}