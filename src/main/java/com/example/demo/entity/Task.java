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
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private LocalDate dueDate;

    private String status;

    // Task related to customer
    @ManyToOne
    @JoinColumn(name="related_customer")
    private Customer customer;

    // Assigned sales/support user
    @ManyToOne
    @JoinColumn(name="assigned_to")
    private User assignedTo;

    public Task(){}

    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getTitle(){ return title; }
    public void setTitle(String title){ this.title = title; }

    public String getDescription(){ return description; }
    public void setDescription(String description){ this.description = description; }

    public LocalDate getDueDate(){ return dueDate; }
    public void setDueDate(LocalDate dueDate){ this.dueDate = dueDate; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }

    public Customer getCustomer(){ return customer; }
    public void setCustomer(Customer customer){ this.customer = customer; }

    public User getAssignedTo(){ return assignedTo; }
    public void setAssignedTo(User assignedTo){ this.assignedTo = assignedTo; }
}