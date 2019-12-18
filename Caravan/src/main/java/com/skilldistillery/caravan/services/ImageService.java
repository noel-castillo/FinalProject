package com.skilldistillery.caravan.services;

import java.util.List;

import com.skilldistillery.caravan.entities.Image;

public interface ImageService {

	public List<Image> index(String username);

	public Image findImageById(int id);

	public Image createImage(Image image);

	public Image updateImage(int id, Image image);

	public boolean deleteImageById(int id);

}
