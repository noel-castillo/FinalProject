package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.repositories.AdventureRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

public class AdventureServiceImpl implements AdventureService {

	@Autowired
	private AdventureRepository aRepo;

	@Autowired
	private UserRepository uRepo;

	@Override
	public Adventure create(Adventure adventure, String username) {
		User user = uRepo.findByUsername(username);

		if (user != null) {
			adventure.setHost(user);
			return aRepo.saveAndFlush(adventure);
		} else {
			return null;
		}

	}

	@Override
	public Adventure update(Adventure adventure, String username, int id) {
		return null;
	}

	@Override
	public List<Adventure> index() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Adventure show(String username, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
