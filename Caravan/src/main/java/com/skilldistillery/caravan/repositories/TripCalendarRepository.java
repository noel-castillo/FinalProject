package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.TripCalendar;

public interface TripCalendarRepository extends JpaRepository<TripCalendar, Integer>{

}
