package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer> {
	public UserProfile findByUser(User user);
}
