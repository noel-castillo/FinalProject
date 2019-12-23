package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Trip;
import com.skilldistillery.caravan.entities.TripTraveler;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.TripRepository;
import com.skilldistillery.caravan.repositories.TripTravelerRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class TripTravelerServiceImpl implements TripTravelerService {

	@Autowired
	TripTravelerRepository ttRepo;
	
	@Autowired
	TripRepository tripRepo;
	
	@Autowired
	UserProfileRepository userProfileRepo;
	
	@Autowired
	UserRepository userRepo;

	@Override
	public TripTraveler create(TripTraveler tripTraveler, int tid, Principal principal) {
		
		User user = userRepo.findByUsername(principal.getName());
		UserProfile userProfile= userProfileRepo.findByUser(user);
		Trip trip = tripRepo.findById(tid).get();
		
		//Iterate through existing trip travelers with matching user and trip then only change status if exists
		for(TripTraveler element : ttRepo.findAll()) {
			if(element.getTrip() == trip && element.getUser() == userProfile) {
				System.out.println("Match Found in creating Trip Traveler");
				element.setTravelerStatus(tripTraveler.getTravelerStatus());
				return element;
			}
		}
		
		tripTraveler.setUser(userProfile);
		tripTraveler.setTrip(trip);
		ttRepo.saveAndFlush(tripTraveler);
		return tripTraveler;
	}

	@Override
	public TripTraveler update(TripTraveler tripTraveler, int id) {
		TripTraveler existing = null;
		Optional<TripTraveler> opt = ttRepo.findById(id);
		if (opt.isPresent()) {
			existing = opt.get();
			existing.setRating(tripTraveler.getRating());
			existing.setReview(tripTraveler.getReview());
			existing.setContributionPledge(tripTraveler.getContributionPledge());
			existing.setContributionActual(tripTraveler.getContributionActual());
			existing.setAttended(tripTraveler.isAttended());
			existing.setTravelerStatus(tripTraveler.getTravelerStatus());
//			existing.setTrip(tripTraveler.getTrip());
//			existing.setUser(tripTraveler.getUser());

			ttRepo.saveAndFlush(existing);
		}
		return existing;
	}

	@Override
	public List<TripTraveler> index() {
		return ttRepo.findAll();
	}

	@Override
	public TripTraveler show(int id) {
		TripTraveler tripTraveler = null;
		Optional<TripTraveler> opt = ttRepo.findById(id);
		if (opt.isPresent()) {
			tripTraveler = opt.get();
		}
		return tripTraveler;
	}

	@Override
	public boolean destroy(int id) {
		boolean deleted = false;
		if (ttRepo.existsById(id)) {
			ttRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<TripTraveler> getRequests(String username) {
		List<TripTraveler> hostRequest = new ArrayList<TripTraveler>();

		List<TripTraveler> requests = ttRepo.findByTrip_Host_User_Username(username);

		requests.forEach(req -> {
			if (!req.isApproved()) {
				hostRequest.add(req);
			}
		});

		return hostRequest;
	}
}
