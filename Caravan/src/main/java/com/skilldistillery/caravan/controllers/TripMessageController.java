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

import com.skilldistillery.caravan.entities.TripMessage;
import com.skilldistillery.caravan.services.TripMessageService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class TripMessageController {

	@Autowired
	private TripMessageService svc;


	@GetMapping("messages/{id}")
	public List<TripMessage> index(Principal prin, @PathVariable int id) {
		return svc.index(id);
	}

	@GetMapping("message/{id}")
	private TripMessage getById(@PathVariable int id, HttpServletRequest req, HttpServletResponse resp, Principal prin) {
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

	@PostMapping("messages")
	private TripMessage createMessage(@RequestBody TripMessage tripMes, HttpServletResponse resp, HttpServletRequest req, Principal prin) {

		TripMessage newUser = svc.create(tripMes,prin.getName() );
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

	@PutMapping("messages/{id}")
	private TripMessage updateMessage(@RequestBody TripMessage user, @PathVariable int id, HttpServletResponse resp,
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

	@DeleteMapping("messages/{id}")
	private boolean deleteMessage(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req, Principal prin) {

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
