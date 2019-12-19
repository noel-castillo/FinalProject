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

import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.services.UserProfileService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class UserProfileController {

	@Autowired
	private UserProfileService svc;

	@GetMapping("userProfiles")
	public List<UserProfile> returnAll(Principal principal) {
		List<UserProfile> userProfiles = svc.index("shaun");

		return userProfiles;
	}

	@GetMapping("userProfiles/{id}")
	public UserProfile returnSingle(@PathVariable("id") Integer id, HttpServletResponse resp) {
		UserProfile userProfile = svc.showById(id);

		return userProfile;
	}

	// ADD UserProfile
	@PostMapping(path = "userProfiles")
	public UserProfile create(@RequestBody UserProfile userProfile, HttpServletRequest req, HttpServletResponse resp,
			Principal prin) {

		try {
			userProfile = svc.create(userProfile, "shaun");
			// TODO SET 401 created
			resp.setStatus(201);
//				resp.addHeader("Location", "http://localhost:8083/api/logs" + logbook.getId());
			StringBuffer url = req.getRequestURL();
			url.append("/").append(userProfile.getId());
			resp.addHeader("Location", url.toString());

		} catch (Exception e) {
			e.printStackTrace();
			// TODO SET 400 bad request
			resp.setStatus(400);
		}

		return userProfile;
	}

	// UPDATE UserProfile
	@PutMapping(path = "userProfiles/{id}")
	public UserProfile edit(@PathVariable("id") Integer id, @RequestBody UserProfile userProfile,
			HttpServletRequest req, HttpServletResponse resp, Principal principal) {

		try {
			userProfile = svc.update(userProfile, "shaun", id);
			// TODO SET 401 created
			resp.setStatus(201);
//				resp.addHeader("Location", "http://localhost:8081/api/posts" + post.getId());
			StringBuffer url = req.getRequestURL();
			url.append("/").append(userProfile.getId());
			resp.addHeader("Location", url.toString());

		} catch (Exception e) {
			e.printStackTrace();
			// TODO SET 400 bad request
			resp.setStatus(400);
		}

		return userProfile;
	}
	
	@DeleteMapping("userProfiles/{id}")
	private boolean deleteUserProfile(@PathVariable int id, HttpServletResponse resp, HttpServletRequest req, Principal prin) {

		try {
			svc.destroy(id);
			
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
