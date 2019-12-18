package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Address;
import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.AdventureCalendar;
import com.skilldistillery.caravan.repositories.AdventureCalendarRepository;
import com.skilldistillery.caravan.repositories.AdventureRepository;

@Service
public class AdventureCalendarServiceImpl implements AdventureCalendarService {

	@Autowired
	private AdventureCalendarRepository aRepo;

	@Autowired
	private AdventureRepository adventureRepo;

	@Override
	public List<AdventureCalendar> index(String string) {
		return aRepo.findAll();
	}

	@Override
	public AdventureCalendar findAdventureCalendarById(int id) {
		return aRepo.findById(id).get();
	}

	@Override
	public AdventureCalendar createAdventureCalendar(int adventureId, AdventureCalendar adventureCalendar) {
		Adventure adventure = adventureRepo.findById(adventureId).get();
		adventureCalendar.setAdventure(adventure);
		adventureCalendar = aRepo.saveAndFlush(adventureCalendar);
		adventure.setAdventureCalendar(adventureCalendar);
		adventureRepo.saveAndFlush(adventure);
		return adventureCalendar;
	}

	@Override
	public AdventureCalendar updateAdventureCalendar(int id, int cid, AdventureCalendar adventureCalendar) {
		AdventureCalendar oldAventureCalendar = aRepo.findById(cid).get();

		if (oldAventureCalendar != null) {

			oldAventureCalendar.setStartDate(adventureCalendar.getStartDate());
			oldAventureCalendar.setEndDate(adventureCalendar.getEndDate());
			oldAventureCalendar.setAdventure(adventureCalendar.getAdventure());

			return aRepo.saveAndFlush(oldAventureCalendar);
		}

		else {

			return null;
		}
	}

	@Override
	public boolean deleteAdventureCalendarById(int cid) {
		AdventureCalendar adventureCalendar = aRepo.findById(cid).get();

		if (adventureCalendar != null) {
			aRepo.delete(adventureCalendar);
			return true;
		}
		return false;
	}

}
