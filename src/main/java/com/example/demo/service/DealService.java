package com.example.demo.service;

import com.example.demo.entity.Deal;
import com.example.demo.entity.Customer;
import com.example.demo.entity.User;

import com.example.demo.repository.DealRepository;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DealService {

    @Autowired
    private DealRepository dealRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private UserRepository userRepo;

    // create deal
    public Deal createDeal(Long customerId, Long userId, Deal deal){

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        deal.setCustomer(customer);
        deal.setAssignedTo(user);

        return dealRepo.save(deal);
    }

    // update deal
    public Deal updateDeal(Long id, Deal deal){
        Deal existing = dealRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Deal not found"));
        existing.setDealName(deal.getDealName());
        existing.setValue(deal.getValue());
        existing.setStage(deal.getStage());
        existing.setCreatedDate(deal.getCreatedDate());
        return dealRepo.save(existing);
    }

    // get all deals
    public List<Deal> getAllDeals(){
        return dealRepo.findAll();
    }
}