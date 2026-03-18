package com.example.demo.service;

import com.example.demo.dto.DashboardDTO;
import com.example.demo.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardService {

    @Autowired
    private LeadRepository leadRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private DealRepository dealRepo;

    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private CampaignRepository campaignRepo;

    public DashboardDTO getDashboard(){

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalLeads(leadRepo.count());
        dashboard.setTotalCustomers(customerRepo.count());
        dashboard.setTotalDeals(dealRepo.count());

        long openTickets = ticketRepo.findAll()
                .stream()
                .filter(t -> "OPEN".equalsIgnoreCase(t.getStatus()))
                .count();

        dashboard.setOpenTickets(openTickets);

        // Sales Forecast
        double forecast = dealRepo.findAll().stream()
                .filter(d -> !"WON".equalsIgnoreCase(d.getStage()) && !"LOST".equalsIgnoreCase(d.getStage()))
                .mapToDouble(d -> d.getValue())
                .sum() * 0.3;
        dashboard.setSalesForecast(Math.round(forecast * 100.0) / 100.0);

        // SLA Breached Tickets
        java.time.LocalDateTime threshold = java.time.LocalDateTime.now().minusHours(48);
        long slaBreached = ticketRepo.findAll().stream()
                .filter(t -> !"RESOLVED".equalsIgnoreCase(t.getStatus()))
                .filter(t -> t.getCreatedDate() != null && t.getCreatedDate().isBefore(threshold))
                .count();
        dashboard.setSlaBreachedTickets(slaBreached);

        // Average ROI ((Total Revenue - Total Budget) / Total Budget) * 100
        double totalBudget = campaignRepo.findAll().stream()
                .mapToDouble(c -> c.getBudget() != null ? c.getBudget() : 0.0)
                .sum();
        double totalRevenue = campaignRepo.findAll().stream()
                .mapToDouble(c -> c.getRevenueGenerated() != null ? c.getRevenueGenerated() : 0.0)
                .sum();
                
        double roi = 0.0;
        if (totalBudget > 0) {
            roi = ((totalRevenue - totalBudget) / totalBudget) * 100;
        }
        dashboard.setAverageRoi(Math.round(roi * 100.0) / 100.0);

        return dashboard;
    }
}