package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign,Long> {

}