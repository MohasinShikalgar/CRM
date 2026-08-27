package com.example.demo.service;

import com.example.demo.dto.DashboardDTO;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.DealRepository;
import com.example.demo.repository.InteractionRepository;
import com.example.demo.repository.LeadRepository;
import com.example.demo.repository.TaskRepository;

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
    private TaskRepository taskRepo;

    @Autowired
    private InteractionRepository interactionRepo;

    public DashboardDTO getDashboard(){

        DashboardDTO dashboard = new DashboardDTO();

        dashboard.setTotalLeads(leadRepo.count());
        dashboard.setTotalCustomers(customerRepo.count());
        dashboard.setTotalDeals(dealRepo.count());
        dashboard.setTotalTasks(taskRepo.count());

        long pending = taskRepo.findAll().stream()
                .filter(t -> t.getStatus() == null || !"COMPLETED".equalsIgnoreCase(t.getStatus()))
                .count();
        dashboard.setPendingTasks(pending);
        dashboard.setTotalInteractions(interactionRepo.count());

        // Sales Forecast
        double forecast = dealRepo.findAll().stream()
                .filter(d -> !"WON".equalsIgnoreCase(d.getStage()) && !"LOST".equalsIgnoreCase(d.getStage()))
                .mapToDouble(d -> d.getValue())
                .sum() * 0.3;
        dashboard.setSalesForecast(Math.round(forecast * 100.0) / 100.0);

        return dashboard;
    }
}