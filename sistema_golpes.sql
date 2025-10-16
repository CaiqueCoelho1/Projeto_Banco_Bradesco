
CREATE DATABASE IF NOT EXISTS sistema_golpes;
USE sistema_golpes;

-- Tabela de usuários do sistema
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    senha VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tipos de golpes (catálogo)
CREATE TABLE golpes (
    id_golpe INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    nivel_risco ENUM('Baixo', 'Médio', 'Alto') DEFAULT 'Médio'
);

-- Tabela de denúncias
CREATE TABLE denuncias (
    id_denuncia INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT,
    id_golpe INT,
    numero_suspeito VARCHAR(20) NOT NULL,
    descricao TEXT,
    data_ligacao DATETIME,
    data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('Pendente', 'Em análise', 'Confirmado') DEFAULT 'Pendente',
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario),
    FOREIGN KEY (id_golpe) REFERENCES golpes(id_golpe)
);

-- Tabela de alertas ou notícias de prevenção
CREATE TABLE alertas (
    id_alerta INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    conteudo TEXT NOT NULL,
    data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de administradores do sistema
CREATE TABLE administradores (
    id_admin INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    nivel_acesso ENUM('Comum', 'Super') DEFAULT 'Comum',
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo alguns golpes de exemplo
INSERT INTO golpes (nome, descricao, nivel_risco) VALUES
('Falsa Central de Atendimento', 'Golpe onde o criminoso se passa por funcionário do banco e solicita dados pessoais.', 'Alto'),
('Golpe do PIX Falso', 'Criminoso envia comprovantes falsos de transferência.', 'Médio'),
('Golpe do SMS Fraudulento', 'Mensagens de texto com links falsos de instituições financeiras.', 'Médio');
