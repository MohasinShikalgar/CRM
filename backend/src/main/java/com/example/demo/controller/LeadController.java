package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Lead;
import com.example.demo.service.LeadService;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    @Autowired
    private LeadService service;

    @PostMapping
    public org.springframework.http.ResponseEntity<?> createLead(@RequestBody Lead lead){
        if (lead.getName() == null || lead.getName().trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.badRequest().body("Full Name is required");
        }
        if (lead.getEmail() == null || lead.getEmail().trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.badRequest().body("Email is required");
        }
        if (!lead.getEmail().matches("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$")) {
            return org.springframework.http.ResponseEntity.badRequest().body("Invalid email format");
        }
        if (lead.getPhone() == null || lead.getPhone().trim().isEmpty()) {
            return org.springframework.http.ResponseEntity.badRequest().body("Phone Number is required");
        }
        if (!lead.getPhone().matches("^[+]?[0-9\\s\\-()]{7,20}$")) {
            return org.springframework.http.ResponseEntity.badRequest().body("Invalid phone number format");
        }
        return org.springframework.http.ResponseEntity.ok(service.createLead(lead));
    }

    @GetMapping
    public List<Lead> getLeads(){
        return service.getAllLeads();
    }

    @PutMapping("/{id}")
    public Lead updateLead(@PathVariable Long id, @RequestBody Lead lead){
        return service.updateLead(id, lead);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteLead(@PathVariable Long id){
        service.deleteLead(id);
        return ResponseEntity.ok("Lead deleted successfully");
    }

    @PostMapping("/convert/{id}")
    public Customer convertLead(@PathVariable Long id){
        return service.convertToCustomer(id);
    }
}