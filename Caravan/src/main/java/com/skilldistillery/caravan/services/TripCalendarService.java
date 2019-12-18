package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.TripCalendar;

public interface TripCalendarService {
	
	public TripCalendar create(TripCalendar tripCal);

	public TripCalendar update(TripCalendar tripCal, int id);

	public List<TripCalendar> index();

	public TripCalendar show(int id);

	boolean destroy(int id);
}
