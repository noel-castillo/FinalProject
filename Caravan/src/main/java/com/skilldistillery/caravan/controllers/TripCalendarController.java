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

import com.skilldistillery.caravan.entities.TripCalendar;
import com.skilldistillery.caravan.services.TripCalendarService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4260"})
public class TripCalendarController {
	
	@Autowired
	private TripCalendarService svc;
	
	@GetMapping("tripCalendars")
	public List<TripCalendar> allTripCalendars() {
		return svc.index();
	}
	
	@GetMapping("tripCalendars/{tcid}")
	public TripCalendar getTripCalendar(
			@PathVariable Integer tcid,
			HttpServletResponse resp
			)
	{
		TripCalendar tripCal = svc.show(tcid);
		if(tripCal == null) {
			resp.setStatus(404);
		}
		
		return tripCal;
	}
	
	@PostMapping("trips/{tid}/tripCalendars")
	public TripCalendar addTripCalendar(@RequestBody TripCalendar tripCal, @PathVariable Integer tid, HttpServletResponse resp, HttpServletRequest req) {
		try {
			svc.create(tripCal, tid);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(tripCal.getId());
			resp.addHeader("Location", url.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resp.setStatus(400);
			e.printStackTrace();
		}
		return tripCal;
	}
	
	@PutMapping("tripCalendars/{tcid}")
	public TripCalendar update(@PathVariable Integer tcid, @RequestBody TripCalendar tripCal, HttpServletResponse resp) {
		try {
			tripCal = svc.update(tripCal, tcid);
			
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
		}
		return tripCal;
	}
	
	@DeleteMapping("tripCalendars/{tcid}")
	public void deleteTripCalendar (
			@PathVariable Integer tcid,
			HttpServletResponse resp)
			 {
		try {
			if (svc.destroy(tcid)) {
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
