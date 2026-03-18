package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.DeleteMapping;

import com.example.demo.entity.Ticket;
import com.example.demo.service.TicketService;

@RestController

@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketService service;

    // create ticket
    @PostMapping("/{customerId}/{userId}")
    public Ticket createTicket(@PathVariable Long customerId,
            @PathVariable Long userId,
            @RequestBody Ticket ticket) {

        return service.createTicket(customerId, userId, ticket);
    }

    // get all tickets
    @GetMapping
    public List<Ticket> getAllTickets() {
        return service.getAllTickets();
    }

    // get SLA breached tickets
    @GetMapping("/sla-breached")
    public List<Ticket> getSlaBreachedTickets() {
        return service.getSlaBreachedTickets();
    }

    // resolve ticket
    @PutMapping("/resolve/{ticketId}")
    public Ticket resolveTicket(@PathVariable Long ticketId) {
        return service.resolveTicket(ticketId);
    }

    // update ticket
    @PutMapping("/{ticketId}")
    public Ticket updateTicket(@PathVariable Long ticketId, @RequestBody Ticket ticketDetails) {
        return service.updateTicket(ticketId, ticketDetails);
    }

    // delete ticket
    @DeleteMapping("/{ticketId}")
    public void deleteTicket(@PathVariable Long ticketId) {
        service.deleteTicket(ticketId);
    }
}