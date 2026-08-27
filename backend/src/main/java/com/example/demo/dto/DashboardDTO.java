package com.example.demo.dto;

public class DashboardDTO {

    private long totalLeads;
    private long totalCustomers;
    private long totalDeals;
    private long totalTasks;
    private long pendingTasks;
    private long totalInteractions;
    private double salesForecast;

    public long getTotalLeads() {
        return totalLeads;
    }

    public void setTotalLeads(long totalLeads) {
        this.totalLeads = totalLeads;
    }

    public long getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(long totalCustomers) {
        this.totalCustomers = totalCustomers;
    }

    public long getTotalDeals() {
        return totalDeals;
    }

    public void setTotalDeals(long totalDeals) {
        this.totalDeals = totalDeals;
    }

    public long getTotalTasks() {
        return totalTasks;
    }

    public void setTotalTasks(long totalTasks) {
        this.totalTasks = totalTasks;
    }

    public long getPendingTasks() {
        return pendingTasks;
    }

    public void setPendingTasks(long pendingTasks) {
        this.pendingTasks = pendingTasks;
    }

    public long getTotalInteractions() {
        return totalInteractions;
    }

    public void setTotalInteractions(long totalInteractions) {
        this.totalInteractions = totalInteractions;
    }

    public double getSalesForecast() {
        return salesForecast;
    }

    public void setSalesForecast(double salesForecast) {
        this.salesForecast = salesForecast;
    }
}