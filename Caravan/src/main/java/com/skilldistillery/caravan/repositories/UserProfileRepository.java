package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.UserProfile;

public interface UserProfileRepository extends JpaRepository<UserProfile, Integer>{

}
