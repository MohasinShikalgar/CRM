package com.example.demo.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Campaign;
import com.example.demo.repository.CampaignRepository;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepo;

    // create campaign
    public Campaign createCampaign(Campaign campaign){

        campaign.setCreatedDate(LocalDate.now());

        return campaignRepo.save(campaign);
    }

    // get all campaigns
    public List<Campaign> getAllCampaigns(){
        return campaignRepo.findAll();
    }

    // update campaign
    public Campaign updateCampaign(Long id, Campaign campaignDetails) {
        Campaign campaign = campaignRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));

        campaign.setCampaignName(campaignDetails.getCampaignName());
        campaign.setEmailSubject(campaignDetails.getEmailSubject());
        campaign.setEmailMessage(campaignDetails.getEmailMessage());
        campaign.setTargetGroup(campaignDetails.getTargetGroup());
        campaign.setBudget(campaignDetails.getBudget());
        campaign.setRevenueGenerated(campaignDetails.getRevenueGenerated());

        return campaignRepo.save(campaign);
    }

    // delete campaign
    public void deleteCampaign(Long id) {
        Campaign campaign = campaignRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        campaignRepo.delete(campaign);
    }
}