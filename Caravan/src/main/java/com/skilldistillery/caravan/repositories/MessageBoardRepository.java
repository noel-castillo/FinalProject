package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.MessageBoard;

public interface MessageBoardRepository extends JpaRepository<MessageBoard, Integer>{

}
