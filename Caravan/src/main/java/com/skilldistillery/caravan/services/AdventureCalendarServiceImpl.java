package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.caravan.entities.AdventureCalendar;
import com.skilldistillery.caravan.repositories.AdventureCalendarRepository;

public class AdventureCalendarServiceImpl implements AdventureCalendarService {

	@Autowired
	private AdventureCalendarRepository aRepo;

	@Override
	public List<AdventureCalendar> index(String string) {
		return aRepo.findAll();
	}

	@Override
	public AdventureCalendar findAdventureCalendarById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public AdventureCalendar createAdventureCalendar(AdventureCalendar adventureCalendar) {

		return aRepo.saveAndFlush(adventureCalendar);
	}

	@Override
	public AdventureCalendar updateAdventureCalendar(int id, AdventureCalendar adventureCalendar) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteAdventureCalendarById(int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
