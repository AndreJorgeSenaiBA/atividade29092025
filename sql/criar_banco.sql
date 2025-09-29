create database livraria_saber;
use livraria_saber;

CREATE TABLE livros (
id INT PRIMARY KEY AUTO_INCREMENT,
titulo VARCHAR(255) NOT NULL, 
autor VARCHAR(150), 
genero VARCHAR(100), 
preco DECIMAL(10,2), 
quantidade_estoque INT 
);

INSERT INTO livros (titulo, autor, genero, preco, quantidade_estoque) VALUES 
('O Senhor dos Anéis', 'J.R.R. Tolkien', 'Fantasia', 78.50, 15),
('O Guia do Mochileiro das Galáxias', 'Douglas Adams', 'Ficção Cientifica', 120.00, 20),
('1984', 'George Orwell', 'Distopia', 35.75, 30);