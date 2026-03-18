package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Interaction;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {

}