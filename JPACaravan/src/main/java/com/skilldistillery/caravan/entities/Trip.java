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
	private String totalCost;

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
			int seatsAvailable, int cargoCapacity, Date createDate, boolean enabled, String totalCost, int miles,
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
		return "Trip [id=" + id + ", host=" + host + ", vehicle=" + vehicle + ", departureAddress=" + departureAddress
				+ ", destinationAddress=" + destinationAddress + ", description=" + description + ", seatsAvailable="
				+ seatsAvailable + ", cargoCapacity=" + cargoCapacity + ", createDate=" + createDate + ", enabled="
				+ enabled + ", totalCost=" + totalCost + ", miles=" + miles + ", tripCalendar=" + tripCalendar
				+ ", title=" + title + ", tripTravelerReviewsOfHost=" + tripTravelerReviewsOfHost
				+ ", tripHostReviewsOfTravelers=" + tripHostReviewsOfTravelers + ", featureImage=" + featureImage + "]";
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

	public String getTotalCost() {
		return totalCost;
	}

	public void setTotalCost(String totalCost) {
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
		result = prime * result + cargoCapacity;
		result = prime * result + ((createDate == null) ? 0 : createDate.hashCode());
		result = prime * result + ((departureAddress == null) ? 0 : departureAddress.hashCode());
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((destinationAddress == null) ? 0 : destinationAddress.hashCode());
		result = prime * result + (enabled ? 1231 : 1237);
		result = prime * result + ((featureImage == null) ? 0 : featureImage.hashCode());
		result = prime * result + ((host == null) ? 0 : host.hashCode());
		result = prime * result + id;
		result = prime * result + miles;
		result = prime * result + seatsAvailable;
		result = prime * result + ((title == null) ? 0 : title.hashCode());
		result = prime * result + ((totalCost == null) ? 0 : totalCost.hashCode());
		result = prime * result + ((tripCalendar == null) ? 0 : tripCalendar.hashCode());
		result = prime * result + ((tripHostReviewsOfTravelers == null) ? 0 : tripHostReviewsOfTravelers.hashCode());
		result = prime * result + ((tripTravelerReviewsOfHost == null) ? 0 : tripTravelerReviewsOfHost.hashCode());
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
		if (featureImage == null) {
			if (other.featureImage != null)
				return false;
		} else if (!featureImage.equals(other.featureImage))
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
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		if (totalCost == null) {
			if (other.totalCost != null)
				return false;
		} else if (!totalCost.equals(other.totalCost))
			return false;
		if (tripCalendar == null) {
			if (other.tripCalendar != null)
				return false;
		} else if (!tripCalendar.equals(other.tripCalendar))
			return false;
		if (tripHostReviewsOfTravelers == null) {
			if (other.tripHostReviewsOfTravelers != null)
				return false;
		} else if (!tripHostReviewsOfTravelers.equals(other.tripHostReviewsOfTravelers))
			return false;
		if (tripTravelerReviewsOfHost == null) {
			if (other.tripTravelerReviewsOfHost != null)
				return false;
		} else if (!tripTravelerReviewsOfHost.equals(other.tripTravelerReviewsOfHost))
			return false;
		if (vehicle == null) {
			if (other.vehicle != null)
				return false;
		} else if (!vehicle.equals(other.vehicle))
			return false;
		return true;
	}

}
