package com.example.demo.repository;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Deal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealRepository extends JpaRepository<Deal, Long> {
    void deleteByCustomer(Customer customer);
}