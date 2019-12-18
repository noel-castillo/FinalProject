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
import com.skilldistillery.caravan.services.AuthService;

@RestController
@CrossOrigin({ "*", "http://localhost:4260" })
public class AuthController {

	@Autowired
	private AuthService authSvc;

	@RequestMapping(path = "/register", method = RequestMethod.POST)
	public User register(@RequestBody User user, HttpServletResponse res) {

		if (user == null) {
			res.setStatus(400);
			return null;
		}

		else {

			return authSvc.register(user);
		}

	}

	@RequestMapping(path = "/authenticate", method = RequestMethod.GET)
	public Principal authenticate(Principal principal) {
		return principal;
	}

}
