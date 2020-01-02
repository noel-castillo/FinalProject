package com.skilldistillery.caravan.entities;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="trip_message")
public class DirectMessage {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne
	@JoinColumn(name = "trip_id")
//	@JsonIgnore
	private Trip trip;

	@OneToOne
	@JoinColumn(name = "reply_to_id")
	@JsonIgnore
	private DirectMessage replyToId;

	@OneToOne
	@JoinColumn(name = "user_profile_id")
//	@JsonIgnore
	private UserProfile userProfile;

	@Column(name="date_posted")
	@CreationTimestamp
	private Date datePosted;

	private String content;

//	C O N S T R U C T O R S

	public DirectMessage() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "MessageBoard [id=" + id + ", trip=" + trip + ", replyToId=" + replyToId + ", userProfile=" + userProfile
				+ ", datePosted=" + datePosted + ", content=" + content + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Trip getTrip() {
		return trip;
	}

	public void setTrip(Trip trip) {
		this.trip = trip;
	}

	public DirectMessage getReplyToId() {
		return replyToId;
	}

	public void setReplyToId(DirectMessage replyToId) {
		this.replyToId = replyToId;
	}

	public UserProfile getUserProfile() {
		return userProfile;
	}

	public void setUserProfile(UserProfile userProfile) {
		this.userProfile = userProfile;
	}

	public Date getDatePosted() {
		return datePosted;
	}

	public void setDatePosted(Date datePosted) {
		this.datePosted = datePosted;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((content == null) ? 0 : content.hashCode());
		result = prime * result + ((datePosted == null) ? 0 : datePosted.hashCode());
		result = prime * result + id;
		result = prime * result + ((replyToId == null) ? 0 : replyToId.hashCode());
		result = prime * result + ((trip == null) ? 0 : trip.hashCode());
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
		DirectMessage other = (DirectMessage) obj;
		if (content == null) {
			if (other.content != null)
				return false;
		} else if (!content.equals(other.content))
			return false;
		if (datePosted == null) {
			if (other.datePosted != null)
				return false;
		} else if (!datePosted.equals(other.datePosted))
			return false;
		if (id != other.id)
			return false;
		if (replyToId == null) {
			if (other.replyToId != null)
				return false;
		} else if (!replyToId.equals(other.replyToId))
			return false;
		if (trip == null) {
			if (other.trip != null)
				return false;
		} else if (!trip.equals(other.trip))
			return false;
		if (userProfile == null) {
			if (other.userProfile != null)
				return false;
		} else if (!userProfile.equals(other.userProfile))
			return false;
		return true;
	}

}
