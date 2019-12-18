package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.UserRepository;

public class UserProfileServiceImpl implements UserProfileService{
	
	@Autowired
	private UserRepository uRepo;

	@Override
	public UserProfile create(UserProfile userProfile, String username) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserProfile update(UserProfile userProfile, String username, int id) {
		
		return null;
	}

	@Override
	public List<UserProfile> index() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public UserProfile show(String username, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
