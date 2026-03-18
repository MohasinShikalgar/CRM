package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.AdTracking;

public interface AdTrackingRepository extends JpaRepository<AdTracking,Long> {

}