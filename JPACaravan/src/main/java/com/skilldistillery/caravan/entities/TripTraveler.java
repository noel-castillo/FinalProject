package com.skilldistillery.caravan.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@Table(name = "trip_traveler_review_of_host")
public class TripTraveler {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String rating;

	private String review;

	@Column(name = "contribution_pledged")
	private double contributionPledge;

	private boolean attended;

	@Column(name = "contribution_actual")
	private double contributionActual;

	@OneToOne
	@JoinColumn(name = "user_profile_id")
	private UserProfile user;

	private boolean approved;

	@Column(name = "traveler_status")
	private String travelerStatus;

	@JsonIgnoreProperties({"tripTravelerReviewsOfHost"})
	@ManyToOne
	@JoinColumn(name = "trip_id")
	private Trip trip;

//	C O N S T R U C T O R S

	public TripTraveler() {
		super();
	}

	public TripTraveler(String rating, String review, double contributionPledge, boolean attended,
			double contributionActual, UserProfile user, boolean approved, String travelerStatus, Trip trip) {
		super();
		this.rating = rating;
		this.review = review;
		this.contributionPledge = contributionPledge;
		this.attended = attended;
		this.contributionActual = contributionActual;
		this.user = user;
		this.approved = approved;
		this.travelerStatus = travelerStatus;
		this.trip = trip;
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

	public String getRating() {
		return rating;
	}

	public void setRating(String rating) {
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

	public String getTravelerStatus() {
		return travelerStatus;
	}

	public void setTravelerStatus(String travelerStatus) {
		this.travelerStatus = travelerStatus;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (approved ? 1231 : 1237);
		result = prime * result + (attended ? 1231 : 1237);
		long temp;
		temp = Double.doubleToLongBits(contributionActual);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		temp = Double.doubleToLongBits(contributionPledge);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + id;
		result = prime * result + ((rating == null) ? 0 : rating.hashCode());
		result = prime * result + ((review == null) ? 0 : review.hashCode());
		result = prime * result + ((travelerStatus == null) ? 0 : travelerStatus.hashCode());
		result = prime * result + ((trip == null) ? 0 : trip.hashCode());
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
		TripTraveler other = (TripTraveler) obj;
		if (approved != other.approved)
			return false;
		if (attended != other.attended)
			return false;
		if (Double.doubleToLongBits(contributionActual) != Double.doubleToLongBits(other.contributionActual))
			return false;
		if (Double.doubleToLongBits(contributionPledge) != Double.doubleToLongBits(other.contributionPledge))
			return false;
		if (id != other.id)
			return false;
		if (rating == null) {
			if (other.rating != null)
				return false;
		} else if (!rating.equals(other.rating))
			return false;
		if (review == null) {
			if (other.review != null)
				return false;
		} else if (!review.equals(other.review))
			return false;
		if (travelerStatus == null) {
			if (other.travelerStatus != null)
				return false;
		} else if (!travelerStatus.equals(other.travelerStatus))
			return false;
		if (trip == null) {
			if (other.trip != null)
				return false;
		} else if (!trip.equals(other.trip))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

}
