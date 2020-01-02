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

import com.skilldistillery.caravan.entities.DirectMessage;
import com.skilldistillery.caravan.entities.TripTraveler;
import com.skilldistillery.caravan.services.DirectMessageService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class DirectMessageController {

	@Autowired
	DirectMessageService svc;

	@GetMapping("directMessages")
	public List<DirectMessage> allDirectMessages(Principal prin) {
		return svc.index();
	}

	@GetMapping("directMessages/inbox")
	public List<DirectMessage> myInbox(Principal prin, HttpServletResponse resp, HttpServletRequest req) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.getMessages(prin.getName());
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}
	}


	@PostMapping("directMessages/{fid}")
	public DirectMessage addTripTraveler(@PathVariable Integer fid, @RequestBody DirectMessage dm,
			HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			resp.setStatus(201);
			return svc.create(dm, fid, prin);
		} catch (Exception e) {
			resp.setStatus(400);
			return null;
		}
	}

	@PutMapping("directMessages/{id}")
	public DirectMessage update(@PathVariable Integer id, @RequestBody DirectMessage dm,
			HttpServletResponse resp) {
		try {
			resp.setStatus(201);
			return svc.update(dm, id);
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
			return null;
		}
	}

	@DeleteMapping("directMessages/{id}")
	public void deleteDirectMessage(@PathVariable Integer id, HttpServletResponse resp) {
		try {
			if (svc.destroy(id)) {
				resp.setStatus(204);
			} else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
	}
}
