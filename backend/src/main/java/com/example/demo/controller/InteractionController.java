package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Interaction;
import com.example.demo.service.InteractionService;

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/api/interactions")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class InteractionController {

    @Autowired
    private InteractionService service;

    @PostMapping("/send")
    public Interaction sendEmail(@RequestBody com.example.demo.dto.EmailRequest request) {
        // Ensure SentById is provided from frontend or passed correctly
        return service.sendEmail(
                request.getCustomerId(),
                request.getSentById(),
                request.getSubject(),
                request.getMessage());
    }

    @GetMapping
    public List<Interaction> getAll() {
        return service.getAll();
    }
}