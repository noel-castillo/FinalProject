package com.skilldistillery.caravan.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "adventure_traveler_review_of_host")
public class AdventureTraveler {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private double rating;

	private String review;

	private boolean attended;

	@OneToOne
	@JoinColumn(name = "adventure_id")
	@JsonIgnore
	private Adventure adventure;

	@OneToOne
	@JoinColumn(name = "user_profile_id")
	@JsonIgnore
	private UserProfile user;

	@Column(name = "traveler_status")
	private String travelerStatus;
	
	private boolean approved;

//	C O N S T R U C T O R S

	public AdventureTraveler() {
		super();
	}

	public AdventureTraveler(double rating, String review, boolean attended, Adventure adventure, UserProfile user) {
		super();
		this.rating = rating;
		this.review = review;
		this.attended = attended;
		this.adventure = adventure;
		this.user = user;
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "AdventureTraveler [id=" + id + ", rating=" + rating + ", review=" + review + ", attended=" + attended
				+ ", adventure=" + adventure.getTitle() + ", user=" + user.getFirstName();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public double getRating() {
		return rating;
	}

	public void setRating(double rating) {
		this.rating = rating;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public boolean isAttended() {
		return attended;
	}

	public void setAttended(boolean attended) {
		this.attended = attended;
	}

	public Adventure getAdventure() {
		return adventure;
	}

	public void setAdventure(Adventure adventure) {
		this.adventure = adventure;
	}

	public UserProfile getUser() {
		return user;
	}

	public void setUser(UserProfile user) {
		this.user = user;
	}

	public boolean isApproved() {
		return approved;
	}

	public void setApproved(boolean approved) {
		this.approved = approved;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((adventure == null) ? 0 : adventure.hashCode());
		result = prime * result + (approved ? 1231 : 1237);
		result = prime * result + (attended ? 1231 : 1237);
		result = prime * result + id;
		long temp;
		temp = Double.doubleToLongBits(rating);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((review == null) ? 0 : review.hashCode());
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
		AdventureTraveler other = (AdventureTraveler) obj;
		if (adventure == null) {
			if (other.adventure != null)
				return false;
		} else if (!adventure.equals(other.adventure))
			return false;
		if (approved != other.approved)
			return false;
		if (attended != other.attended)
			return false;
		if (id != other.id)
			return false;
		if (Double.doubleToLongBits(rating) != Double.doubleToLongBits(other.rating))
			return false;
		if (review == null) {
			if (other.review != null)
				return false;
		} else if (!review.equals(other.review))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

}
