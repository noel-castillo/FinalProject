package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository uRepo;
	
	@Autowired
	private AuthService aSvc;

	@Override
	public User create(User user) {
		if (user != null) {
			user.setEnabled(true);
			return aSvc.register(user);
		} else {

			return null;
		}
	}

	@Override
	public User update(User user, String username, int id) {
		User oldUser = uRepo.findById(id).get();

		if (oldUser != null) {

			oldUser.setEnabled(user.isEnabled());
			oldUser.setPassword(user.getPassword());
			oldUser.setRole(user.getRole());
			

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

		User user = uRepo.findByUsernameAndId(username, id);

		if (user != null) {

			return user;
		} else {

			return null;
		}

	}

	@Override
	public boolean destroy(String username, int id) {
		User user = uRepo.findByUsernameAndId(username, id);

		if (user != null) {
			uRepo.delete(user);
			return true;
		}
		return false;
	}

	@Override
	public User showUser(String username) {
		User user = uRepo.findByUsername(username);

		if (user != null) {

			return user;
		} else {

			return null;
		}
	}

}
