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

class TripCalendarTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private TripCalendar tripCalendar;

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
		tripCalendar = em.find(TripCalendar.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tripCalendar = null;
	}

	@Test
	@DisplayName("Test trip calendar Entity Mapping")
	void tes1() {
		assertNotNull(tripCalendar);
	}
	
	@Test
	@DisplayName("Test trip calendar and trip relationship Mapping")
	void test2() {
		assertNotNull(tripCalendar.getTrip());
		assertEquals("2017-07-20 01:00:00.0", tripCalendar.getEndDate().toString());
	}

}
