package com.skilldistillery.caravan.controllers;

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

import com.skilldistillery.caravan.entities.TripHost;
import com.skilldistillery.caravan.services.TripHostService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4260"})
public class TripHostController {

	@Autowired
	private TripHostService svc;
	
	@GetMapping("hosts")
	public List<TripHost> getAllTripHostReviews() {
		return svc.index();
	}
	
	@GetMapping("hosts/{hid}")
	public TripHost getHostById(
			@PathVariable int hid,
			HttpServletResponse resp
			) {
		try {
			TripHost host = svc.show(hid);
			resp.setStatus(200);
			return host;
		} catch (Exception e) {
			resp.setStatus(404);
			e.printStackTrace();
			return null;
		}
	}
	
	@PostMapping("hosts")
	public TripHost addTripHostReview(@RequestBody TripHost review, 
			HttpServletResponse resp, 
			HttpServletRequest req) {
		try {
			review = svc.create(review);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(review.getId());
			resp.addHeader("Location", url.toString());
			return review;
			
		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
			return null;
		}
	
	}
	
	@PutMapping("hosts/{hid}")
	public TripHost updateReview(@RequestBody TripHost review, 
			@PathVariable int hid,
			HttpServletResponse resp) {
		try {
			review = svc.update(review, hid);
			resp.setStatus(200);
			return review;
			
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
			return null;
		}

	}
	
	@DeleteMapping("hosts/{hid}")
	public void deleteTripHostReview(
			@PathVariable int hid,
			HttpServletResponse resp)
			 {
		try {
			if (svc.destroy(hid)) {
				resp.setStatus(204);
			}
			else {
				resp.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(400);
		}
	}
}
