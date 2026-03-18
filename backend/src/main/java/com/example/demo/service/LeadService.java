package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public Lead createLead(Lead lead){
        if (lead.getLeadScore() == null) {
            lead.setLeadScore((int)(Math.random() * 90) + 10); // Random score between 10 and 100
        }
        return leadRepo.save(lead);
    }

    public List<Lead> getAllLeads(){
        return leadRepo.findAll();
    }

    public Lead updateLead(Long id, Lead lead){

        Lead existing = leadRepo.findById(id).orElseThrow();

        existing.setName(lead.getName());
        existing.setEmail(lead.getEmail());
        existing.setPhone(lead.getPhone());
        existing.setCompany(lead.getCompany());
        existing.setSource(lead.getSource());
        existing.setStatus(lead.getStatus());
        existing.setFollowUpDate(lead.getFollowUpDate());

        return leadRepo.save(existing);
    }

    public void deleteLead(Long id){
        leadRepo.deleteById(id);
    }

    public Customer convertToCustomer(Long id){

        Lead lead = leadRepo.findById(id).orElseThrow();

        Customer customer = new Customer();

        customer.setName(lead.getName());
        customer.setEmail(lead.getEmail());
        customer.setPhone(lead.getPhone());
        customer.setCompany(lead.getCompany());

        return customerRepo.save(customer);
    }
}