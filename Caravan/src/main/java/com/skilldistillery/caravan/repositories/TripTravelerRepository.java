package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.TripTraveler;

public interface TripTravelerRepository extends JpaRepository<TripTraveler, Integer> {

}
