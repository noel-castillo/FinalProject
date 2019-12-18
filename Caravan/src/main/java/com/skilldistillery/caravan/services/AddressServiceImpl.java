package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Address;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.repositories.AddressRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class AddressServiceImpl implements AddressService {
	@Autowired
	private AddressRepository aRepo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Address createAddress(Address address) {
		return aRepo.saveAndFlush(address);
	}

	@Override
	public Address updateAddress(int id, Address address) {

		Address oldAddress = aRepo.findById(id).get();

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
	public List<Address> index(String username) {
//		for(User element : userRepo.findAll()) {
//			if(element.getUsername().equals(username)) {
//				if(element.getRole().equals("admin")) {
//					return aRepo.findAll();
//				}
//			}
//		}
		
		return aRepo.findAll();
	}
	
        

	@Override
	public Address findAddressById(int id) {
		return aRepo.findById(id).get();
	}

	@Override
	public boolean deleteAddressById(int id) {
		Address address = aRepo.findById(id).get();

		if (address != null) {
			aRepo.delete(address);
			return true;
		}
		return false;
	}

}
