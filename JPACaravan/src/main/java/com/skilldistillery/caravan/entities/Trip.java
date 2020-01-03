package com.skilldistillery.caravan.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
//	@JsonIgnore
	private UserProfile host;

	@OneToOne
	@JoinColumn(name = "vehicle_id")
//	@JsonIgnore
	private Vehicle vehicle;

	@OneToOne
	@JoinColumn(name = "depart_address_id")
//	@JsonIgnore
	private Address departureAddress;

	@OneToOne
	@JoinColumn(name = "destination_address_id")
//	@JsonIgnore
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
	
	private String title;

	@OneToMany(mappedBy = "trip")
	private List<TripTraveler> tripTravelerReviewsOfHost;
	
	@JsonIgnore
	@OneToMany(mappedBy = "trip")
	private List<TripHost> tripHostReviewsOfTravelers;
	
	@Column(name = "feature_image")
	private String featureImage;
	
	
//	C O N S T R U C T O R S

	public Trip() {
		super();
	}
	
	public Trip(UserProfile host, Vehicle vehicle, Address departureAddress, Address destinationAddress, String description,
			int seatsAvailable, int cargoCapacity, Date createDate, boolean enabled, double totalCost, int miles,
			TripCalendar tripCalendar, String title) {
		super();
		this.host = host;
		this.vehicle = vehicle;
		this.departureAddress = departureAddress;
		this.destinationAddress = destinationAddress;
		this.description = description;
		this.seatsAvailable = seatsAvailable;
		this.cargoCapacity = cargoCapacity;
		this.createDate = createDate;
		this.enabled = enabled;
		this.totalCost = totalCost;
		this.miles = miles;
		this.tripCalendar = tripCalendar;
		this.title = title;
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "Trip [id=" + id + ", host=" + host + ", description=" + description + ", seatsAvailable="
				+ seatsAvailable + ", cargoCapacity=" + cargoCapacity + ", enabled=" + enabled + ", totalCost="
				+ totalCost + ", miles=" + miles + ", title=" + title + "]";
	}

	public int getId() {
		return id;
	}

	public UserProfile getHost() {
		return host;
	}

	public void setHost(UserProfile host) {
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

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public List<TripTraveler> getTripTravelerReviewsOfHost() {
		return tripTravelerReviewsOfHost;
	}

	public void setTripTravelerReviewsOfHost(List<TripTraveler> tripTravelerReviewsOfHost) {
		this.tripTravelerReviewsOfHost = tripTravelerReviewsOfHost;
	}

	public List<TripHost> getTripHostReviewsOfTravelers() {
		return tripHostReviewsOfTravelers;
	}

	public void setTripHostReviewsOfTravelers(List<TripHost> tripHostReviewsOfTravelers) {
		this.tripHostReviewsOfTravelers = tripHostReviewsOfTravelers;
	}

	public String getFeatureImage() {
		return featureImage;
	}

	public void setFeatureImage(String featureImage) {
		this.featureImage = featureImage;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
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
		if (id != other.id)
			return false;
		return true;
	}

}
