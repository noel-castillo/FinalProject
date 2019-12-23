package com.skilldistillery.caravan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.AdventureTraveler;

public interface AdventureTravelerRepository extends JpaRepository<AdventureTraveler, Integer> {
	public List<AdventureTraveler> findByAdventure_Host_User_Username(String username);
}
