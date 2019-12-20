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

import com.skilldistillery.caravan.entities.Trip;
import com.skilldistillery.caravan.services.TripService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4260"})
public class TripController {

	@Autowired
	private TripService svc;
	
	@GetMapping("trips")
	public List<Trip> allTrips(Principal prin) {
		return svc.index();
	}
	
	@GetMapping("trips/{tid}")
	public Trip getTrip(@PathVariable Integer tid, HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.show(tid);
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}	
	}
	
	@PostMapping("trips")
	public Trip addTrip(@RequestBody Trip trip, HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			System.out.println(trip.toString());
			svc.create(trip, prin);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(trip.getId());
			resp.addHeader("Location", url.toString());
			
		} catch (Exception e) {
			resp.setStatus(400);
			e.printStackTrace();
		}
		return trip;
	}
	
	@PutMapping("trips/{tid}")
	public Trip update(@PathVariable Integer tid, @RequestBody Trip trip, HttpServletResponse resp) {
		try {
			trip = svc.update(trip, tid);
			
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
		}
		return trip;
	}
	
	@DeleteMapping("trips/{tid}")
	public void deleteTrip(@PathVariable Integer tid, HttpServletResponse resp) {
		try {
			if (svc.destroy(tid)) {
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
