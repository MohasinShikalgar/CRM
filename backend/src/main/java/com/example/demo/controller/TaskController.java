package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Task;
import com.example.demo.service.TaskService;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService service;

    // Create task
    @PostMapping("/{userId}/{customerId}")
    public Task createTask(@PathVariable Long userId,
                           @PathVariable Long customerId,
                           @RequestBody Task task){

        return service.createTask(userId, customerId, task);
    }

    // Update task
    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id, @RequestBody Task task){
        return service.updateTask(id, task);
    }

    // Delete task
    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id){
        service.deleteTask(id);
        return "Task deleted";
    }

    // Get all tasks
    @GetMapping
    public List<Task> getTasks(){
        return service.getAllTasks();
    }
}