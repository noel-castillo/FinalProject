package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.TripHost;

public interface TripHostService {
	
	public List<TripHost> index();
	
	public TripHost show(int id);
	
	public TripHost create(TripHost review);

	public TripHost update(TripHost review, int id);

	boolean destroy(int id);
}
