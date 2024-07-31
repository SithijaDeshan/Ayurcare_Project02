package com.project2.ayurcare.ayurcare_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.project2.ayurcare.ayurcare_backend.entity.Category;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String>{

    Optional<Category> findByCategories(String categories);

}
