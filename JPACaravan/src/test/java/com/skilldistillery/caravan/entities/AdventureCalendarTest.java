package com.skilldistillery.caravan.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.time.LocalDate;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class AdventureCalendarTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private AdventureCalendar ac;

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
		ac = em.find(AdventureCalendar.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		ac = null;
	}

	@Test
	@DisplayName("Test Adventure Calendar entity mapping get adventure get title")
	void test1() {
		assertNotNull(ac);
		assertEquals("Grand Canyon", ac.getAdventure().getTitle());
	}
	
	@Test
	@DisplayName("Test Adventure Calendar entity mapping get end date")
	void test2() {
		assertNotNull(ac);
		assertEquals(LocalDate.parse("2019-10-15"), ac.getStartDate());
	}
	
	@Test
	@DisplayName("Test Adventure Calendar entity mapping get end date")
	void test3() {
		assertNotNull(ac);
		assertEquals(LocalDate.parse("2019-10-25"), ac.getEndDate());
	}
	
	@Test
	@DisplayName("Test Adventure Calendar entity mapping get id")
	void test4() {
		assertNotNull(ac);
		assertEquals(1, ac.getId());
	}
	
	
	
	
}
