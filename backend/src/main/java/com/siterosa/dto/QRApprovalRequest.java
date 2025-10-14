package com.siterosa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

/**
 * DTO para requisição de aprovação de QR Code
 * 
 * Usado quando um usuário aprova o login via QR Code
 * Contém o token do QR e o email do usuário que está aprovando
 */
public class QRApprovalRequest {
    
    /**
     * Token do QR Code que está sendo aprovado
     * Deve corresponder a um token válido e não expirado
     */
    @NotBlank(message = "Token é obrigatório")
    private String token;
    
    /**
     * Email do usuário que está aprovando o login
     * Deve corresponder a um usuário válido no sistema
     */
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    private String email;
    
    /**
     * Construtor padrão
     */
    public QRApprovalRequest() {
    }
    
    /**
     * Construtor com parâmetros
     * 
     * @param token token do QR Code
     * @param email email do usuário
     */
    public QRApprovalRequest(String token, String email) {
        this.token = token;
        this.email = email;
    }
    
    // Getters e Setters
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    /**
     * Método toString para debug
     */
    @Override
    public String toString() {
        return "QRApprovalRequest{" +
                "token='" + token + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}