package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="ad_tracking")
public class AdTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String platform;

    private int leadsGenerated;

    private LocalDate createdDate;

    @ManyToOne
    @JoinColumn(name="campaign_id")
    private Campaign campaign;

    public AdTracking(){}

    public Long getId(){
        return id;
    }

    public String getPlatform(){
        return platform;
    }

    public void setPlatform(String platform){
        this.platform = platform;
    }

    public int getLeadsGenerated(){
        return leadsGenerated;
    }

    public void setLeadsGenerated(int leadsGenerated){
        this.leadsGenerated = leadsGenerated;
    }

    public LocalDate getCreatedDate(){
        return createdDate;
    }

    public void setCreatedDate(LocalDate createdDate){
        this.createdDate = createdDate;
    }

    public Campaign getCampaign(){
        return campaign;
    }

    public void setCampaign(Campaign campaign){
        this.campaign = campaign;
    }
}