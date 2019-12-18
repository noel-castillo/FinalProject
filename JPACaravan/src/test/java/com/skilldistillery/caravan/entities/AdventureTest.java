package com.skilldistillery.caravan.entities;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AdventureTest {


	private static EntityManagerFactory emf;
	private EntityManager em;
	private Adventure adv;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("CaravanPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		adv = em.find(Adventure.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		adv = null;
	}

	@Test
	@DisplayName("Test Adventure Entity Mapping Get Activity")
	void test1() {
		assertNotNull(adv);
		assertEquals("high", adv.getActivityLvl());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Address Get City")
	void test2() {
		assertNotNull(adv);
		assertEquals("Faketown", adv.getAddress().getCity());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Description")
	void test3() {
		assertNotNull(adv);
		assertEquals("Taking a week-long trip to the grand canyon with my pup Sally!", adv.getDescription());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Username")
	void test4() {
		assertNotNull(adv);
		assertEquals("userface", adv.getHost().getUsername());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Id")
	void test5() {
		assertNotNull(adv);
		assertEquals(1, adv.getId());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Includes")
	void test6() {
		assertNotNull(adv);
		assertEquals("bed and breakfast", adv.getIncludes());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Itinerary")
	void test7() {
		assertNotNull(adv);
		assertEquals("day one: see the canyon. day two: see more of the canyone. day three: see a little more canyone", adv.getItinerary());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Price")
	void test8() {
		assertNotNull(adv);
		assertEquals(250.0, adv.getPrice());
	}
	
	@Test
	@DisplayName("Test Adventure Entity Mapping Get Title")
	void test9() {
		assertNotNull(adv);
		assertEquals("Grand Canyon", adv.getTitle());
	}
	
	
	
	
}
