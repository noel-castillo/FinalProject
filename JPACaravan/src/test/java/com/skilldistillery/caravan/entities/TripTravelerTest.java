package com.skilldistillery.caravan.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class TripTravelerTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private TripTraveler tripTraveler;

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
		tripTraveler = em.find(TripTraveler.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tripTraveler = null;
	}

	@Test
	@DisplayName("Test trip Entity Mapping")
	void test() {
		assertNotNull(tripTraveler);
	}
	
	@Test
	@DisplayName("Test trip traveler and trip relationship Mapping")
	void test1() {
		assertNotNull(tripTraveler.getTrip());
	}
	
	@Test
	@DisplayName("Test user association")
	void test2() {
		assertEquals("userface", tripTraveler.getUser().getUser().getUsername());
	}

}
