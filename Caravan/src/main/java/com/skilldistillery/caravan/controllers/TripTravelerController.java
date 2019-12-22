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

import com.skilldistillery.caravan.entities.TripTraveler;
import com.skilldistillery.caravan.services.TripTravelerService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4260"})
public class TripTravelerController {
	
	@Autowired
	TripTravelerService svc;


	@GetMapping("tripTravelers")
	public List<TripTraveler> allTripTravelers(Principal prin) {
		return svc.index();
	}
	
	@GetMapping("tripHostTravelers")
	public List<TripTraveler> allTripsRequests(Principal prin,HttpServletResponse resp, HttpServletRequest req) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.getRequests(prin.getName());
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}	
	}
	
	@GetMapping("tripTravelers/{ttid}")
	public TripTraveler getTripTraveler(@PathVariable Integer ttid, HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.show(ttid);
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}	
	}
	
	
	@PostMapping("tripTravelers")
	public TripTraveler addTripTraveler(@RequestBody TripTraveler tripTraveler, HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			svc.create(tripTraveler);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(tripTraveler.getId());
			resp.addHeader("Location", url.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resp.setStatus(400);
			e.printStackTrace();
		}
		return tripTraveler;
	}
	
	@PutMapping("tripTravelers/{ttid}")
	public TripTraveler update(@PathVariable Integer ttid, @RequestBody TripTraveler tripTraveler, HttpServletResponse resp) {
		try {
			tripTraveler = svc.update(tripTraveler, ttid);
			
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
		}
		return tripTraveler;
	}
	
	@DeleteMapping("tripTravelers/{ttid}")
	public void deleteTripTraveler(@PathVariable Integer ttid, HttpServletResponse resp) {
		try {
			if (svc.destroy(ttid)) {
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
