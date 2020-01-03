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

class UserProfileTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private UserProfile userProfile;

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
		userProfile = em.find(UserProfile.class, 3);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		userProfile = null;
	}

	@Test
	@DisplayName("Test User Profile Entity Mapping")
	void test() {
		assertNotNull(userProfile);
	}
	
	@Test
	@DisplayName("Testing user Profile OTO address")
	void test2() {
		assertEquals("Memphis", userProfile.getAddress().getCity());
	}
	
	@Test
	@DisplayName("Testing User Profile and Inbox Relationship Mapping")
	void test3() {
		assertEquals(9, userProfile.getInbox().size());
	}
	
	@Test
	@DisplayName("Testing User Profile and Outbox Relationship Mapping")
	void test4() {
		assertEquals(8, userProfile.getOutbox().size());
	}
	
//	@Test
//	@DisplayName("Testing User Profile's Total Messages Mapping")
//	void test5() {
//		assertEquals(17, userProfile.getAllMessages().size());
//	}

}
