package com.skilldistillery.caravan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Trip;

public interface TripRepository extends JpaRepository<Trip, Integer> {

	
	public List<Trip> findByHost_User_Username(String username);
}
