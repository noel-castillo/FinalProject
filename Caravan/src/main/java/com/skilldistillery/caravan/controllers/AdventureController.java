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

import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.services.AdventureService;

@RestController
@CrossOrigin({ "*", "http://localhost:4260" })
@RequestMapping("api")
public class AdventureController {

	@Autowired
	AdventureService advSvc;

	@GetMapping("adventures")
	public List<Adventure> index() {
		return advSvc.index();
	}

	@GetMapping("adventures/{id}")
	public Adventure show(@PathVariable int id) {
		return advSvc.show(id);

	}

	@PostMapping("adventures")
	public Adventure create(@RequestBody Adventure adventure, Principal principal, HttpServletRequest req,
			HttpServletResponse resp) {
		try {
			adventure = advSvc.create(adventure, principal.getName());
			resp.setStatus(201);
//			StringBuffer url = req.getRequestURL();
//			url.append("/").append(adventure.getId());
//			resp.addHeader("Location", url.toString());
			return adventure;

		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
			return null;
		}

	}

	// UPDATE UserProfile
	@PutMapping(path = "adventures/{id}")
	public Adventure edit(@PathVariable("id") Integer id, @RequestBody Adventure adventure, HttpServletRequest req, HttpServletResponse resp, Principal principal) {

		try {
			adventure = advSvc.update(adventure, principal.getName(), id);
			// TODO SET 401 created
			resp.setStatus(201);
//					resp.addHeader("Location", "http://localhost:8081/api/posts" + post.getId());
			StringBuffer url = req.getRequestURL();
			url.append("/").append(adventure.getId());
			resp.addHeader("Location", url.toString());

		} catch (Exception e) {
			e.printStackTrace();
			// TODO SET 400 bad request
			resp.setStatus(400);
		}

		return adventure;
	}
	
	@DeleteMapping("adventures/{id}")
	private boolean deleteUserProfile(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req, Principal prin) {

		try {
			advSvc.destroy(id);
			
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return true;
		} catch (Exception e) {
			resp.setStatus(400);

			return false;
		}
	}

}
