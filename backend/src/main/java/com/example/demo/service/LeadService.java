package com.example.demo.service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Lead;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.LeadRepository;

@Service
public class LeadService {

    @Autowired
    private LeadRepository leadRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private CustomerService customerService;

    public Lead createLead(Lead lead){
        if (lead.getLeadScore() == null) {
            lead.setLeadScore((int)(Math.random() * 90) + 10); // Random score between 10 and 100
        }
        if (lead.getStatus() == null || lead.getStatus().trim().isEmpty()) {
            lead.setStatus("NEW");
        }
        if (lead.getSource() == null || lead.getSource().trim().isEmpty()) {
            lead.setSource("Website");
        }
        if (lead.getCreatedDate() == null) {
            lead.setCreatedDate(java.time.LocalDate.now());
        }
        
        // Handle duplicate leads by email
        if (lead.getEmail() != null && !lead.getEmail().trim().isEmpty()) {
            Optional<Lead> existingOpt = leadRepo.findByEmail(lead.getEmail().trim());
            if (existingOpt.isPresent()) {
                Lead existing = existingOpt.get();
                existing.setName(lead.getName());
                existing.setPhone(lead.getPhone());
                existing.setCompany(lead.getCompany());
                existing.setSource(lead.getSource());
                existing.setStatus(lead.getStatus());
                existing.setCreatedDate(lead.getCreatedDate());
                if (lead.getLeadScore() != null) {
                    existing.setLeadScore(lead.getLeadScore());
                }
                return leadRepo.save(existing);
            }
        }
        return leadRepo.save(lead);
    }

    public List<Lead> getAllLeads(){
        return leadRepo.findAll();
    }

    public Lead updateLead(Long id, Lead lead){
        Lead existing = leadRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        existing.setName(lead.getName());
        existing.setEmail(lead.getEmail());
        existing.setPhone(lead.getPhone());
        existing.setCompany(lead.getCompany());
        existing.setSource(lead.getSource());
        existing.setStatus(lead.getStatus());
        existing.setFollowUpDate(lead.getFollowUpDate());

        return leadRepo.save(existing);
    }

    @Transactional
    public void deleteLead(Long id){
        Optional<Lead> optLead = leadRepo.findById(id);
        if (optLead.isEmpty()) {
            return;
        }
        Lead lead = optLead.get();

        // Collect matching customer IDs for this person across email, phone, name
        Set<Long> customerIdsToDelete = new HashSet<>();
        if (lead.getEmail() != null && !lead.getEmail().trim().isEmpty()) {
            customerRepo.findByEmailIgnoreCase(lead.getEmail().trim())
                    .forEach(c -> customerIdsToDelete.add(c.getId()));
        }
        if (lead.getPhone() != null && !lead.getPhone().trim().isEmpty()) {
            customerRepo.findByPhone(lead.getPhone().trim())
                    .forEach(c -> customerIdsToDelete.add(c.getId()));
        }
        if (lead.getName() != null && !lead.getName().trim().isEmpty()) {
            customerRepo.findByNameIgnoreCase(lead.getName().trim())
                    .forEach(c -> customerIdsToDelete.add(c.getId()));
        }

        // Delete all matching customers and their associated deals, tasks, interactions
        for (Long customerId : customerIdsToDelete) {
            customerService.deleteCustomer(customerId);
        }

        // Delete lead
        leadRepo.delete(lead);
    }

    public Customer convertToCustomer(Long id){
        Lead lead = leadRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));

        Customer customer = new Customer();
        customer.setName(lead.getName());
        customer.setEmail(lead.getEmail());
        customer.setPhone(lead.getPhone());
        customer.setCompany(lead.getCompany());
        customer.setCreatedDate(java.time.LocalDate.now());

        return customerRepo.save(customer);
    }
}