package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Trip;
import com.skilldistillery.caravan.repositories.TripRepository;

@Service
public class TripServiceImpl implements TripService{

	@Autowired
	TripRepository tRepo;
	
	@Override
	public Trip create(Trip trip) {
		tRepo.saveAndFlush(trip);
		return null;
	}

	@Override
	public Trip update(Trip trip, int id) {
		Trip existing = null;
		Optional<Trip> opt = tRepo.findById(id);
		if(opt.isPresent()) {
			existing = opt.get();
			existing.setHost(trip.getHost());
			existing.setVehicle(trip.getVehicle());
			existing.setDepartureAddress(trip.getDepartureAddress());
			existing.setDestinationAddress(trip.getDestinationAddress());
			existing.setDescription(trip.getDescription());
			existing.setSeatsAvailable(trip.getSeatsAvailable());
			existing.setCargoCapacity(trip.getCargoCapacity());
			existing.setCreateDate(trip.getCreateDate());
			existing.setCreateDate(trip.getCreateDate());
			existing.setEnabled(trip.isEnabled());
			existing.setTotalCost(trip.getTotalCost());
			existing.setMiles(trip.getMiles());

			tRepo.saveAndFlush(existing);
		}
		return existing;
	}

	@Override
	public List<Trip> index(Principal principal) {
		return tRepo.findAll();
	}

	@Override
	public Trip show(int id) {
		Trip trip = null;
		Optional<Trip> opt = tRepo.findById(id);
		if (opt.isPresent()) {
			trip = opt.get();
		}
		return trip;
	}

	@Override
	public boolean destroy(int id) {
		
		boolean deleted = false;
		if (tRepo.existsById(id)) {
			tRepo.deleteById(id);;
			deleted = true;
		}
		return deleted;
	}

}
