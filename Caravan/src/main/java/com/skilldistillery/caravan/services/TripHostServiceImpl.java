package com.skilldistillery.caravan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.TripHost;
import com.skilldistillery.caravan.repositories.TripHostRepository;

@Service
public class TripHostServiceImpl implements TripHostService{

	@Autowired
	TripHostRepository thRepo;

	@Override
	public List<TripHost> index() {
		return thRepo.findAll();
	}

	@Override
	public TripHost show(int id) {
		TripHost host = null;
		Optional<TripHost> opt =  thRepo.findById(id);
		if (opt.isPresent()) {
			host = opt.get();
			return host;
		}
		return null;
	}

	@Override
	public TripHost create(TripHost review) {
		return thRepo.saveAndFlush(review);

	}

	@Override
	public TripHost update(TripHost review, int id) {
		System.out.println(review.toString());
		TripHost update = null;
		Optional<TripHost> opt = thRepo.findById(id);
		if (opt.isPresent()) {
			update = opt.get();
		}
		update.setRating(review.getRating());
		update.setReview(review.getReview());
		update.setTrip(review.getTrip());
		update.setPassenger(review.getPassenger());
		thRepo.saveAndFlush(update);
		return update;
	}

	@Override
	public boolean destroy(int id) {
		TripHost delete = null;
		Optional<TripHost> opt = thRepo.findById(id);
		if (opt.isPresent()) {
			delete = opt.get();
			thRepo.delete(delete);
			return true;
		}
		
		return false;
	}
	
	

}
