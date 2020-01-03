package com.skilldistillery.caravan.entities;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
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
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "user_profile")
public class UserProfile {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@Column(name = "first_name")
	private String firstName;

	@Column(name = "last_name")
	private String lastName;

	private String email;

	private String bio;

	private String phone;

	@Column(name = "mileage_points")
	private int mileagePoints;

	@Column(name = "registration_date")
	private Date registrationDate;

	@OneToOne
	@JoinColumn(name = "profile_pic_id")
	private Image profilePic;

	@OneToOne
	@JoinColumn(name = "address_id")
	private Address address;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

	@OneToMany(mappedBy = "userProfile")
	@JsonIgnore
	private List<Vehicle> Vehicles;

	@OneToMany(mappedBy = "host")
	@JsonIgnore
	private List<Trip> hostedTrips;

	@OneToMany(mappedBy = "user")
	@JsonIgnore
	private List<TripTraveler> tripsJoined;

	@OneToMany(mappedBy = "myProfile")
	@JsonIgnoreProperties({ "myProfile", "friendProfile" })
	private List<DirectMessage> inbox;

	@OneToMany(mappedBy = "friendProfile")
	@JsonIgnoreProperties({ "myProfile", "friendProfile" })
	private List<DirectMessage> outbox;

//	C O N S T R U C T O R S

	public UserProfile() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "UserProfile [id=" + id + ", firstName=" + firstName + ", lastName=" + lastName + ", email=" + email
				+ ", bio=" + bio + ", phone=" + phone + ", mileagePoints=" + mileagePoints + ", registrationDate="
				+ registrationDate + ", profilePic=" + profilePic + ", address=" + address + ", user=" + user
				+ ", Vehicles=" + Vehicles + ", hostedTrips=" + hostedTrips + ", tripsJoined=" + tripsJoined + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public Date getRegistrationDate() {
		return registrationDate;
	}

	public void setRegistrationDate(Date registrationDate) {
		this.registrationDate = registrationDate;
	}

	public Image getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(Image profilePic) {
		this.profilePic = profilePic;
	}

	public Address getAddress() {
		return address;
	}

	public void setAddress(Address address) {
		this.address = address;
	}

	public int getMileagePoints() {
		return mileagePoints;
	}

	public void setMileagePoints(int mileagePoints) {
		this.mileagePoints = mileagePoints;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public List<Vehicle> getVehicles() {
		return Vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		Vehicles = vehicles;
	}

	public List<Trip> getHostedTrips() {
		return hostedTrips;
	}

	public void setHostedTrips(List<Trip> hostedTrips) {
		this.hostedTrips = hostedTrips;
	}

	public List<TripTraveler> getTripsJoined() {
		return tripsJoined;
	}

	public void setTripsJoined(List<TripTraveler> tripsJoined) {
		this.tripsJoined = tripsJoined;
	}

	public List<DirectMessage> getInbox() {
		return inbox;
	}

	public void setInbox(List<DirectMessage> inbox) {
		this.inbox = inbox;
	}

	public List<DirectMessage> getOutbox() {
		return outbox;
	}

	public void setOutbox(List<DirectMessage> outbox) {
		this.outbox = outbox;
	}
	
	@Transient
	public List<DirectMessage> getAllMessages() {
		List<DirectMessage> messages = new ArrayList<>();
		messages.addAll(this.getInbox());
		messages.addAll(this.getOutbox());
		Collections.sort(messages, new Comparator<DirectMessage>() {
			  public int compare(DirectMessage o1, DirectMessage o2) {
				  if (o1.getDatePosted() == null || o2.getDatePosted() == null) {
				      return 0;
				  }
			      return o1.getDatePosted().compareTo(o2.getDatePosted());
			  }
			});
		return messages;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((Vehicles == null) ? 0 : Vehicles.hashCode());
		result = prime * result + ((address == null) ? 0 : address.hashCode());
		result = prime * result + ((bio == null) ? 0 : bio.hashCode());
		result = prime * result + ((email == null) ? 0 : email.hashCode());
		result = prime * result + ((firstName == null) ? 0 : firstName.hashCode());
		result = prime * result + ((hostedTrips == null) ? 0 : hostedTrips.hashCode());
		result = prime * result + id;
		result = prime * result + ((inbox == null) ? 0 : inbox.hashCode());
		result = prime * result + ((lastName == null) ? 0 : lastName.hashCode());
		result = prime * result + mileagePoints;
		result = prime * result + ((outbox == null) ? 0 : outbox.hashCode());
		result = prime * result + ((phone == null) ? 0 : phone.hashCode());
		result = prime * result + ((profilePic == null) ? 0 : profilePic.hashCode());
		result = prime * result + ((registrationDate == null) ? 0 : registrationDate.hashCode());
		result = prime * result + ((tripsJoined == null) ? 0 : tripsJoined.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		UserProfile other = (UserProfile) obj;
		if (Vehicles == null) {
			if (other.Vehicles != null)
				return false;
		} else if (!Vehicles.equals(other.Vehicles))
			return false;
		if (address == null) {
			if (other.address != null)
				return false;
		} else if (!address.equals(other.address))
			return false;
		if (bio == null) {
			if (other.bio != null)
				return false;
		} else if (!bio.equals(other.bio))
			return false;
		if (email == null) {
			if (other.email != null)
				return false;
		} else if (!email.equals(other.email))
			return false;
		if (firstName == null) {
			if (other.firstName != null)
				return false;
		} else if (!firstName.equals(other.firstName))
			return false;
		if (hostedTrips == null) {
			if (other.hostedTrips != null)
				return false;
		} else if (!hostedTrips.equals(other.hostedTrips))
			return false;
		if (id != other.id)
			return false;
		if (inbox == null) {
			if (other.inbox != null)
				return false;
		} else if (!inbox.equals(other.inbox))
			return false;
		if (lastName == null) {
			if (other.lastName != null)
				return false;
		} else if (!lastName.equals(other.lastName))
			return false;
		if (mileagePoints != other.mileagePoints)
			return false;
		if (outbox == null) {
			if (other.outbox != null)
				return false;
		} else if (!outbox.equals(other.outbox))
			return false;
		if (phone == null) {
			if (other.phone != null)
				return false;
		} else if (!phone.equals(other.phone))
			return false;
		if (profilePic == null) {
			if (other.profilePic != null)
				return false;
		} else if (!profilePic.equals(other.profilePic))
			return false;
		if (registrationDate == null) {
			if (other.registrationDate != null)
				return false;
		} else if (!registrationDate.equals(other.registrationDate))
			return false;
		if (tripsJoined == null) {
			if (other.tripsJoined != null)
				return false;
		} else if (!tripsJoined.equals(other.tripsJoined))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

}
