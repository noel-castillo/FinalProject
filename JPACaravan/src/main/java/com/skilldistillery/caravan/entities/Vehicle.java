package com.skilldistillery.caravan.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Vehicle {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String make;

	private String model;
	
	@Column(name="manufacture_year")
	private int manufactureYear;
	
	private int capacity;
	
	@Column(name="seats_available")
	private int seatsAvailable;
	
	@Column(name="interior_description")
	private String interiorDescription;
	
	@ManyToOne
	@JoinColumn(name="user_profile_id")
	@JsonIgnore
	private UserProfile userProfile;
	
	private boolean enabled;


//	C O N S T R U C T O R S

	public Vehicle() {
		super();
	}


//	M E T H O D S
	
	@Override
	public String toString() {
		return "Vehicle [id=" + id + ", make=" + make + ", model=" + model + ", manufactureYear=" + manufactureYear
				+ ", capacity=" + capacity + ", seatsAvailable=" + seatsAvailable + ", interiorDescription="
				+ interiorDescription + "]";
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getMake() {
		return make;
	}


	public void setMake(String make) {
		this.make = make;
	}


	public String getModel() {
		return model;
	}


	public void setModel(String model) {
		this.model = model;
	}


	public int getManufactureYear() {
		return manufactureYear;
	}


	public void setManufactureYear(int manufactureYear) {
		this.manufactureYear = manufactureYear;
	}


	public int getCapacity() {
		return capacity;
	}


	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}


	public int getSeatsAvailable() {
		return seatsAvailable;
	}


	public void setSeatsAvailable(int seatsAvailable) {
		this.seatsAvailable = seatsAvailable;
	}


	public String getInteriorDescription() {
		return interiorDescription;
	}


	public void setInteriorDescription(String interiorDescription) {
		this.interiorDescription = interiorDescription;
	}


	public UserProfile getUserProfile() {
		return userProfile;
	}


	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}
	
	public boolean isEnabled() {
		return enabled;
	}


	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + capacity;
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + id;
		result = prime * result + ((interiorDescription == null) ? 0 : interiorDescription.hashCode());
		result = prime * result + ((make == null) ? 0 : make.hashCode());
		result = prime * result + manufactureYear;
		result = prime * result + ((model == null) ? 0 : model.hashCode());
		result = prime * result + seatsAvailable;
		result = prime * result + ((userProfile == null) ? 0 : userProfile.hashCode());
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Vehicle other = (Vehicle) obj;
		if (capacity != other.capacity)
			return false;
		if (enabled != other.enabled)
			return false;
		if (id != other.id)
			return false;
		if (interiorDescription == null) {
			if (other.interiorDescription != null)
				return false;
		} else if (!interiorDescription.equals(other.interiorDescription))
			return false;
		if (make == null) {
			if (other.make != null)
				return false;
		} else if (!make.equals(other.make))
			return false;
		if (manufactureYear != other.manufactureYear)
			return false;
		if (model == null) {
			if (other.model != null)
				return false;
		} else if (!model.equals(other.model))
			return false;
		if (seatsAvailable != other.seatsAvailable)
			return false;
		if (userProfile == null) {
			if (other.userProfile != null)
				return false;
		} else if (!userProfile.equals(other.userProfile))
			return false;
		return true;
	}
}
