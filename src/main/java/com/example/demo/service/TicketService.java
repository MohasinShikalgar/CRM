package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Ticket;
import com.example.demo.entity.User;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.TicketRepository;
import com.example.demo.repository.UserRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private UserRepository userRepo;

    // create ticket
    public Ticket createTicket(Long customerId, Long userId, Ticket ticket){

        Customer customer = customerRepo.findById(customerId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        ticket.setCustomer(customer);
        ticket.setAssignedTo(user);
        ticket.setCreatedDate(LocalDateTime.now());

        return ticketRepo.save(ticket);
    }

    // get all tickets
    public List<Ticket> getAllTickets(){
        return ticketRepo.findAll();
    }

    // get SLA breached tickets (open > 48 hours)
    public List<Ticket> getSlaBreachedTickets() {
        LocalDateTime threshold = LocalDateTime.now().minusHours(48);
        return ticketRepo.findAll().stream()
                .filter(t -> !"RESOLVED".equalsIgnoreCase(t.getStatus()))
                .filter(t -> t.getCreatedDate() != null && t.getCreatedDate().isBefore(threshold))
                .toList();
    }

    // resolve ticket
    public Ticket resolveTicket(Long ticketId){

        Ticket ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setStatus("RESOLVED");
        ticket.setResolvedDate(LocalDateTime.now());

        return ticketRepo.save(ticket);
    }

    // update ticket
    public Ticket updateTicket(Long ticketId, Ticket ticketDetails) {
        Ticket ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));

        ticket.setSubject(ticketDetails.getSubject());
        ticket.setDescription(ticketDetails.getDescription());
        ticket.setPriority(ticketDetails.getPriority());
        ticket.setStatus(ticketDetails.getStatus());

        if ("RESOLVED".equalsIgnoreCase(ticketDetails.getStatus()) && ticket.getResolvedDate() == null) {
            ticket.setResolvedDate(LocalDateTime.now());
        }

        return ticketRepo.save(ticket);
    }

    // delete ticket
    public void deleteTicket(Long ticketId) {
        Ticket ticket = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Ticket not found"));
        ticketRepo.delete(ticket);
    }
}