package com.skilldistillery.caravan.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public List<TripHost> getAllTripHosts() {
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
	public TripHost addTrip(@RequestBody TripHost review, 
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
	
//	@PutMapping("trips/{tid}")
//	public Trip update(@PathVariable Integer tid, @RequestBody Trip trip, HttpServletResponse resp) {
//		try {
//			trip = svc.update(trip, tid);
//			
//		} catch (Exception e) {
//			e.printStackTrace();
//			resp.setStatus(401);
//		}
//		return trip;
//	}
//	
//	@DeleteMapping("trips/{tid}")
//	public void deleteTrip(
//			@PathVariable Integer tid,
//			HttpServletResponse resp)
//			 {
//		try {
//			if (svc.destroy(tid)) {
//				resp.setStatus(204);
//			}
//			else {
//				resp.setStatus(404);
//			}
//		} catch (Exception e) {
//			e.printStackTrace();
//			resp.setStatus(400);
//		}
//	}
}
