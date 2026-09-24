package com.example.demo.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) { // This method is used to configure the CORS policy for the
                                                         // application. And this is used to register
                                                         // cors rule.

        registry.addMapping("/**")
                .allowedOrigins("https://internalfrontend-xi.vercel.app", "https://systemfrontend-lilac.vercel.app") // React
                                                                                                                     // frontend
                // port and Next.js
                // port
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(false);
    }
}