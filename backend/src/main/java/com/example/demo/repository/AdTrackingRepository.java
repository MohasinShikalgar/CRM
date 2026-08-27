package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.AdTracking;
import com.example.demo.entity.Campaign;

public interface AdTrackingRepository extends JpaRepository<AdTracking, Long> {
    void deleteByCampaign(Campaign campaign);
}