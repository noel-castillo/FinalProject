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
	private Trip trip;

	@OneToOne
	@JoinColumn(name = "user_profile_id")
	private UserProfile user;

	private boolean approved;

	@Column(name = "traveler_status")
	private String status;

//	private TripTravelerStatus tripStatus;
	
	
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

	public TripTraveler(double rating, String review, double contributionPledge, boolean attended,
			double contributionActual, Trip trip, UserProfile user, boolean approved, String status) {
		super();
		this.rating = rating;
		this.review = review;
		this.contributionPledge = contributionPledge;
		this.attended = attended;
		this.contributionActual = contributionActual;
		this.trip = trip;
		this.user = user;
		this.approved = approved;
		this.status = status;
	}

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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
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
		temp = Double.doubleToLongBits(rating);
		result = prime * result + (int) (temp ^ (temp >>> 32));
		result = prime * result + ((review == null) ? 0 : review.hashCode());
		result = prime * result + ((status == null) ? 0 : status.hashCode());
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
		if (Double.doubleToLongBits(rating) != Double.doubleToLongBits(other.rating))
			return false;
		if (review == null) {
			if (other.review != null)
				return false;
		} else if (!review.equals(other.review))
			return false;
		if (status == null) {
			if (other.status != null)
				return false;
		} else if (!status.equals(other.status))
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
