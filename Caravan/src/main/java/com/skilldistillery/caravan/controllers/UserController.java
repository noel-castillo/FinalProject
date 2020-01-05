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

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.services.UserService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class UserController {

	@Autowired
	private UserService svc;


	@GetMapping("users")
	public List<User> index() {
		return svc.index();
	}

	@GetMapping("users/{id}")
	private User getById(@PathVariable int id, HttpServletRequest req, HttpServletResponse resp, Principal prin) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.show(prin.getName(), id);
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}
	}
	@GetMapping("userSession")
	private User getBySession( HttpServletRequest req, HttpServletResponse resp, Principal prin) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.showUser(prin.getName());
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}
	}

	@PostMapping("users")
	private User createUser(@RequestBody User user, HttpServletResponse resp, HttpServletRequest req) {

		User newUser = svc.create(user);
		if (newUser != null) {
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return newUser;
		} else {
			resp.setStatus(401);
			return null;
		}
	}

	@PutMapping("users/{id}")
	private User updateUser(@RequestBody User user, @PathVariable int id, HttpServletResponse resp,
			HttpServletRequest req, Principal prin) {

		try {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			return svc.update(user, prin.getName(), id);

		} catch (Exception e) {

			resp.setStatus(400);
			return null;
		}
	}

	@DeleteMapping("users/{id}")
	private boolean deleteUser(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req, Principal prin) {

		try {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			svc.destroy(prin.getName(), id);
			return true;
		} catch (Exception e) {
			resp.setStatus(400);

			return false;
		}
	}

}
