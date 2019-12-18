package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class UserProfileServiceImpl implements UserProfileService {

	@Autowired
	private UserProfileRepository uRepo;

	@Autowired
	private UserRepository usrRepo;

	@Override
	public UserProfile create(UserProfile userProfile, String username) {
		User user = usrRepo.findByUsername(username);
		System.out.println(user);
		userProfile.setUser(user);
		if (user != null) {
			return uRepo.saveAndFlush(userProfile);
		} else {
			return null;
		}

	}

	@Override
	public UserProfile update(UserProfile userProfile, String username, int id) {

		UserProfile userProfileToUpdate = uRepo.findById(id).get();

		if (userProfileToUpdate != null) {

			userProfileToUpdate.setAddress(userProfile.getAddress());
			userProfileToUpdate.setBio(userProfile.getBio());
			userProfileToUpdate.setEmail(userProfile.getEmail());
			userProfileToUpdate.setFirstName(userProfile.getFirstName());
			userProfileToUpdate.setLastName(userProfile.getLastName());
			userProfileToUpdate.setMileagePoints(userProfile.getMileagePoints());
			userProfileToUpdate.setProfilePic(userProfile.getProfilePic());
			userProfileToUpdate.setRegistrationDate(userProfile.getRegistrationDate());
			userProfileToUpdate.setUser(userProfile.getUser());

			return uRepo.saveAndFlush(userProfileToUpdate);

		}

		else {
			return null;
		}

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

		UserProfile uProfile = uRepo.findById(id).get();
		
		if (uProfile != null) {
			uRepo.delete(uProfile);
			return true;
		}
		
		return false;
	}

}
