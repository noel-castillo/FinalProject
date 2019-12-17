package com.skilldistillery.caravan.services;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.repositories.UserRepository;

@Transactional
@Repository
public class AuthServiceImpl implements AuthService {

	@PersistenceContext
	private EntityManager em;

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UserRepository userRepo;

	@Override
	public User register(User user) {

		String encrypted = encoder.encode(user.getPassword());

		user.setPassword(encrypted);

		user.setEnabled(true);

		user.setRole("standard");

		return userRepo.saveAndFlush(user);

	}
}