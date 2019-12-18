package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	
	public User findByUsername(String username);
	
	public User findByUsernameAndId(String username, int id);

}
