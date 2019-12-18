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

import com.skilldistillery.caravan.entities.Address;
import com.skilldistillery.caravan.services.AddressService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class AddressController {

	@Autowired
	private AddressService svc;

	@GetMapping("addresses")
	public List<Address> index(Principal principal) {
		return svc.index(principal);
	}

	@GetMapping("addresses/{id}")
	public Address showAddress(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		Address address = svc.findAddressById(id);
		if (address == null) {
			response.setStatus(404);
		}
		return address;
	}

	@PostMapping("addresses")
	public Address createAddress(@RequestBody Address address, HttpServletRequest request,
			HttpServletResponse response) {
		if ((address = svc.createAddress(address)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(address.getId());
			response.addHeader("Location", url.toString());
			return address;
		} else {
			response.setStatus(400);
			return null;
		}
	}

	@PutMapping("addresses/{id}")
	public Address updateAddress(@PathVariable int id, @RequestBody Address address, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			address = svc.updateAddress(id, address);
			if (address == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			address = null;
		}
		return address;
	}

	@DeleteMapping("addresses/{id}")
	public boolean deleteAddress(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		try {
			boolean deleted = svc.deleteAddressById(id);
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
