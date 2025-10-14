package com.siterosa.controller;

import com.siterosa.entity.User;
import com.siterosa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@CrossOrigin(origins = "http://localhost:5173")
public class TestController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/create-user")
    public Map<String, Object> createTestUser() {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Verificar se usuário já existe
            if (userRepository.existsByEmail("teste@email.com")) {
                response.put("message", "Usuário de teste já existe");
                response.put("email", "teste@email.com");
                response.put("password", "123456");
                return response;
            }

            // Criar usuário de teste
            User user = new User();
            user.setName("Teste Rosa");
            user.setEmail("teste@email.com");
            user.setPassword(passwordEncoder.encode("123456"));
            
            userRepository.save(user);
            
            response.put("success", true);
            response.put("message", "Usuário de teste criado com sucesso!");
            response.put("email", "teste@email.com");
            response.put("password", "123456");
            
        } catch (Exception e) {
            response.put("error", e.getMessage());
        }
        
        return response;
    }

    @GetMapping("/users")
    public Map<String, Object> listUsers() {
        Map<String, Object> response = new HashMap<>();
        response.put("users", userRepository.findAll());
        response.put("count", userRepository.count());
        return response;
    }
}