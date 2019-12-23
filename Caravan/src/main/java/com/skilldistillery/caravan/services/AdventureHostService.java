package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.AdventureHost;
import com.skilldistillery.caravan.entities.AdventureTraveler;
import com.skilldistillery.caravan.entities.TripHost;

public interface AdventureHostService {
public List<AdventureHost> index();
	
	public AdventureHost show(int id);
	
	public AdventureHost create(AdventureHost adventureHost, int aid, Principal principal);

	public AdventureHost update(AdventureHost adventureHost, int id);

	boolean destroy(int id);

	List<AdventureHost> getRequests(String username);
}
