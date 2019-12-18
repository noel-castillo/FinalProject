package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Adventure;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.AdventureRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;

@Service
public class AdventureServiceImpl implements AdventureService {

	@Autowired
	private AdventureRepository aRepo;

	@Autowired
	private UserProfileRepository upRepo;

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
	public Adventure create(Adventure adventure, Principal principal) {
		UserProfile user = upRepo.findByUser_Username(principal.getName());
		

		if (user != null) {
			System.out.println(user.getUser().getUsername());
			System.out.println("****************************************************");
			adventure.setHost(user);
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
