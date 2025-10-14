package com.siterosa.dto;

/**
 * DTO para resposta de criação de token QR
 * 
 * Retornado quando o frontend solicita um novo QR Code
 * Contém o token único e o tempo de vida (TTL)
 */
public class QRTokenResponse {
    
    /**
     * Token único para o QR Code
     * Este token será usado para identificar a sessão de login
     */
    private String token;
    
    /**
     * Tempo de vida do token em segundos (Time To Live)
     * Após este tempo, o token expira e não pode mais ser usado
     */
    private int ttl;
    
    /**
     * Status inicial do token (sempre "PENDING" na criação)
     */
    private String status = "PENDING";
    
    /**
     * Construtor padrão
     */
    public QRTokenResponse() {
    }
    
    /**
     * Construtor com parâmetros
     * 
     * @param token token único do QR Code
     * @param ttl tempo de vida em segundos
     */
    public QRTokenResponse(String token, int ttl) {
        this.token = token;
        this.ttl = ttl;
    }
    
    // Getters e Setters
    
    public String getToken() {
        return token;
    }
    
    public void setToken(String token) {
        this.token = token;
    }
    
    public int getTtl() {
        return ttl;
    }
    
    public void setTtl(int ttl) {
        this.ttl = ttl;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
}