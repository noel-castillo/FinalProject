package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.UserProfile;

public interface UserProfileService {
	
	public UserProfile create(UserProfile userProfile, String username);

	public UserProfile update(UserProfile userProfile, String username, int id);

	public List<UserProfile> index(String username);

	public UserProfile show(String username);

	public boolean destroy(int id);

	public UserProfile showById(int id);

}
