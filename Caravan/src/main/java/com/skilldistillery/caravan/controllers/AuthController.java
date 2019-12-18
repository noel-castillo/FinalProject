package com.skilldistillery.caravan.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.services.AuthService;

@RestController
@CrossOrigin({ "*", "http://localhost:4260" })
public class AuthController {

	@Autowired
	private AuthService svc;

	@PostMapping(path = "register")
	public User register(@RequestBody User user, HttpServletResponse res) {

		if (user == null) {
			res.setStatus(400);
		}

		user = svc.register(user);

		return user;
	}

	@GetMapping(path = "authenticate")
	public Principal authenticate(Principal principal) {
		return principal;
	}

}
