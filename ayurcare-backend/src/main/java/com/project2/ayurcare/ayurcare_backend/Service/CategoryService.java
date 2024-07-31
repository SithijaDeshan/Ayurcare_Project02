package com.project2.ayurcare.ayurcare_backend.Service;

import com.project2.ayurcare.ayurcare_backend.DTO.CategoryDTO;
import com.project2.ayurcare.ayurcare_backend.entity.Category;
import com.project2.ayurcare.ayurcare_backend.repository.CategoryRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ModelMapper modelMapperConfig;

    public CategoryDTO getCategory(String categoryName) {
        Optional<Category> optionalCategory = categoryRepository.findByCategories(categoryName);
        if (!optionalCategory.isPresent()) {
            throw new IllegalArgumentException("Medical user not found");
        }

        Category category = optionalCategory.get();
        CategoryDTO categoryDTO = modelMapperConfig.map(category, CategoryDTO.class);

        return categoryDTO;
    }
}
