package com.skilldistillery.caravan.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
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
			adventure.setAddress(userProfile.getAddress());
			return aRepo.saveAndFlush(adventure);
		} else {
			System.out.println("in else");

			System.out.println("****************************************************");

			return null;
		}

	}

	@Override
	public Adventure update(Adventure adventure, String username, int id) {
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
