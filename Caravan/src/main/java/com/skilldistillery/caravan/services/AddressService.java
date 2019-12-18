package com.skilldistillery.caravan.services;

import java.security.Principal;
import java.util.List;

import com.skilldistillery.caravan.entities.Address;

public interface AddressService {

	public List<Address> index(Principal principal);
	
	public Address findAddressById(int id);
	
	public Address createAddress(Address address);

	public Address updateAddress(int id, Address address);

	public boolean deleteAddressById(int id);



}
