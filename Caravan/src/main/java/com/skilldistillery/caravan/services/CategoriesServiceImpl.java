package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Categories;
import com.skilldistillery.caravan.repositories.CategoriesRepository;

@Service
public class CategoriesServiceImpl implements CategoriesService {
	@Autowired
	private CategoriesRepository categoriesRepo;

	@Override
	public Categories createCategory(Categories category) {
		return categoriesRepo.saveAndFlush(category);
	}

	@Override
	public Categories updateCategory(int id, Categories category) {

		Categories oldCategory = categoriesRepo.findById(id).get();

		if (oldCategory != null) {

			oldCategory.setName(category.getName());

			return categoriesRepo.saveAndFlush(oldCategory);
		}

		else {

			return null;
		}
	}

	@Override
	public List<Categories> index(String username) {

		return categoriesRepo.findAll();
	}

	@Override
	public Categories findCategoryById(int id) {
		return categoriesRepo.findById(id).get();
	}

	@Override
	public boolean deleteCategoryById(int id) {
		Categories category = categoriesRepo.findById(id).get();

		if (category != null) {
			categoriesRepo.delete(category);
			return true;
		}
		return false;
	}

}
