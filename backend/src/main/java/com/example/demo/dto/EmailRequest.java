package com.example.demo.dto;

public class EmailRequest {
    private Long customerId;
    private String subject;
    private String message;
    private Long sentById; // Custom addition to track who sent it, since JWT auth filter may not populate SecurityContext globally yet

    public EmailRequest() {}

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Long getSentById() {
        return sentById;
    }

    public void setSentById(Long sentById) {
        this.sentById = sentById;
    }
}
