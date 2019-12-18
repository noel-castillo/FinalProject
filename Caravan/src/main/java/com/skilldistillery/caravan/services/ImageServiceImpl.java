package com.skilldistillery.caravan.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.caravan.entities.Image;
import com.skilldistillery.caravan.repositories.ImageRepository;

@Service
public class ImageServiceImpl implements ImageService {
	@Autowired
	private ImageRepository imageRepo;

	@Override
	public Image createImage(Image image) {
		return imageRepo.saveAndFlush(image);
	}

	@Override
	public Image updateImage(int id, Image image) {

		Image oldImage = imageRepo.findById(id).get();

		if (oldImage != null) {

			oldImage.setUrl(image.getUrl());

			return imageRepo.saveAndFlush(oldImage);
		}

		else {

			return null;
		}
	}

	@Override
	public List<Image> index(String username) {
		return imageRepo.findAll();
	}

	@Override
	public Image findImageById(int id) {
		return imageRepo.findById(id).get();
	}

	@Override
	public boolean deleteImageById(int id) {
		Image image = imageRepo.findById(id).get();

		if (image != null) {
			imageRepo.delete(image);
			return true;
		}
		return false;
	}

}
