package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Integer>{

}
