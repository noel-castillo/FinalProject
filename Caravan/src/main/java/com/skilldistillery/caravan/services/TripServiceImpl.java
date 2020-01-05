package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Address;
import com.skilldistillery.caravan.entities.Trip;
import com.skilldistillery.caravan.entities.TripCalendar;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.entities.Vehicle;
import com.skilldistillery.caravan.repositories.AddressRepository;
import com.skilldistillery.caravan.repositories.TripCalendarRepository;
import com.skilldistillery.caravan.repositories.TripRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;
import com.skilldistillery.caravan.repositories.VehicleRepository;

@Service
public class TripServiceImpl implements TripService {

	@Autowired
	private TripRepository tRepo;

	@Autowired
	private AddressRepository addrRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserProfileRepository userProfileRepo;

	@Autowired
	private VehicleRepository vRepo;
	
	@Autowired 
	private TripCalendarRepository tcRepo;
	
	@Override
	public List<Trip> index() {
		return tRepo.findAll();
	}

	@Override
	public List<Trip> indexHosted(String username) {
		
		return tRepo.findByHost_User_Username(username);
	}

	@Override
	public Trip create(Trip trip, Principal prin) {
		User user = userRepo.findByUsername(prin.getName());
		UserProfile userProfile = userProfileRepo.findByUser(user);
	

		Address address = trip.getDepartureAddress();
		address = addrRepo.saveAndFlush(address);

		Address address2 = trip.getDestinationAddress();
		address2 = addrRepo.saveAndFlush(address2);
		
		TripCalendar tc = trip.getTripCalendar();
		tc = tcRepo.saveAndFlush(tc);
		
		trip.setDepartureAddress(address);
		trip.setDestinationAddress(address2);
		trip.setHost(userProfile);
		trip.setEnabled(true);
		trip = tRepo.saveAndFlush(trip);
		
		tc.setTrip(trip);
		tc = tcRepo.saveAndFlush(tc);
		trip.setTripCalendar(tc);
		
		
		return tRepo.saveAndFlush(trip);
	}

	@Override
	public Trip update(Trip trip, int id) {
		Trip existing = null;
		Address departureAddress = null;
		Address destinationAddress = null;
		Vehicle tripVehicle = null;
		TripCalendar tc = null;
		
		Optional<TripCalendar> optTripCal = tcRepo.findById(trip.getTripCalendar().getId());
		if (optTripCal.isPresent()) {
			tc = optTripCal.get();
			tc.setStartDate(trip.getTripCalendar().getStartDate());
			tc.setEndDate(trip.getTripCalendar().getEndDate());
			tc.setTrip(trip);
			tcRepo.saveAndFlush(tc);
		}

		Optional<Address> optDepAddress = addrRepo.findById(trip.getDepartureAddress().getId());
		if (optDepAddress.isPresent()) {
			departureAddress = optDepAddress.get();
			departureAddress.setCity(trip.getDepartureAddress().getCity());
			departureAddress.setState(trip.getDepartureAddress().getState());
			departureAddress.setZip(trip.getDepartureAddress().getZip());
			departureAddress.setStreet(trip.getDepartureAddress().getStreet());
			addrRepo.saveAndFlush(departureAddress);
		}

		Optional<Address> optDestAddress = addrRepo.findById(trip.getDestinationAddress().getId());
		if (optDestAddress.isPresent()) {
			destinationAddress = optDestAddress.get();
			destinationAddress.setCity(trip.getDestinationAddress().getCity());
			destinationAddress.setState(trip.getDestinationAddress().getState());
			destinationAddress.setZip(trip.getDestinationAddress().getZip());
			destinationAddress.setStreet(trip.getDestinationAddress().getStreet());
			addrRepo.saveAndFlush(destinationAddress);
		}

		Optional<Vehicle> optVehicle = vRepo.findById(trip.getVehicle().getId());
		if (optVehicle.isPresent()) {
			tripVehicle = optVehicle.get();
			tripVehicle.setCapacity(trip.getVehicle().getCapacity());
			tripVehicle.setInteriorDescription(trip.getVehicle().getInteriorDescription());
			tripVehicle.setMake(trip.getVehicle().getMake());
			tripVehicle.setModel(trip.getVehicle().getModel());
			tripVehicle.setManufactureYear(trip.getVehicle().getManufactureYear());
			tripVehicle.setSeatsAvailable(trip.getVehicle().getCapacity());
			tripVehicle.setUserProfile(trip.getVehicle().getUserProfile());
			vRepo.saveAndFlush(tripVehicle);
		}

		Optional<Trip> opt = tRepo.findById(id);
		if (opt.isPresent()) {
			existing = opt.get();
			existing.setTitle(trip.getTitle());
			existing.setHost(trip.getHost());
			existing.setVehicle(tripVehicle);
			existing.setDepartureAddress(departureAddress);
			existing.setDestinationAddress(destinationAddress);
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
	public List<Trip> indexNotHosted(String username) {

		List<Trip> tripsNotHosted = new ArrayList<Trip>();

		tRepo.findAll().forEach(trip -> {
			if (!trip.getHost().getUser().getUsername().equals(username)) {
				tripsNotHosted.add(trip);
			}
		});

		return tripsNotHosted;
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
			tRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

}
