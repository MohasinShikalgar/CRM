package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="support_tickets")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;

    private String description;

    private String priority;

    private String status;

    private LocalDateTime createdDate;

    private LocalDateTime resolvedDate;

    // which customer raised ticket
    @ManyToOne
    @JoinColumn(name="customer_id")
    private Customer customer;

    // which support staff handles ticket
    @ManyToOne
    @JoinColumn(name="assigned_to")
    private User assignedTo;

    public Ticket(){}

    public Long getId(){ return id; }

    public String getSubject() { return subject; }
    public void setSubject(String subject) { this.subject = subject; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public String getStatus(){ return status; }

    public void setStatus(String status){
        this.status = status;
    }

    public LocalDateTime getCreatedDate(){
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate){
        this.createdDate = createdDate;
    }

    public LocalDateTime getResolvedDate(){
        return resolvedDate;
    }

    public void setResolvedDate(LocalDateTime resolvedDate){
        this.resolvedDate = resolvedDate;
    }

    public Customer getCustomer(){
        return customer;
    }

    public void setCustomer(Customer customer){
        this.customer = customer;
    }

    public User getAssignedTo(){
        return assignedTo;
    }
    
   
    public void setAssignedTo(User assignedTo){
        this.assignedTo = assignedTo;
    }
}