package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class UserProfileServiceImpl implements UserProfileService{
	
	@Autowired
	private UserProfileRepository uRepo;

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
	public List<UserProfile> index(String username) {
		
		// FIXME
		if (username == "") {
			
		}
		
		return uRepo.findAll();
	}

	@Override
	public UserProfile show(String username) {
		UserProfile user = uRepo.findByUser_Username(username);
		
		if (user != null) {
			return user;
		}
		return null;
	}
	
	@Override
	public UserProfile showById(int id) {
		
		UserProfile user = uRepo.findById(id).get();
		
		if (user != null) {
			return user;
		}
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
