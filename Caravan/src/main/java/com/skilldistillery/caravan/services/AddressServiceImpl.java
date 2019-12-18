package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.caravan.entities.Address;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.AddressRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;

public class AddressServiceImpl implements AddressService {
	@Autowired
	private AddressRepository aRepo;
	@Autowired
	private UserProfileRepository upRepo;

	@Override
	public Address create(Address address, String username) {
		UserProfile userProfile = upRepo.findByUser_Username(username);

		if (userProfile != null) {
			address.setUserProfile(userProfile);
			return aRepo.saveAndFlush(address);
		} else {
			return null;
		}
	}

	@Override
	public Address update(Address address, String username, int id) {

		Address oldAddress = aRepo.findByUserProfile_User_UsernameAndId(username, id);

		if (oldAddress != null) {

			oldAddress.setCity(address.getCity());
			oldAddress.setState(address.getState());
			oldAddress.setStreet(address.getStreet());
			oldAddress.setZip(address.getZip());

			return aRepo.saveAndFlush(oldAddress);
		}

		else {

			return null;
		}
	}

	@Override
	public List<Address> index() {
		return aRepo.findAll();
	}

	@Override
	public Address show(String username, int id) {
		return aRepo.findByUserProfile_User_UsernameAndId(username, id);
	}

	@Override
	public boolean destroy(String username, int id) {
		Address address = aRepo.findByUserProfile_User_UsernameAndId(username, id);

		if (address != null) {
			aRepo.delete(address);
			return true;
		}
		return false;
	}

}
