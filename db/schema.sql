-- Schema do banco de dados para o Site Rosa
-- Execute este script no MySQL para criar a estrutura necessária

-- Cria o banco de dados se não existir
CREATE DATABASE IF NOT EXISTS site_rosa 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Seleciona o banco de dados
USE site_rosa;

-- Remove a tabela se existir (para recriar)
DROP TABLE IF EXISTS users;

-- Cria a tabela de usuários
CREATE TABLE users (
    -- ID único do usuário (chave primária, auto-incremento)
    id BIGINT NOT NULL AUTO_INCREMENT,
    
    -- Nome de usuário (único, não nulo, máximo 50 caracteres)
    username VARCHAR(50) NOT NULL UNIQUE,
    
    -- Email do usuário (único, não nulo, máximo 100 caracteres)
    email VARCHAR(100) NOT NULL UNIQUE,
    
    -- Hash da senha (não nulo, máximo 255 caracteres para BCrypt)
    -- BCrypt gera hashes de ~60 caracteres, mas deixamos 255 para segurança
    password_hash VARCHAR(255) NOT NULL,
    
    -- Data e hora de criação da conta (não nulo, valor padrão atual)
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Data e hora da última atualização (atualiza automaticamente)
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Define a chave primária
    PRIMARY KEY (id),
    
    -- Índices para melhorar performance das consultas
    INDEX idx_email (email),
    INDEX idx_username (username),
    INDEX idx_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Comentários explicativos das colunas:

-- id: Identificador único de cada usuário
--     BIGINT suporta até 9.223.372.036.854.775.807 usuários
--     AUTO_INCREMENT gera valores sequenciais automaticamente

-- username: Nome de exibição do usuário
--     VARCHAR(50) permite nomes de até 50 caracteres
--     UNIQUE garante que não haverá nomes duplicados
--     NOT NULL impede valores vazios

-- email: Endereço de email do usuário
--     VARCHAR(100) permite emails de até 100 caracteres
--     UNIQUE garante que cada email seja usado apenas uma vez
--     NOT NULL impede valores vazios
--     Usado como identificador para login

-- password_hash: Hash da senha do usuário
--     VARCHAR(255) comporta hashes BCrypt e outros algoritmos
--     NOT NULL impede senhas vazias
--     NUNCA armazenamos senhas em texto plano por segurança

-- created_at: Timestamp de criação da conta
--     TIMESTAMP armazena data e hora precisas
--     DEFAULT CURRENT_TIMESTAMP define automaticamente na criação
--     NOT NULL garante que sempre haverá uma data

-- updated_at: Timestamp da última modificação
--     TIMESTAMP armazena data e hora precisas
--     DEFAULT CURRENT_TIMESTAMP define valor inicial
--     ON UPDATE CURRENT_TIMESTAMP atualiza automaticamente
--     Útil para auditoria e controle de versões

-- Configurações da tabela:
-- ENGINE=InnoDB: Motor de armazenamento com suporte a transações ACID
-- CHARSET=utf8mb4: Suporte completo a Unicode (incluindo emojis)
-- COLLATE=utf8mb4_unicode_ci: Comparação case-insensitive para Unicode

-- Índices criados:
-- idx_email: Acelera consultas por email (usado no login)
-- idx_username: Acelera consultas por nome de usuário
-- idx_created_at: Acelera consultas por data de criação

-- Inserir alguns dados de exemplo (opcional para testes)
-- Senha para todos os usuários de exemplo: "123456"
-- Hash BCrypt da senha "123456": $2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsW5qfyOm

INSERT INTO users (username, email, password_hash) VALUES 
('admin', 'admin@siterosa.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsW5qfyOm'),
('usuario_teste', 'teste@exemplo.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsW5qfyOm'),
('maria_rosa', 'maria@siterosa.com', '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj6hsW5qfyOm');

-- Verificar se os dados foram inseridos
SELECT id, username, email, created_at FROM users;

-- Mostrar estrutura da tabela
DESCRIBE users;

-- Mostrar índices criados
SHOW INDEX FROM users;