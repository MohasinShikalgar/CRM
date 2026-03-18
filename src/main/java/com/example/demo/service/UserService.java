package com.example.demo.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository repo;

    public User register(User user){
        return repo.save(user);
    }

    public Optional<User> login(String email,String password){

        Optional<User> user = repo.findByEmail(email);

        if(user.isPresent() && user.get().getPassword().equals(password)){
            return user;
        }

        return Optional.empty();
    }
}