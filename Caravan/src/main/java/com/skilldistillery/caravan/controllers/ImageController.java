package com.skilldistillery.caravan.controllers;

import java.security.Principal;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.caravan.entities.Image;
import com.skilldistillery.caravan.services.ImageService;

@RestController
@RequestMapping("api")
@CrossOrigin({ "*", "http://localhost:4260" })
public class ImageController {

	@Autowired
	private ImageService svc;

	@GetMapping("images")
	public List<Image> index(Principal principal) {
		return svc.index(principal.getName());
	}
	
	@GetMapping("images/{id}")
	public Image showImage(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		Image image = svc.findImageById(id);
		if (image == null) {
			response.setStatus(404);
		}
		return image;
	}

	@PostMapping("images")
	public Image createImage(@RequestBody Image image, HttpServletRequest request,
			HttpServletResponse response) {
		if ((image = svc.createImage(image)) != null) {
			response.setStatus(201);
			StringBuffer url = request.getRequestURL();
			url.append("/").append(image.getId());
			response.addHeader("Location", url.toString());
			return image;
		} else {
			response.setStatus(400);
			return null;
		}
	}

	@PutMapping("images/{id}")
	public Image updateImage(@PathVariable int id, @RequestBody Image image, HttpServletRequest request,
			HttpServletResponse response) {
		try {
			image = svc.updateImage(id, image);
			if (image == null) {
				response.setStatus(404);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			image = null;
		}
		return image;
	}

	@DeleteMapping("images/{id}")
	public boolean deleteImage(@PathVariable int id, HttpServletRequest request, HttpServletResponse response) {

		try {
			boolean deleted = svc.deleteImageById(id);
			if (deleted) {
				response.setStatus(204);
				return true;
			} else {
				response.setStatus(404);
				return false;
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(400);
			return false;
		}

	}

}
