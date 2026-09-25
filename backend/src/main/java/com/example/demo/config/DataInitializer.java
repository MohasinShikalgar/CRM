package com.example.demo.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.example.demo.entity.Role;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;

@Configuration
public class DataInitializer {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository) {
        return args -> {
            // Seed Admin User
            if (userRepository.findByEmail("admin@crm.com").isEmpty()) {
                User admin = new User();
                admin.setName("Admin User");
                admin.setEmail("admin@crm.com");
                admin.setPassword("admin123");
                admin.setRole(Role.ADMIN);
                userRepository.save(admin);
                System.out.println(">>> Seeded default admin user: admin@crm.com / admin123");
            }

            // Seed Sales User
            if (userRepository.findByEmail("sales@crm.com").isEmpty()) {
                User sales = new User();
                sales.setName("Sales Executive");
                sales.setEmail("sales@crm.com");
                sales.setPassword("sales123");
                sales.setRole(Role.SALES);
                userRepository.save(sales);
                System.out.println(">>> Seeded default sales user: sales@crm.com / sales123");
            }

            // Seed Support User
            if (userRepository.findByEmail("support@crm.com").isEmpty()) {
                User support = new User();
                support.setName("Support Agent");
                support.setEmail("support@crm.com");
                support.setPassword("support123");
                support.setRole(Role.SUPPORT);
                userRepository.save(support);
                System.out.println(">>> Seeded default support user: support@crm.com / support123");
            }
        };
    }
}
