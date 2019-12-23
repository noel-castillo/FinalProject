package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.AdventureHost;
import com.skilldistillery.caravan.entities.AdventureTraveler;
import com.skilldistillery.caravan.entities.TripHost;
import com.skilldistillery.caravan.entities.TripTraveler;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.AdventureHostRepository;
import com.skilldistillery.caravan.repositories.AdventureRepository;
import com.skilldistillery.caravan.repositories.AdventureTravelerRepository;
import com.skilldistillery.caravan.repositories.TripHostRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class AdventureHostServiceImpl implements AdventureHostService {


	@Autowired
	AdventureHostRepository aHRepo;
	
	@Autowired
	AdventureRepository adventureRepo;
	
	@Autowired
	UserProfileRepository userProfileRepo;
	
	@Autowired
	UserRepository userRepo;

	@Override
	public List<AdventureHost> index() {
		return aHRepo.findAll();
	}

	@Override
	public AdventureHost show(int id) {
		AdventureHost host = null;
		Optional<AdventureHost> opt =  aHRepo.findById(id);
		if (opt.isPresent()) {
			host = opt.get();
		}
		return host;
	}

	@Override
	public AdventureHost create(AdventureHost adventureHost, int aid, Principal principal) {

		User user = userRepo.findByUsername(principal.getName());
		UserProfile userProfile= userProfileRepo.findByUser(user);
		Adventure adventure = adventureRepo.findById(aid).get();
		adventureHost.setUser(userProfile);
		adventureHost.setAdventure(adventure);
		return aHRepo.saveAndFlush(adventureHost);
	}

	@Override
	public AdventureHost update(AdventureHost tripHost, int id) {

		AdventureHost existing = null;
		Optional<AdventureHost> opt = aHRepo.findById(id);
		if (opt.isPresent()) {
			existing = opt.get();
			existing.setRating(tripHost.getRating());
			existing.setReview(tripHost.getReview());
//			existing.setAttended(tripHost.isAttended());
//			existing.setTrip(tripTraveler.getTrip());
//			existing.setUser(tripTraveler.getUser());

			aHRepo.saveAndFlush(existing);
		}
		return existing;
	
	}

	@Override
	public boolean destroy(int id) {
		boolean deleted = false;
		if (aHRepo.existsById(id)) {
			aHRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}
	
	
	@Override
	public List<AdventureHost> getRequests(String username) {
		List<AdventureHost> hostRequest = new ArrayList<AdventureHost>();

		List<AdventureHost> requests = aHRepo.findByAdventure_Host_User_Username(username);

		requests.forEach(req -> {
			
				hostRequest.add(req);
			
		});

		return hostRequest;
	}
	


}
