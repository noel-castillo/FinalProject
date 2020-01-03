package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.DirectMessage;
import com.skilldistillery.caravan.entities.User;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.DirectMessageRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;
import com.skilldistillery.caravan.repositories.UserRepository;

@Service
public class DirectMessageServiceImpl implements DirectMessageService {

	@Autowired
	DirectMessageRepository dmRepo;

	@Autowired
	UserProfileRepository userProfileRepo;

	@Autowired
	UserRepository userRepo;

	@Override
	public DirectMessage create(DirectMessage dm, int fid, Principal principal) {

		User user = userRepo.findByUsername(principal.getName());
		UserProfile myProfile = userProfileRepo.findByUser(user);
		UserProfile friendProfile = userProfileRepo.findById(fid).get();
		dm.setMyProfile(myProfile);
		dm.setFriendProfile(friendProfile);
		return dmRepo.saveAndFlush(dm);
		
	}

	@Override
	public DirectMessage update(DirectMessage dm, int id) {
		DirectMessage existing = null;
		Optional<DirectMessage> opt = dmRepo.findById(id);
		if (opt.isPresent()) {
			existing = opt.get();
			existing.setContent(dm.getContent());
			dmRepo.saveAndFlush(existing);
		}
		return existing;
	}

	@Override
	public List<DirectMessage> index() {
		return dmRepo.findAll();
	}

	@Override
	public DirectMessage show(int id) {
		DirectMessage dm = null;
		Optional<DirectMessage> opt = dmRepo.findById(id);
		if (opt.isPresent()) {
			dm = opt.get();
		}
		return dm;
	}

	@Override
	public boolean destroy(int id) {
		boolean deleted = false;
		if (dmRepo.existsById(id)) {
			dmRepo.deleteById(id);
			deleted = true;
		}
		return deleted;
	}

	@Override
	public List<DirectMessage> getMessages(String username) {
		User user = userRepo.findByUsername(username);
		UserProfile myProfile = userProfileRepo.findByUser(user);
		List<DirectMessage> inbox = new ArrayList<>();
		for(DirectMessage element : dmRepo.findAll()) {
			if((element.getMyProfile().getUser().getUsername().equals(username)
					|| element.getFriendProfile().getUser().getUsername().equals(username))
					&& !inbox.contains(element)) {
				inbox.add(element);
			}
		}
		return inbox;
	}

}
