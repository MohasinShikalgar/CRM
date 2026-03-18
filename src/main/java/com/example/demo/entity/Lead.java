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
@Table(name="leads")
public class Lead {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String company;

    private String source;

    private String status;

    private LocalDate followUpDate;

    private LocalDate createdDate;

    // 🔗 Sales person assigned to this lead
    @ManyToOne
    @JoinColumn(name="assigned_to")
    private User assignedTo;

    private Integer leadScore;

    public Lead(){}

    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getName(){ return name; }
    public void setName(String name){ this.name = name; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public String getPhone(){ return phone; }
    public void setPhone(String phone){ this.phone = phone; }

    public String getCompany(){ return company; }
    public void setCompany(String company){ this.company = company; }

    public String getSource(){ return source; }
    public void setSource(String source){ this.source = source; }

    public String getStatus(){ return status; }
    public void setStatus(String status){ this.status = status; }

    public LocalDate getFollowUpDate(){ return followUpDate; }
    public void setFollowUpDate(LocalDate followUpDate){ this.followUpDate = followUpDate; }

    public LocalDate getCreatedDate(){ return createdDate; }
    public void setCreatedDate(LocalDate createdDate){ this.createdDate = createdDate; }

    public User getAssignedTo(){ return assignedTo; }
    public void setAssignedTo(User assignedTo){ this.assignedTo = assignedTo; }

    public Integer getLeadScore(){ return leadScore; }
    public void setLeadScore(Integer leadScore){ this.leadScore = leadScore; }
}