package com.siterosa.dto;

/**
 * DTO para resposta de status do QR Code
 * 
 * Retornado quando o frontend consulta o status de um token QR
 * Pode conter token JWT se o QR foi aprovado
 */
public class QRStatusResponse {
    
    /**
     * Status atual do token QR
     * Valores possíveis:
     * - PENDING: aguardando aprovação
     * - APPROVED: aprovado, login autorizado
     * - EXPIRED: token expirou
     */
    private String status;
    
    /**
     * Token JWT (apenas quando status = APPROVED)
     * Este token será usado para autenticação nas próximas requisições
     */
    private String jwt;
    
    /**
     * Informações do usuário (apenas quando status = APPROVED)
     * Dados básicos do usuário que fez login
     */
    private AuthResponse.UserInfo user;
    
    /**
     * Tempo restante em segundos (apenas quando status = PENDING)
     * Indica quanto tempo falta para o token expirar
     */
    private Integer timeRemaining;
    
    /**
     * Construtor padrão
     */
    public QRStatusResponse() {
    }
    
    /**
     * Construtor para status PENDING
     * 
     * @param status status do token
     * @param timeRemaining tempo restante em segundos
     */
    public QRStatusResponse(String status, Integer timeRemaining) {
        this.status = status;
        this.timeRemaining = timeRemaining;
    }
    
    /**
     * Construtor para status APPROVED
     * 
     * @param status status do token
     * @param jwt token JWT
     * @param user informações do usuário
     */
    public QRStatusResponse(String status, String jwt, AuthResponse.UserInfo user) {
        this.status = status;
        this.jwt = jwt;
        this.user = user;
    }
    
    // Getters e Setters
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getJwt() {
        return jwt;
    }
    
    public void setJwt(String jwt) {
        this.jwt = jwt;
    }
    
    public AuthResponse.UserInfo getUser() {
        return user;
    }
    
    public void setUser(AuthResponse.UserInfo user) {
        this.user = user;
    }
    
    public Integer getTimeRemaining() {
        return timeRemaining;
    }
    
    public void setTimeRemaining(Integer timeRemaining) {
        this.timeRemaining = timeRemaining;
    }
}