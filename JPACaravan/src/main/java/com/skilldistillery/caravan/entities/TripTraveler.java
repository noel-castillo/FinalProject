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
@Table(name = "trip_traveler_review_of_host")
public class TripTraveler {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private double rating;

	private String review;

	@Column(name = "contribution_pledged")
	private double contributionPledge;

	private boolean attended;

	@Column(name = "contribution_actual")
	private double contributionActual;

	@OneToOne
	@JoinColumn(name = "trip_id")
	@JsonIgnore
	private Trip trip;

	@OneToOne
	@JoinColumn(name = "user_profile_id")
	@JsonIgnore
	private UserProfile user;

	private boolean approved;

//	C O N S T R U C T O R S

	public TripTraveler() {
		super();
	}

	public TripTraveler(double rating, String review, double contributionPledge, boolean attended,
			double contributionActual, Trip trip, UserProfile user, boolean approved) {
		super();
		this.rating = rating;
		this.review = review;
		this.contributionPledge = contributionPledge;
		this.attended = attended;
		this.contributionActual = contributionActual;
		this.trip = trip;
		this.user = user;
		this.approved = approved;
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "TripTraveler [id=" + id + ", rating=" + rating + ", review=" + review + ", contributionPledge="
				+ contributionPledge + ", attended=" + attended + ", contributionActual=" + contributionActual
				+ ", approved=" + approved + "]";
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

	public double getContributionPledge() {
		return contributionPledge;
	}

	public void setContributionPledge(double contributionPledge) {
		this.contributionPledge = contributionPledge;
	}

	public boolean isAttended() {
		return attended;
	}

	public void setAttended(boolean attended) {
		this.attended = attended;
	}

	public double getContributionActual() {
		return contributionActual;
	}

	public void setContributionActual(double contributionActual) {
		this.contributionActual = contributionActual;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
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
		TripTraveler other = (TripTraveler) obj;
		if (id != other.id)
			return false;
		return true;
	}

}
