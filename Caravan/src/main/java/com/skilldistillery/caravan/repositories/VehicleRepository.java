package com.skilldistillery.caravan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{

	List<Vehicle> findByUserProfile(UserProfile userProfile);

}
