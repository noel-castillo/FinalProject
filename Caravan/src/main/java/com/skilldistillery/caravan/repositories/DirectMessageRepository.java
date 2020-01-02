package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.DirectMessage;

public interface DirectMessageRepository extends JpaRepository<DirectMessage, Integer> {
	
}
