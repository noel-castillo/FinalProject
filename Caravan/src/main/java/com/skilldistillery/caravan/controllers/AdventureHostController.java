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

import com.skilldistillery.caravan.entities.AdventureHost;
import com.skilldistillery.caravan.entities.AdventureTraveler;
import com.skilldistillery.caravan.services.AdventureHostService;
import com.skilldistillery.caravan.services.AdventureTravelerService;

@RestController
@RequestMapping("api")
@CrossOrigin({"*", "http://localhost:4260"})
public class AdventureHostController {
	
	@Autowired
	AdventureHostService svc;


	@GetMapping("adventureHosts")
	public List<AdventureHost> allAdventureTravelers(Principal prin) {
		return svc.index();
	}
	
	@GetMapping("myAdventureHosts")
	public List<AdventureHost> allTripsRequests(Principal prin,HttpServletResponse resp, HttpServletRequest req) {
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
	
	@GetMapping("adventureHosts/{atid}")
	public AdventureHost getTripHost(@PathVariable Integer atid, HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			System.out.println(prin.toString());
			StringBuffer url = req.getRequestURL();
			resp.addHeader("Location", url.toString());
			resp.setStatus(201);
			return svc.show(atid);
		} catch (Exception e) {
			resp.setStatus(404);
			return null;
		}	
	}
	
	
	@PostMapping("adventures/{aid}/adventureHosts")
	public AdventureHost addTripHost(@PathVariable Integer aid, @RequestBody AdventureHost adventureHost, HttpServletResponse resp, HttpServletRequest req, Principal prin) {
		try {
			svc.create(adventureHost, aid, prin);
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(adventureHost.getId());
			resp.addHeader("Location", url.toString());
			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			resp.setStatus(400);
			e.printStackTrace();
		}
		return adventureHost;
	}
	
	@PutMapping("adventureTravelers/{atid}")
	public AdventureHost update(@PathVariable Integer atid, @RequestBody AdventureHost adventureHost, HttpServletResponse resp) {
		try {
			adventureHost = svc.update(adventureHost, atid);
			
		} catch (Exception e) {
			e.printStackTrace();
			resp.setStatus(401);
		}
		return adventureHost;
	}
	
	@DeleteMapping("adventureTravelers/{atid}")
	public void deleteTripTraveler(@PathVariable Integer atid, HttpServletResponse resp) {
		try {
			if (svc.destroy(atid)) {
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
