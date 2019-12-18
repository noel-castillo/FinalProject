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
	@DisplayName("Test Adventure Entity Mapping")
	void test1() {
		assertNotNull(adv);
		assertEquals("high", adv.getActivityLvl());
	}
	
	
	
	
}
