package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.Trip;

public interface TripService {
	public Trip create(Trip trip, Principal prin);

	public Trip update(Trip trip, int id);

	public List<Trip> indexNotHosted(String username);
	
	public List<Trip> indexHosted(String username);
	
	public List<Trip> index();

	public Trip show(int id);

	boolean destroy(int id);
}
