package com.skilldistillery.caravan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.TripCalendar;
import com.skilldistillery.caravan.repositories.TripCalendarRepository;

@Service
public class TripCalendarServiceImpl implements TripCalendarService {
	
	@Autowired
	TripCalendarRepository tcRepo;
	
	@Override
	public TripCalendar create(TripCalendar tripCal) {
		tcRepo.saveAndFlush(tripCal);
		return tripCal;
	}

	@Override
	public TripCalendar update(TripCalendar tripCal, int id) {
		TripCalendar existing = null;
		Optional<TripCalendar> opt = tcRepo.findById(id);
		if(opt.isPresent()) {
			existing = opt.get();
			existing.setTrip(tripCal.getTrip());
			existing.setStartDate(tripCal.getStartDate());
			existing.setEndDate(tripCal.getEndDate());

			tcRepo.saveAndFlush(existing);
		}
		return existing;
	}

	@Override
	public List<TripCalendar> index() {
		return tcRepo.findAll();
	}

	@Override
	public TripCalendar show(int id) {
		TripCalendar tripCal = null;
		Optional<TripCalendar> opt = tcRepo.findById(id);
		if (opt.isPresent()) {
			tripCal = opt.get();
		}
		return tripCal;
	}

	@Override
	public boolean destroy(int id) {
		boolean deleted = false;
		if (tcRepo.existsById(id)) {
			tcRepo.deleteById(id);;
			deleted = true;
		}
		return deleted;	}

}
