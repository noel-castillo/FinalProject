package com.skilldistillery.caravan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.TripTraveler;
import com.skilldistillery.caravan.repositories.TripTravelerRepository;

@Service
public class TripTravelerServiceImpl implements TripTravelerService {

	@Autowired
	TripTravelerRepository ttRepo;
	
	@Override
	public TripTraveler create(TripTraveler tripTraveler) {
		ttRepo.saveAndFlush(tripTraveler);
		return tripTraveler;
	}

	@Override
	public TripTraveler update(TripTraveler tripTraveler, int id) {
		TripTraveler existing = null;
		Optional<TripTraveler> opt = ttRepo.findById(id);
		if(opt.isPresent()) {
			existing = opt.get();
			existing.setRating(tripTraveler.getRating());
			existing.setReview(tripTraveler.getReview());
			existing.setContributionPledge(tripTraveler.getContributionPledge());
			existing.setContributionActual(tripTraveler.getContributionActual());
			existing.setAttended(tripTraveler.isAttended());
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
}
