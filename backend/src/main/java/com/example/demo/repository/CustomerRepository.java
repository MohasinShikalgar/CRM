package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Customer;
import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    List<Customer> findByEmailIgnoreCase(String email);
    List<Customer> findByPhone(String phone);
    List<Customer> findByNameIgnoreCase(String name);
}