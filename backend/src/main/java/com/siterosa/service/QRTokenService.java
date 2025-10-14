package com.siterosa.service;

import com.siterosa.dto.AuthResponse;
import com.siterosa.dto.UserResponse;
import com.siterosa.entity.QRToken;
import com.siterosa.entity.User;
import com.siterosa.repository.QRTokenRepository;
import com.siterosa.repository.UserRepository;
import com.siterosa.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class QRTokenService {

    private static final int DEFAULT_TTL_SECONDS = 120; // 2 minutos

    @Autowired
    private QRTokenRepository qrTokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> createQRToken() {
        String token = UUID.randomUUID().toString();
        LocalDateTime expiresAt = LocalDateTime.now().plusSeconds(DEFAULT_TTL_SECONDS);

        QRToken qrToken = new QRToken(token, expiresAt);
        qrTokenRepository.save(qrToken);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("ttl", DEFAULT_TTL_SECONDS);
        response.put("expiresAt", expiresAt);

        return response;
    }

    public Map<String, Object> getQRStatus(String token) {
        QRToken qrToken = qrTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token não encontrado"));

        Map<String, Object> response = new HashMap<>();

        if (qrToken.isExpired()) {
            qrToken.setStatus(QRToken.QRStatus.EXPIRED);
            qrTokenRepository.save(qrToken);
            response.put("status", "EXPIRED");
            return response;
        }

        response.put("status", qrToken.getStatus().toString());

        if (qrToken.getStatus() == QRToken.QRStatus.APPROVED && qrToken.getUser() != null) {
            String jwt = jwtUtil.generateToken(qrToken.getUser().getEmail());
            response.put("jwt", jwt);
            response.put("user", new UserResponse(qrToken.getUser()));

            // Marcar como usado
            qrToken.setStatus(QRToken.QRStatus.USED);
            qrTokenRepository.save(qrToken);
        }

        return response;
    }

    public Map<String, Object> approveQRToken(String token, String email) {
        QRToken qrToken = qrTokenRepository.findByToken(token)
                .orElseThrow(() -> new RuntimeException("Token não encontrado"));

        if (qrToken.isExpired()) {
            throw new RuntimeException("Token expirado");
        }

        if (qrToken.getStatus() != QRToken.QRStatus.PENDING) {
            throw new RuntimeException("Token já foi processado");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        qrToken.setUser(user);
        qrToken.setStatus(QRToken.QRStatus.APPROVED);
        qrTokenRepository.save(qrToken);

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "QR Code aprovado com sucesso");

        return response;
    }
}