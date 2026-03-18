package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.AdTracking;
import com.example.demo.entity.Campaign;
import com.example.demo.repository.AdTrackingRepository;
import com.example.demo.repository.CampaignRepository;

@Service
public class AdTrackingService {

    @Autowired
    private AdTrackingRepository adRepo;

    @Autowired
    private CampaignRepository campaignRepo;

    public AdTracking createAd(Long campaignId, AdTracking ad){

        Campaign campaign = campaignRepo.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        ad.setCampaign(campaign);
        ad.setCreatedDate(LocalDate.now());

        return adRepo.save(ad);
    }

    public List<AdTracking> getAllAds(){
        return adRepo.findAll();
    }

    public AdTracking updateAd(Long id, AdTracking adDetails) {
        AdTracking ad = adRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));

        ad.setPlatform(adDetails.getPlatform());
        ad.setLeadsGenerated(adDetails.getLeadsGenerated());

        if (adDetails.getCreatedDate() != null) {
            ad.setCreatedDate(adDetails.getCreatedDate());
        }

        return adRepo.save(ad);
    }

    public void deleteAd(Long id) {
        AdTracking ad = adRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));

        adRepo.delete(ad);
    }
}