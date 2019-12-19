package com.skilldistillery.caravan.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.TripMessage;

public interface TripMessageRepository extends JpaRepository<TripMessage, Integer> {
	
	public TripMessage findByUserProfile_User_UsernameAndId(String username, int id);
	
	public List<TripMessage> findByTrip_Id( int id);
	
	

}
