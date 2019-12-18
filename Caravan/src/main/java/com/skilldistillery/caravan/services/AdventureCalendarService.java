package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.AdventureCalendar;

public interface AdventureCalendarService {

	public List<AdventureCalendar> index(String string);

	public AdventureCalendar findAdventureCalendarById(int id);

	public AdventureCalendar createAdventureCalendar(AdventureCalendar adventureCalendar);

	public AdventureCalendar updateAdventureCalendar(int id, AdventureCalendar adventureCalendar);

	public boolean deleteAdventureCalendarById(int id);
}
