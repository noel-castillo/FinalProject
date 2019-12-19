package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.TripMessage;

public interface TripMessageService {
	public TripMessage create(TripMessage tripmMess, String username, int tripId);

	public TripMessage update(TripMessage user, String username, int id);

	public List<TripMessage> index(int tid);

	public TripMessage show(String username, int id);

	public boolean destroy(String username, int id);
}
