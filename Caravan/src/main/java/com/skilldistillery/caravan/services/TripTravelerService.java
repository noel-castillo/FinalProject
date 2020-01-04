package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.TripTraveler;

public interface TripTravelerService {
	public TripTraveler create(TripTraveler tripTraveler, int tid, Principal principal);

	public TripTraveler update(TripTraveler tripTraveler, int id);

	public List<TripTraveler> index();

	public TripTraveler show(int id);

	boolean destroy(int id);
	
	public List<TripTraveler> getRequests(String username);

	public List<TripTraveler> getMyTrips(String name);
	
	public List<TripTraveler> myTripRequests(Principal principal);
}
