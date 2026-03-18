package com.example.demo.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name="customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String phone;

    private String company;

    private String address;

    private LocalDate createdDate;

    public Customer(){}

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

    public String getAddress(){ return address; }
    public void setAddress(String address){ this.address = address; }

    public LocalDate getCreatedDate(){ return createdDate; }
    public void setCreatedDate(LocalDate createdDate){ this.createdDate = createdDate; }
}