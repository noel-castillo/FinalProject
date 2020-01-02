package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.DirectMessage;

public interface DirectMessageService {
	public DirectMessage create(DirectMessage dm, int fid, Principal principal);

	public DirectMessage update(DirectMessage dm, int id);

	public List<DirectMessage> index();

	public DirectMessage show(int id);

	boolean destroy(int id);
	

	public List<DirectMessage> getMessages(String username);
}
