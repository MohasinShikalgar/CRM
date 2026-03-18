package com.example.demo.dto;

public class DashboardDTO {

    private long totalLeads;
    private long totalCustomers;
    private long totalDeals;
    private long openTickets;

    private double salesForecast;
    private long slaBreachedTickets;
    private double averageRoi;

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

    public long getOpenTickets() {
        return openTickets;
    }

    public void setOpenTickets(long openTickets) {
        this.openTickets = openTickets;
    }

    public double getSalesForecast() {
        return salesForecast;
    }

    public void setSalesForecast(double salesForecast) {
        this.salesForecast = salesForecast;
    }

    public long getSlaBreachedTickets() {
        return slaBreachedTickets;
    }

    public void setSlaBreachedTickets(long slaBreachedTickets) {
        this.slaBreachedTickets = slaBreachedTickets;
    }

    public double getAverageRoi() {
        return averageRoi;
    }

    public void setAverageRoi(double averageRoi) {
        this.averageRoi = averageRoi;
    }
}