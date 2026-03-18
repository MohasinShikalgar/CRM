package com.example.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Customer;
import com.example.demo.entity.Task;
import com.example.demo.entity.User;
import com.example.demo.repository.CustomerRepository;
import com.example.demo.repository.TaskRepository;
import com.example.demo.repository.UserRepository;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepo;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private CustomerRepository customerRepo;

    public Task createTask(Long userId, Long customerId, Task task){

    	User user = userRepo.findById(userId)
    	        .orElseThrow(() -> new RuntimeException("User not found"));
    	Customer customer = customerRepo.findById(customerId)
    	        .orElseThrow(() -> new RuntimeException("Customer not found"));

        task.setAssignedTo(user);
        task.setCustomer(customer);

        return taskRepo.save(task);
    }

    // update task
    public Task updateTask(Long id, Task task){
        Task existing = taskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
        existing.setTitle(task.getTitle());
        existing.setDescription(task.getDescription());
        existing.setStatus(task.getStatus());
        existing.setDueDate(task.getDueDate());
        return taskRepo.save(existing);
    }

    // delete task
    public void deleteTask(Long id){
        taskRepo.deleteById(id);
    }

    public List<Task> getAllTasks(){
        return taskRepo.findAll();
    }
}