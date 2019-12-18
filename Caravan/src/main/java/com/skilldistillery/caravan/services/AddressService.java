package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.Address;

public interface AddressService {

	public Address create(Address address, String username);

	public Address update(Address address, String username, int id);

	public List<Address> index();

	public Address show(String username, int id);

	public boolean destroy(String username, int id);

}
