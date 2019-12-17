package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Integer>{

}
