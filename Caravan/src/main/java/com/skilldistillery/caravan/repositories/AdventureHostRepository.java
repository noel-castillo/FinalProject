package com.skilldistillery.caravan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.AdventureHost;
import com.skilldistillery.caravan.entities.AdventureTraveler;

public interface AdventureHostRepository extends JpaRepository<AdventureHost, Integer> {
	public List<AdventureTraveler> findByAdventure_Host_User_Username(String username);
}
