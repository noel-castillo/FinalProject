package com.skilldistillery.caravan.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.caravan.entities.Address;

public interface AddressRepository extends JpaRepository<Address, Integer> {

	public Address findByUserProfile_User_UsernameAndId(String username, int id);
}
