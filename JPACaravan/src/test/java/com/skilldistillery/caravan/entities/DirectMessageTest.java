package com.skilldistillery.caravan.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class DirectMessageTest {
	private static EntityManagerFactory emf;
	private EntityManager em;
	private DirectMessage dm;

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
		dm = em.find(DirectMessage.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		dm = null;
	}

	@Test
	@DisplayName("Test Direct Message Entity Mapping")
	void test1() {
		assertNotNull(dm);
	}

}
