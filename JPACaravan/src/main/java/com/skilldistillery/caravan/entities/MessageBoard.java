package com.skilldistillery.caravan.entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="message_board")
public class MessageBoard {

//	F I E L D S

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@OneToOne
	@JoinColumn(name = "trip_id")
	@JsonIgnore
	private Trip trip;

	@OneToOne
	@JoinColumn(name = "reply_to_id")
	@JsonIgnore
	private MessageBoard replyToId;

	@OneToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	private Date datePosted;

	private String content;

//	C O N S T R U C T O R S

	public MessageBoard() {
		super();
	}

//	M E T H O D S

	@Override
	public String toString() {
		return "MessageBoard [id=" + id + ", trip=" + trip + ", replyToId=" + replyToId + ", user=" + user
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

	public MessageBoard getReplyToId() {
		return replyToId;
	}

	public void setReplyToId(MessageBoard replyToId) {
		this.replyToId = replyToId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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
		MessageBoard other = (MessageBoard) obj;
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
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

}
