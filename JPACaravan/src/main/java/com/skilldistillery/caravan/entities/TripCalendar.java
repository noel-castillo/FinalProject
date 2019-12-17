package com.skilldistillery.caravan.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class TripCalendar {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	
	@OneToOne
	@JoinColumn(name = "host_id")
	@JsonIgnore
	private User host;
	
	@OneToOne
	@JoinColumn(name = "vehicle_id")
	@JsonIgnore
	private Vehicle vehicle;
	
	@OneToOne
	@JoinColumn(name = "address_id")
	@JsonIgnore
	private Address departureAddress;
	
	@OneToOne
	@JoinColumn(name = "address_id")
	@JsonIgnore
	private Address destinationAddress;



//	C O N S T R U C T O R S

	public TripCalendar() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "Trip [id=" + id + ", host=" + host + ", vehicle=" + vehicle + ", departureAddress=" + departureAddress
				+ ", destinationAddress=" + destinationAddress + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


}
