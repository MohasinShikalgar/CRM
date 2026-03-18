package com.example.demo.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Interaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String emailSubject;

    private String emailMessage;

    private LocalDateTime sentDate;

    @ManyToOne
    @JoinColumn(name="customer_id")
    private Customer customer;

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @ManyToOne
    @JoinColumn(name="sent_by")
    private User sentBy;

    public void setSentBy(User sentBy) {
        this.sentBy = sentBy;
    }

    public void setSentDate(LocalDateTime sentDate){
        this.sentDate = sentDate;
    }

    public Long getId() {
        return id;
    }

    public String getEmailSubject() {
        return emailSubject;
    }

    public String getEmailMessage() {
        return emailMessage;
    }

    public LocalDateTime getSentDate() {
        return sentDate;
    }

    public Customer getCustomer() {
        return customer;
    }

    public User getSentBy() {
        return sentBy;
    }

    public void setEmailSubject(String emailSubject) {
        this.emailSubject = emailSubject;
    }

    public void setEmailMessage(String emailMessage) {
        this.emailMessage = emailMessage;
    }

}