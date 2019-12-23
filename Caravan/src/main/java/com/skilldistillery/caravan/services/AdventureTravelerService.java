package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.AdventureTraveler;

public interface AdventureTravelerService {
	public AdventureTraveler create(AdventureTraveler adventureTraveler, int aid, Principal principal);

	public AdventureTraveler update(AdventureTraveler adventureTraveler, int ad);

	public List<AdventureTraveler> index();

	public AdventureTraveler show(int id);

	boolean destroy(int id);
	
	public List<AdventureTraveler> getRequests(String username);
}
