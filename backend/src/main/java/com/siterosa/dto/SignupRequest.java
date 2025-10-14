package com.siterosa.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO para requisição de cadastro de usuário
 * 
 * DTOs (Data Transfer Objects) são usados para:
 * - Transferir dados entre camadas da aplicação
 * - Validar dados de entrada
 * - Evitar exposição direta das entidades
 */
public class SignupRequest {
    
    /**
     * Nome de usuário
     * Validações:
     * - Não pode ser vazio (@NotBlank)
     * - Deve ter entre 3 e 50 caracteres (@Size)
     */
    @NotBlank(message = "Nome de usuário é obrigatório")
    @Size(min = 3, max = 50, message = "Nome de usuário deve ter entre 3 e 50 caracteres")
    private String username;
    
    /**
     * Email do usuário
     * Validações:
     * - Não pode ser vazio (@NotBlank)
     * - Deve ter formato válido de email (@Email)
     */
    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    private String email;
    
    /**
     * Senha do usuário
     * Validações:
     * - Não pode ser vazia (@NotBlank)
     * - Deve ter pelo menos 6 caracteres (@Size)
     */
    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String password;
    
    /**
     * Construtor padrão
     * Necessário para deserialização JSON
     */
    public SignupRequest() {
    }
    
    /**
     * Construtor com parâmetros
     * 
     * @param username nome de usuário
     * @param email email do usuário
     * @param password senha do usuário
     */
    public SignupRequest(String username, String email, String password) {
        this.username = username;
        this.email = email;
        this.password = password;
    }
    
    // Getters e Setters
    // Necessários para serialização/deserialização JSON
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    /**
     * Método toString para debug
     * Não inclui a senha por segurança
     */
    @Override
    public String toString() {
        return "SignupRequest{" +
                "username='" + username + '\'' +
                ", email='" + email + '\'' +
                '}';
    }
}