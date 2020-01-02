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
@Table(name = "adventure_host_review_of_traveler")
public class AdventureHost {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private double rating;

	private String review;

	@OneToOne
	@JoinColumn(name = "user_profile_id")
	private UserProfile user;

	@OneToOne
	@JoinColumn(name = "adventure_id")
	private Adventure adventure;
	

//	C O N S T R U C T O R S

	public AdventureHost() {
		super();
	}

	public AdventureHost(int id, double rating, String review, UserProfile user, Adventure adventure) {
		super();
		this.id = id;
		this.rating = rating;
		this.review = review;
		this.user = user;
		this.adventure = adventure;
	}

//	M E T H O D S

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

	public UserProfile getUser() {
		return user;
	}

	public void setUser(UserProfile user) {
		this.user = user;
	}

	public Adventure getAdventure() {
		return adventure;
	}

	public void setAdventure(Adventure adventure) {
		this.adventure = adventure;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((adventure == null) ? 0 : adventure.hashCode());
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
		AdventureHost other = (AdventureHost) obj;
		if (adventure == null) {
			if (other.adventure != null)
				return false;
		} else if (!adventure.equals(other.adventure))
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

	@Override
	public String toString() {
		return "AdventureHost [id=" + id + ", rating=" + rating + ", review=" + review + ", user=" + user
				+ ", adventure=" + adventure + "]";
	}

}