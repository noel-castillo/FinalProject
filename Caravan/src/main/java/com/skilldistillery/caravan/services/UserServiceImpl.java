package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.repositories.UserRepository;

public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository uRepo;

	@Override
	public User create(User user) {

		if (user != null) {
			return uRepo.saveAndFlush(user);
		} else {

			return null;
		}
	}

	@Override
	public User update(User user, String username, int id) {
		User oldUser = uRepo.findByUsernameAndId(username, id);

		if (oldUser != null) {

			oldUser.setEnabled(user.isEnabled());
			oldUser.setPassword(user.getPassword());
			oldUser.setRole(user.getUsername());

			return uRepo.saveAndFlush(oldUser);
		}

		else {

			return null;
		}
	}

	@Override
	public List<User> index() {
		
		return uRepo.findAll();
	}

	@Override
	public User show(String username, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean destroy(String username, int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
