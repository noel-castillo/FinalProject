package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.Categories;

public interface CategoriesService {

	public List<Categories> index(String username);

	public Categories updateCategory(int id, Categories category);

	public boolean deleteCategoryById(int id);

	public Categories findCategoryById(int id);

	public Categories createCategory(Categories category);

}
