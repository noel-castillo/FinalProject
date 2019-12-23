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
import com.skilldistillery.caravan.entities.TripTraveler;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.AdventureHostRepository;
import com.skilldistillery.caravan.repositories.AdventureRepository;
import com.skilldistillery.caravan.repositories.AdventureTravelerRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class AdventureHostServiceImpl implements AdventureHostService {

	@Autowired
	AdventureHostRepository atRepo;
	
	@Autowired
	AdventureRepository adventureRepo;
	
	@Autowired
	UserProfileRepository userProfileRepo;
	
	@Autowired
	UserRepository userRepo;

	@Override
	public AdventureHost create(AdventureTraveler adventureTraveler, int aid, Principal principal) {
		User user = userRepo.findByUsername(principal.getName());
		UserProfile userProfile= userProfileRepo.findByUser(user);
		Adventure adventure = adventureRepo.findById(aid).get();
		adventureTraveler.setUser(userProfile);
		adventureTraveler.setAdventure(adventure);
		return atRepo.saveAndFlush(adventureTraveler);
	}

	@Override
	public AdventureHost update(AdventureTraveler tripTraveler, int id) {
		AdventureTraveler existing = null;
		Optional<AdventureTraveler> opt = atRepo.findById(id);
		if (opt.isPresent()) {
			existing = opt.get();
			existing.setRating(tripTraveler.getRating());
			existing.setReview(tripTraveler.getReview());
			existing.setAttended(tripTraveler.isAttended());
//			existing.setTrip(tripTraveler.getTrip());
//			existing.setUser(tripTraveler.getUser());

			atRepo.saveAndFlush(existing);
		}
		return existing;
	}

	@Override
	public List<AdventureHost> index() {
		return atRepo.findAll();
	}

	@Override
	public AdventureHost show(int id) {
		AdventureTraveler tripTraveler = null;
		Optional<AdventureTraveler> opt = atRepo.findById(id);
		if (opt.isPresent()) {
			tripTraveler = opt.get();
		}
		return tripTraveler;
	}

	@Override
	public boolean destroy(int id) {
		boolean deleted = false;
		if (atRepo.existsById(id)) {
			atRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<AdventureHost> getRequests(String username) {
		List<AdventureHost> hostRequest = new ArrayList<AdventureHost>();

		List<AdventureHost> requests = atRepo.findByAdventure_Host_User_Username(username);

		requests.forEach(req -> {
			if (!req.isApproved()) {
				hostRequest.add(req);
			}
		});

		return hostRequest;
	}
}
