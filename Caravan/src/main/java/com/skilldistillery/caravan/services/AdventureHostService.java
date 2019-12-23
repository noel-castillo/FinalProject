package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.AdventureHost;
import com.skilldistillery.caravan.entities.AdventureTraveler;

public interface AdventureHostService {
	public AdventureHost create(AdventureTraveler adventureHost, int aid, Principal principal);

	public AdventureHost update(AdventureTraveler adventureHost, int ad);

	public List<AdventureHost> index();

	public AdventureHost show(int id);

	boolean destroy(int id);
	
	public List<AdventureHost> getRequests(String username);
}
