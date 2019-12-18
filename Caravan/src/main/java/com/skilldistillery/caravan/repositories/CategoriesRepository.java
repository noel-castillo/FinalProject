package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Integer>{

}
