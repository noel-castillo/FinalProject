package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Adventure;

public interface AdventureRepository extends JpaRepository<Adventure, Integer> {
	
	public Adventure findByHost_User_Username(String username);
	
	public Adventure findByHost_User_UsernameAndId(String username, int id);
}
