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

class TripHostTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private TripHost tripHost;

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
		tripHost = em.find(TripHost.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		tripHost = null;
	}

	@Test
	@DisplayName("Test trip Entity Mapping")
	void test() {
		assertNotNull(tripHost);
	}

	@Test
	@DisplayName("Test trip host and trip relationship Mapping")
	void test1() {
		assertNotNull(tripHost.getTrip());
		assertEquals(1, tripHost.getId());
	}

	@Test
	@DisplayName("Test trip host and user relationship Mapping")
	void test2() {
		assertNotNull(tripHost.getRating());
		assertEquals(5.0, tripHost.getRating());
	}
	
	@Test
	@DisplayName("Test trip host and user relationship Mapping")
	void test3() {
		assertNotNull(tripHost.getReview());
		assertEquals("Coolest Host ever.", tripHost.getReview());
	}
	
	@Test
	@DisplayName("Test trip host and user relationship Mapping")
	void test4() {
		assertNotNull(tripHost.getTrip());
		assertEquals(600, tripHost.getTrip().getMiles());
	}
	
	@Test
	@DisplayName("Test trip host and user relationship Mapping")
	void test5() {
		assertNotNull(tripHost.getPassenger().getUser().getUsername());
		assertEquals("user2", tripHost.getPassenger().getUser().getUsername());
	}
	@Test
	@DisplayName("Test trip host and user relationship Mapping")
	void test6() {
		assertNotNull(tripHost.getPassenger().getFirstName());
		assertEquals("user", tripHost.getPassenger().getFirstName());
	}
}
