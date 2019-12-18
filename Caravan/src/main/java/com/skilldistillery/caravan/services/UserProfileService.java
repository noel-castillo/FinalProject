package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.UserProfile;

public interface UserProfileService {
	
	public UserProfile create(UserProfile userProfile, String username);

	public UserProfile update(UserProfile userProfile, String username, int id);

	public List<UserProfile> index();

	public UserProfile show(String username, int id);

	public boolean destroy(String username, int id);

}
