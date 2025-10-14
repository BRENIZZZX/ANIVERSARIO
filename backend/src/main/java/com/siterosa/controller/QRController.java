package com.siterosa.controller;

import com.siterosa.service.QRTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin(origins = "http://localhost:5173")
public class QRController {

    @Autowired
    private QRTokenService qrTokenService;

    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createQRToken() {
        try {
            Map<String, Object> response = qrTokenService.createQRToken();
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/status/{token}")
    public ResponseEntity<Map<String, Object>> getQRStatus(@PathVariable String token) {
        try {
            Map<String, Object> response = qrTokenService.getQRStatus(token);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/approve")
    public ResponseEntity<Map<String, Object>> approveQRToken(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String email = request.get("email");
            
            if (token == null || email == null) {
                Map<String, Object> error = new HashMap<>();
                error.put("error", "Token e email são obrigatórios");
                return ResponseEntity.badRequest().body(error);
            }

            Map<String, Object> response = qrTokenService.approveQRToken(token, email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}