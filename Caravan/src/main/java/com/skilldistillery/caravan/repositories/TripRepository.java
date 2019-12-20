package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Trip;

public interface TripRepository extends JpaRepository<Trip, Integer> {

	public Trip findByHost_User_Username(String username);
}
