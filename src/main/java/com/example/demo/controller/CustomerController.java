package com.example.demo.controller;

import com.example.demo.entity.Customer;
import com.example.demo.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService service;

    // create customer
    @PostMapping
    public Customer createCustomer(@RequestBody Customer customer){
        return service.createCustomer(customer);
    }

    // get all customers
    @GetMapping
    public List<Customer> getCustomers(){
        return service.getAllCustomers();
    }

    // get customer by id
    @GetMapping("/{id}")
    public Customer getCustomer(@PathVariable Long id){
        return service.getCustomerById(id);
    }

    // update customer
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Long id, @RequestBody Customer customer){
        return service.updateCustomer(id, customer);
    }

    // delete customer
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Long id){
        service.deleteCustomer(id);
        return "Customer deleted";
    }
}