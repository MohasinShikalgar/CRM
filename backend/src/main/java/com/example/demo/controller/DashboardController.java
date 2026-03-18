package com.example.demo.controller;

import com.example.demo.dto.DashboardDTO;
import com.example.demo.service.DashboardService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping
    public DashboardDTO getDashboard(){

        return service.getDashboard();
    }
}