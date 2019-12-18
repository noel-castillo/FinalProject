package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.TripMessage;

public interface MessageBoardRepository extends JpaRepository<TripMessage, Integer>{

}
