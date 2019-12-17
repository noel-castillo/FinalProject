package com.skilldistillery.caravan.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Vehicle {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String make;

	private String model;


//	C O N S T R U C T O R S

	public Vehicle() {
		super();
	}

//	M E T H O D S


}
