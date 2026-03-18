package com.example.demo.service;

import com.example.demo.entity.Customer;
import com.example.demo.repository.CustomerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepo;

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
    public void deleteCustomer(Long id){
        customerRepo.deleteById(id);
    }
}