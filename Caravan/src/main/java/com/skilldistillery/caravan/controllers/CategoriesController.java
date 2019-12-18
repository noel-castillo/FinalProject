package com.skilldistillery.caravan.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.caravan.entities.Categories;
import com.skilldistillery.caravan.services.CategoriesService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class CategoriesController {

	@Autowired
	private CategoriesService svc;

	@GetMapping("categories")
	public List<Categories> index(Principal principal) {
		return svc.index(principal.getName());
	}
	
	@GetMapping("categories/{id}")
	public Categories showCategory(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		Categories category = svc.findCategoryById(id);
		if (category == null) {
			response.setStatus(404);
		}
		return category;
	}

	@PostMapping("categories")
	public Categories createAddress(@RequestBody Categories category, HttpServletRequest request,
			HttpServletResponse response) {
		if ((category = svc.createCategory(category)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(category.getId());
			response.addHeader("Location", url.toString());
			return category;
		} else {
			response.setStatus(400);
			return null;
		}
	}

	@PutMapping("categories/{id}")
	public Categories updateAddress(@PathVariable int id, @RequestBody Categories category, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			category = svc.updateCategory(id, category);
			if (category == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			category = null;
		}
		return category;
	}

	@DeleteMapping("categories/{id}")
	public boolean deleteCategory(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		try {
			boolean deleted = svc.deleteCategoryById(id);
			if (deleted) {
				response.setStatus(204);
				return true;
			} else {
				response.setStatus(404);
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			return false;
		}

	}

}
