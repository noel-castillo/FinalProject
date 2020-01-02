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

@Entity
@Table(name = "dm")
public class DirectMessage {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne
	@JoinColumn(name = "my_id")
//	@JsonIgnore
	private UserProfile myProfile;

	@OneToOne
	@JoinColumn(name = "friend_id")
//	@JsonIgnore
	private UserProfile friendProfile;

	@Column(name = "message")
	private String content;

	@Column(name = "date_posted")
	@CreationTimestamp
	private Date datePosted;

//	C O N S T R U C T O R S

	public DirectMessage() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "DirectMessage [id=" + id + ", myProfile=" + myProfile + ", friendProfile=" + friendProfile
				+ ", content=" + content + ", datePosted=" + datePosted + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public UserProfile getMyProfile() {
		return myProfile;
	}

	public void setMyProfile(UserProfile myProfile) {
		this.myProfile = myProfile;
	}

	public UserProfile getFriendProfile() {
		return friendProfile;
	}

	public void setFriendProfile(UserProfile friendProfile) {
		this.friendProfile = friendProfile;
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
		result = prime * result + ((friendProfile == null) ? 0 : friendProfile.hashCode());
		result = prime * result + id;
		result = prime * result + ((myProfile == null) ? 0 : myProfile.hashCode());
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
		if (friendProfile == null) {
			if (other.friendProfile != null)
				return false;
		} else if (!friendProfile.equals(other.friendProfile))
			return false;
		if (id != other.id)
			return false;
		if (myProfile == null) {
			if (other.myProfile != null)
				return false;
		} else if (!myProfile.equals(other.myProfile))
			return false;
		return true;
	}

}
