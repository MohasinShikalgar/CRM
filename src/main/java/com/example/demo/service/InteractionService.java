package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Interaction;
import com.example.demo.entity.User;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.InteractionRepository;
import com.example.demo.repository.UserRepository;

import com.example.demo.service.EmailService;

@Service
public class InteractionService {

    @Autowired
    private InteractionRepository interactionRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private EmailService emailService;

    public Interaction sendEmail(Long customerId, Long userId, String subject, String message){

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User user = (userId != null) ? userRepo.findById(userId).orElse(null) : null;

        // 1. Send the actual email
        try {
            emailService.sendEmail(customer.getEmail(), subject, message);
        } catch (Exception e) {
            System.err.println("Failed to send email via SMTP: " + e.getMessage());
            // We can choose to throw or just log it and still save the interaction. We will throw.
            throw new RuntimeException("Email sending failed: " + e.getMessage());
        }

        // 2. Save Interaction to DB
        Interaction interaction = new Interaction();
        interaction.setCustomer(customer);
        interaction.setSentBy(user);
        interaction.setEmailSubject(subject);
        interaction.setEmailMessage(message);
        interaction.setSentDate(LocalDateTime.now());

        return interactionRepo.save(interaction);
    }

    public List<Interaction> getAll(){
        return interactionRepo.findAll();
    }
}