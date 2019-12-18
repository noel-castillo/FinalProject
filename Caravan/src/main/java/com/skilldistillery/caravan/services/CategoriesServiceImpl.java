package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Categories;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.repositories.CategoriesRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class CategoriesServiceImpl implements CategoriesService {
	@Autowired
	private CategoriesRepository categoriesRepo;
	
	@Autowired
	private UserRepository userRepo;

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
//		for(User element : userRepo.findAll()) {
//			if(element.getUsername().equals(username)) {
//				if(element.getRole().equals("admin")) {
//					return categoriesRepo.findAll();
//				}
//			}
//		}
		
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
