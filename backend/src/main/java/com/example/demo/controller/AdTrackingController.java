package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entity.AdTracking;
import com.example.demo.service.AdTrackingService;

@RestController
@RequestMapping("/api/ads")
public class AdTrackingController {

    @Autowired
    private AdTrackingService service;

    @PostMapping("/{campaignId}")
    public AdTracking createAd(@PathVariable Long campaignId,
                               @RequestBody AdTracking ad){

        return service.createAd(campaignId, ad);
    }

    @GetMapping
    public List<AdTracking> getAds(){
        return service.getAllAds();
    }

    @PutMapping("/{id}")
    public AdTracking updateAd(@PathVariable Long id, @RequestBody AdTracking ad){
        return service.updateAd(id, ad);
    }

    @DeleteMapping("/{id}")
    public void deleteAd(@PathVariable Long id){
        service.deleteAd(id);
    }
}