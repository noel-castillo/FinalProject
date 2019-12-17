package com.skilldistillery.caravan.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.eventtracker.services.AuthService;

@RestController
@CrossOrigin({ "*", "http://localhost:4210" })
public class AuthController {

	@Autowired
	private AuthService svc;

	@RequestMapping(path = "register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse res) {

		if (user == null) {
			res.setStatus(400);
		}

		user = svc.register(user);

		return user;
	}

	@RequestMapping(path = "authenticate", method = RequestMethod.GET)
	public Principal authenticate(Principal principal) {
		return principal;
	}

}
