package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Trip;
import com.skilldistillery.caravan.entities.TripMessage;
import com.skilldistillery.caravan.entities.UserProfile;
import com.skilldistillery.caravan.repositories.TripMessageRepository;
import com.skilldistillery.caravan.repositories.TripRepository;
import com.skilldistillery.caravan.repositories.UserProfileRepository;

@Service
public class TripMessageServiceImpl implements TripMessageService {

	@Autowired
	private TripMessageRepository tRepo;

	@Autowired
	private UserProfileRepository uRepo;

	@Autowired
	private TripRepository trRepo;

	@Override
	public TripMessage create(TripMessage tripMess, String username) {
		UserProfile userProf = uRepo.findByUser_Username(username);
		Trip trip = trRepo.findByHost_User_Username(username).get(0);

		if (userProf != null) {
			tripMess.setTrip(trip);
			tripMess.setUserProfile(userProf);
			return tRepo.saveAndFlush(tripMess);
		} else {
			return null;
		}
	}

	@Override
	public TripMessage update(TripMessage tripMessage, String username, int tid) {
		TripMessage oldTripMessage = tRepo.findByUserProfile_User_UsernameAndId(username, tid);

		if (oldTripMessage != null) {

			oldTripMessage.setContent(tripMessage.getContent());

			return tRepo.saveAndFlush(oldTripMessage);
		} else {

			return null;
		}

	}

	@Override
	public List<TripMessage> index(int tid) {

		return tRepo.findByTrip_Id(tid);
	}

	@Override
	public TripMessage show(String username, int id) {

		TripMessage tripMes = tRepo.findByUserProfile_User_UsernameAndId(username, id);

		if (tripMes != null) {

			return tripMes;
		}

		return null;
	}

	@Override
	public boolean destroy(String username, int id) {

		TripMessage tripMes = tRepo.findByUserProfile_User_UsernameAndId(username, id);

		if (tripMes != null) {
			tRepo.delete(tripMes);
			return true;
		} else {

			return false;
		}

	}

}
