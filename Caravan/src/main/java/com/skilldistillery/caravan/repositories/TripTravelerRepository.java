package com.skilldistillery.caravan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.TripTraveler;

public interface TripTravelerRepository extends JpaRepository<TripTraveler, Integer> {
	public List<TripTraveler> findByTrip_Host_User_Username(String username);
	
}
