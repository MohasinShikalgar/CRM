package com.example.demo.controller;

import com.example.demo.entity.Deal;
import com.example.demo.service.DealService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/deals")
public class DealController {

    @Autowired
    private DealService service;

    // create deal
    @PostMapping("/{customerId}/{userId}")
    public Deal createDeal(@PathVariable Long customerId,
                           @PathVariable Long userId,
                           @RequestBody Deal deal){

        return service.createDeal(customerId, userId, deal);
    }

    // update deal
    @PutMapping("/{id}")
    public Deal updateDeal(@PathVariable Long id, @RequestBody Deal deal){
        return service.updateDeal(id, deal);
    }

    // get all deals
    @GetMapping
    public List<Deal> getDeals(){
        return service.getAllDeals();
    }
}