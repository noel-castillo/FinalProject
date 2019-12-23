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
	AdventureHostRepository thRepo;

	@Override
	public List<AdventureHost> index() {
		return thRepo.findAll();
	}

	@Override
	public AdventureHost show(int id) {
		AdventureHost host = null;
		Optional<AdventureHost> opt =  thRepo.findById(id);
		if (opt.isPresent()) {
			host = opt.get();
			return host;
		}
		return null;
	}

	@Override
	public AdventureHost create(AdventureHost review) {
		return thRepo.saveAndFlush(review);

	}

	@Override
	public AdventureHost update(AdventureHost review, int id) {
		System.out.println(review.toString());
		AdventureHost update = null;
		Optional<AdventureHost> opt = thRepo.findById(id);
		if (opt.isPresent()) {
			update = opt.get();
		}
		update.setRating(review.getRating());
		update.setReview(review.getReview());
		update.setAdventure(review.getAdventure());//was set trip
		update.setUser(review.getUser());//was set passenger
		thRepo.saveAndFlush(update);
		return update;
	}

	@Override
	public boolean destroy(int id) {
		AdventureHost delete = null;
		Optional<AdventureHost> opt = thRepo.findById(id);
		if (opt.isPresent()) {
			delete = opt.get();
			thRepo.delete(delete);
			return true;
		}
		
		return false;
	}
	
	


}
