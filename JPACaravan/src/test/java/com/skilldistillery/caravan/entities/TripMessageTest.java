package com.skilldistillery.caravan.entities;

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

class TripMessageTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private TripMessage tripMessage;

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
		tripMessage = em.find(TripMessage.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tripMessage = null;
	}

	@Test
	@DisplayName("Test trip Entity Mapping")
	void test() {
		assertNotNull(tripMessage);
	}
	
	@Test
	@DisplayName("Test trip message and user relationship Mapping")
	void test1() {
		assertNotNull(tripMessage.getUserProfile());
	}
	@Test
	@DisplayName("Test trip message and trip relationship Mapping")
	void test2() {
		assertNotNull(tripMessage.getTrip());
	}

}
