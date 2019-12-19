package com.skilldistillery.caravan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Address;
import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.AddressRepository;
import com.skilldistillery.caravan.repositories.AdventureRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class AdventureServiceImpl implements AdventureService {

	@Autowired
	private AdventureRepository aRepo;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private UserProfileRepository userProfileRepo;
	
	@Autowired
	
	private AddressRepository addRepo;

	@Override
	public List<Adventure> index() {
		return aRepo.findAll();

	}

	@Override
	public Adventure show(int id) {
		Adventure adv = null;
		Optional<Adventure> opt = aRepo.findById(id);
		if (opt.isPresent()) {
			adv = opt.get();

			return adv;
		}
		return null;
	}

	@Override
	public Adventure create(Adventure adventure, String username) {

		User user = userRepo.findByUsername(username);
		UserProfile userProfile = userProfileRepo.findByUser(user);

		if (userProfile != null) {
			adventure.setHost(userProfile);
			
			Address address = addRepo.saveAndFlush(adventure.getAddress());
			
			adventure.setAddress(address);
			return aRepo.saveAndFlush(adventure);
		} else {

			return null;
		}

	}

	@Override
	public Adventure update(Adventure adventure, String username, int id) {

		Adventure adventureToUpdate = aRepo.findById(id).get();

		if (adventureToUpdate != null) {

			adventureToUpdate.setActivityLvl(adventure.getActivityLvl());
			adventureToUpdate.setAddress(adventure.getAddress());
			adventureToUpdate.setAdventureCalendar(adventure.getAdventureCalendar());
			adventureToUpdate.setDescription(adventure.getDescription());
			adventureToUpdate.setEnabled(adventure.isEnabled());
			adventureToUpdate.setHost(adventure.getHost());
			adventureToUpdate.setIncludes(adventure.getIncludes());
			adventureToUpdate.setItinerary(adventure.getItinerary());
			adventureToUpdate.setPrice(adventure.getPrice());
			adventureToUpdate.setTitle(adventure.getTitle());

			return aRepo.saveAndFlush(adventureToUpdate);
		}

		return null;
	}

	@Override
	public boolean destroy(int id) {

		Adventure adventure = aRepo.findById(id).get();

		if (adventure != null) {
			aRepo.delete(adventure);
			return true;
		}

		return false;
	}

}
