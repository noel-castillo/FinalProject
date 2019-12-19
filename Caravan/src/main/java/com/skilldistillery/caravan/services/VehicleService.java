package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.Vehicle;

public interface VehicleService {

	List<Vehicle> index(Principal principal);

	Vehicle findVehicleById(int id);

	Vehicle createVehicle(Vehicle vehicle, Principal principal);

	Vehicle updateVehicle(int id, Vehicle vehicle);

	boolean deleteVehicleById(int id);

	List<Vehicle> indexByUser(Principal principal);


}
