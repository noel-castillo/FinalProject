package com.skilldistillery.caravan.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Trip {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne
	@JoinColumn(name = "host_id")
	private User host;

	@OneToOne
	@JoinColumn(name = "vehicle_id")
	@JsonIgnore
	private Vehicle vehicle;

	@OneToOne
	@JoinColumn(name = "depart_address_id")
	@JsonIgnore
	private Address departureAddress;

	@OneToOne
	@JoinColumn(name = "destination_address_id")
	@JsonIgnore
	private Address destinationAddress;

	private String description;

	@Column(name = "seats_available")
	private int seatsAvailable;

	@Column(name = "cargo_capacity")
	private int cargoCapacity;

	@Column(name = "create_date")
	private Date createDate;

	private boolean enabled;

	@Column(name = "total_cost")
	private double totalCost;

	private int miles;

	@OneToOne(mappedBy = "trip")
	private TripCalendar tripCalendar;

//	C O N S T R U C T O R S

	public Trip() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "Trip [id=" + id + ", vehicle=" + vehicle + ", departureAddress=" + departureAddress
				+ ", destinationAddress=" + destinationAddress + ", description=" + description + ", seatsAvailable="
				+ seatsAvailable + ", cargoCapacity=" + cargoCapacity + ", createDate=" + createDate + ", enabled="
				+ enabled + ", totalCost=" + totalCost + ", miles=" + miles + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public User getHost() {
		return host;
	}

	public void setHost(User host) {
		this.host = host;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public Address getDepartureAddress() {
		return departureAddress;
	}

	public void setDepartureAddress(Address departureAddress) {
		this.departureAddress = departureAddress;
	}

	public Address getDestinationAddress() {
		return destinationAddress;
	}

	public void setDestinationAddress(Address destinationAddress) {
		this.destinationAddress = destinationAddress;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public int getSeatsAvailable() {
		return seatsAvailable;
	}

	public void setSeatsAvailable(int seatsAvailable) {
		this.seatsAvailable = seatsAvailable;
	}

	public int getCargoCapacity() {
		return cargoCapacity;
	}

	public void setCargoCapacity(int cargoCapacity) {
		this.cargoCapacity = cargoCapacity;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public double getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(double totalCost) {
		this.totalCost = totalCost;
	}

	public int getMiles() {
		return miles;
	}

	public void setMiles(int miles) {
		this.miles = miles;
	}
	
	

	public TripCalendar getTripCalendar() {
		return tripCalendar;
	}

	public void setTripCalendar(TripCalendar tripCalendar) {
		this.tripCalendar = tripCalendar;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + cargoCapacity;
		result = prime * result + ((createDate == null) ? 0 : createDate.hashCode());
		result = prime * result + ((departureAddress == null) ? 0 : departureAddress.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((destinationAddress == null) ? 0 : destinationAddress.hashCode());
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + ((host == null) ? 0 : host.hashCode());
		result = prime * result + id;
		result = prime * result + miles;
		result = prime * result + seatsAvailable;
		long temp;
		temp = Double.doubleToLongBits(totalCost);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((tripCalendar == null) ? 0 : tripCalendar.hashCode());
		result = prime * result + ((vehicle == null) ? 0 : vehicle.hashCode());
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
		Trip other = (Trip) obj;
		if (cargoCapacity != other.cargoCapacity)
			return false;
		if (createDate == null) {
			if (other.createDate != null)
				return false;
		} else if (!createDate.equals(other.createDate))
			return false;
		if (departureAddress == null) {
			if (other.departureAddress != null)
				return false;
		} else if (!departureAddress.equals(other.departureAddress))
			return false;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (destinationAddress == null) {
			if (other.destinationAddress != null)
				return false;
		} else if (!destinationAddress.equals(other.destinationAddress))
			return false;
		if (enabled != other.enabled)
			return false;
		if (host == null) {
			if (other.host != null)
				return false;
		} else if (!host.equals(other.host))
			return false;
		if (id != other.id)
			return false;
		if (miles != other.miles)
			return false;
		if (seatsAvailable != other.seatsAvailable)
			return false;
		if (Double.doubleToLongBits(totalCost) != Double.doubleToLongBits(other.totalCost))
			return false;
		if (tripCalendar == null) {
			if (other.tripCalendar != null)
				return false;
		} else if (!tripCalendar.equals(other.tripCalendar))
			return false;
		if (vehicle == null) {
			if (other.vehicle != null)
				return false;
		} else if (!vehicle.equals(other.vehicle))
			return false;
		return true;
	}

}
