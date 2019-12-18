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

import com.skilldistillery.caravan.entities.Vehicle;
import com.skilldistillery.caravan.services.VehicleService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class VehicleController {

	@Autowired
	private VehicleService svc;

	@GetMapping("vehicles")
	public List<Vehicle> findAllVehicles(Principal principal) {
		return svc.index(principal);
	}

	@GetMapping("vehicles/{id}")
	public Vehicle showVehicle(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		Vehicle vehicle = svc.findVehicleById(id);
		if (vehicle == null) {
			response.setStatus(404);
		}
		return vehicle;
	}

	@PostMapping("vehicles")
	public Vehicle createVehicle(@RequestBody Vehicle vehicle, HttpServletRequest request,
			HttpServletResponse response) {
		if ((vehicle = svc.createVehicle(vehicle)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(vehicle.getId());
			response.addHeader("Location", url.toString());
			return vehicle;
		} else {
			response.setStatus(400);
			return null;
		}
	}

	@PutMapping("vehicles/{id}")
	public Vehicle updateVehicle(@PathVariable int id, @RequestBody Vehicle vehicle, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			vehicle = svc.updateVehicle(id, vehicle);
			if (vehicle == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			vehicle = null;
		}
		return vehicle;
	}

	@DeleteMapping("vehicles/{id}")
	public boolean deleteUser(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		try {
			boolean deleted = svc.deleteVehicleById(id);
			if (deleted) {
				response.setStatus(204);
				return true;
			} else {
				response.setStatus(404);
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			return false;
		}

	}

}
