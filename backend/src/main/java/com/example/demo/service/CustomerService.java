package com.example.demo.service;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.DealRepository;
import com.example.demo.repository.InteractionRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.TicketRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private DealRepository dealRepo;

    @Autowired
    private TicketRepository ticketRepo;

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private InteractionRepository interactionRepo;

    // create customer
    public Customer createCustomer(Customer customer){
        return customerRepo.save(customer);
    }

    // get all customers
    public List<Customer> getAllCustomers(){
        return customerRepo.findAll();
    }

    // get single customer
    public Customer getCustomerById(Long id){
        return customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
    }

    // update customer
    public Customer updateCustomer(Long id, Customer customer){
        Customer existing = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        existing.setName(customer.getName());
        existing.setEmail(customer.getEmail());
        existing.setPhone(customer.getPhone());
        existing.setCompany(customer.getCompany());
        return customerRepo.save(existing);
    }

    // delete customer
    @Transactional
    public void deleteCustomer(Long id){
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found"));
        
        dealRepo.deleteByCustomer(customer);
        ticketRepo.deleteByCustomer(customer);
        taskRepo.deleteByCustomer(customer);
        interactionRepo.deleteByCustomer(customer);
        
        customerRepo.delete(customer);
    }
}