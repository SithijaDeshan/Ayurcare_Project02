package com.project2.ayurcare.ayurcare_backend.jpaResource;

import com.project2.ayurcare.ayurcare_backend.DTO.CategoryDTO;
import com.project2.ayurcare.ayurcare_backend.Service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CategoryJpaResource {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/category/{categoryDetails}")
    public CategoryDTO getCategoryDetails(@PathVariable("categoryDetails") String categoryDetails) {
        return categoryService.getCategory(categoryDetails);
    }

}
