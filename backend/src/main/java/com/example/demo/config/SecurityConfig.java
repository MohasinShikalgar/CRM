package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.example.demo.security.JwtFilter;
import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
                .cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(org.springframework.http.HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers("/api/auth/**", "/error").permitAll()
                        .requestMatchers("/api/leads/**").hasAnyRole("ADMIN", "SALES")
                        .requestMatchers("/api/deals/**").authenticated() // Allow any authenticated user to access Deals
                        .requestMatchers("/api/customers/**").hasAnyRole("ADMIN", "SALES", "SUPPORT")
                        .requestMatchers("/api/tickets/**").hasAnyRole("ADMIN", "SUPPORT")
                        .requestMatchers("/api/interactions/**").hasAnyRole("ADMIN", "SUPPORT")
                        .requestMatchers("/api/dashboard/**").hasAnyRole("ADMIN", "SALES", "SUPPORT")
                        .anyRequest().authenticated() // Allow any other request to also be authenticated instead of strictly ADMIN
                )
                .exceptionHandling(ex -> ex
                    .authenticationEntryPoint((request, response, authException) -> {
                        System.out.println("Unauthorized access attempt: " + request.getRequestURI());
                        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized");
                    })
                    .accessDeniedHandler((request, response, accessDeniedException) -> {
                        System.out.println("Forbidden access attempt: " + request.getRequestURI());
                        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
                    })
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}