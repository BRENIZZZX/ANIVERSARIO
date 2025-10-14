package com.siterosa.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

/**
 * Utilitário para geração e validação de tokens JWT
 * 
 * JWT (JSON Web Token) é um padrão para transmitir informações de forma segura
 * Composto por: Header.Payload.Signature
 */
@Component
public class JwtUtils {
    
    /**
     * Chave secreta para assinar os tokens
     * Vem do arquivo application.properties
     * Em produção, deve ser uma chave complexa e segura
     */
    @Value("${jwt.secret}")
    private String jwtSecret;
    
    /**
     * Tempo de expiração do token em milissegundos
     * Vem do arquivo application.properties
     * Padrão: 24 horas (86400000 ms)
     */
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;
    
    /**
     * Gera um token JWT para o usuário
     * 
     * @param email email do usuário (usado como subject)
     * @return token JWT como string
     */
    public String generateJwtToken(String email) {
        // Cria a chave secreta a partir da string configurada
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        
        // Constrói o token JWT
        return Jwts.builder()
                .setSubject(email)                              // Subject: email do usuário
                .setIssuedAt(new Date())                        // Data de emissão
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpirationMs)) // Data de expiração
                .signWith(key, SignatureAlgorithm.HS256)        // Assinatura com HMAC SHA-256
                .compact();                                     // Gera a string final do token
    }
    
    /**
     * Extrai o email (subject) do token JWT
     * 
     * @param token token JWT
     * @return email do usuário
     */
    public String getEmailFromJwtToken(String token) {
        // Cria a chave secreta para validar a assinatura
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        
        // Faz o parse do token e extrai o subject
        return Jwts.parserBuilder()
                .setSigningKey(key)                             // Define a chave para validação
                .build()
                .parseClaimsJws(token)                          // Faz o parse do token
                .getBody()                                      // Obtém o payload
                .getSubject();                                  // Extrai o subject (email)
    }
    
    /**
     * Valida se o token JWT é válido
     * 
     * Verifica:
     * - Assinatura correta
     * - Token não expirado
     * - Formato válido
     * 
     * @param authToken token JWT a ser validado
     * @return true se válido, false caso contrário
     */
    public boolean validateJwtToken(String authToken) {
        try {
            // Cria a chave secreta para validação
            SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
            
            // Tenta fazer o parse do token
            Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(authToken);
            
            return true; // Se chegou até aqui, o token é válido
            
        } catch (MalformedJwtException e) {
            // Token com formato inválido
            System.err.println("Token JWT inválido: " + e.getMessage());
        } catch (ExpiredJwtException e) {
            // Token expirado
            System.err.println("Token JWT expirado: " + e.getMessage());
        } catch (UnsupportedJwtException e) {
            // Token não suportado
            System.err.println("Token JWT não suportado: " + e.getMessage());
        } catch (IllegalArgumentException e) {
            // Claims string vazia
            System.err.println("JWT claims string está vazia: " + e.getMessage());
        } catch (Exception e) {
            // Outros erros
            System.err.println("Erro na validação do JWT: " + e.getMessage());
        }
        
        return false; // Token inválido
    }
    
    /**
     * Extrai a data de expiração do token
     * 
     * @param token token JWT
     * @return data de expiração
     */
    public Date getExpirationDateFromJwtToken(String token) {
        SecretKey key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
    }
    
    /**
     * Verifica se o token está expirado
     * 
     * @param token token JWT
     * @return true se expirado, false caso contrário
     */
    public boolean isTokenExpired(String token) {
        try {
            Date expiration = getExpirationDateFromJwtToken(token);
            return expiration.before(new Date());
        } catch (Exception e) {
            return true; // Se houve erro, considera como expirado
        }
    }
}