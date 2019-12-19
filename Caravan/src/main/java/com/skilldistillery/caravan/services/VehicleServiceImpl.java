package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.entities.Vehicle;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;
import com.skilldistillery.caravan.repositories.VehicleRepository;

@Service
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository vehicleRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserProfileRepository userProfileRepo;

	@Override
	public List<Vehicle> index(Principal principal) {
	
		return vehicleRepo.findAll();
	}
	
	@Override
	public List<Vehicle> indexByUser(Principal principal) {
		List<Vehicle> vehicles = new ArrayList<>();
		User user = userRepo.findByUsername(principal.getName());
		UserProfile userProfile = userProfileRepo.findByUser(user);
		
		return vehicleRepo.findByUserProfile(userProfile);
	}

	@Override
	public Vehicle findVehicleById(int id) {
		Vehicle vehicle = vehicleRepo.findById(id).get();

		if (vehicle != null) {

			return vehicle;
		} else {

			return null;
		}
	}

	@Override
	public Vehicle createVehicle(Vehicle vehicle, Principal principal) {
		User user = userRepo.findByUsername(principal.getName());
		UserProfile userProfile = userProfileRepo.findByUser(user);
		
		if (vehicle != null) {
			vehicle.setUserProfile(userProfile);
			return vehicleRepo.saveAndFlush(vehicle);
		} else {

			return null;
		}
	}

	@Override
	public Vehicle updateVehicle(int id, Vehicle vehicle) {
		Vehicle oldVehicle = vehicleRepo.findById(id).get();

		if (oldVehicle != null) {

			oldVehicle.setMake(vehicle.getMake());
			oldVehicle.setModel(vehicle.getModel());
			oldVehicle.setManufactureYear(vehicle.getManufactureYear());
			oldVehicle.setCapacity(vehicle.getCapacity());
			oldVehicle.setSeatsAvailable(vehicle.getSeatsAvailable());
			oldVehicle.setInteriorDescription(vehicle.getInteriorDescription());
			oldVehicle.setUserProfile(vehicle.getUserProfile());

			return vehicleRepo.saveAndFlush(oldVehicle);
		}

		else {

			return null;
		}
	}

	@Override
	public boolean deleteVehicleById(int id) {
		Vehicle vehicle = vehicleRepo.findById(id).get();

		if (vehicle != null) {
			vehicleRepo.delete(vehicle);
			return true;
		}
		return false;
	}

}
