<?php
// php/criar_livro.php

include 'conexao.php';

// Define o cabeçalho para garantir que a resposta seja lida como JSON
header('Content-Type: application/json');

// 1. Recebe e sanitiza os dados do formulário (POST)
// Usamos real_escape_string para evitar ataques de SQL Injection
$titulo = $conn->real_escape_string($_POST['titulo']);
$autor = $conn->real_escape_string($_POST['autor']);
$genero = $conn->real_escape_string($_POST['genero']);
$preco = $conn->real_escape_string($_POST['preco']);
$quantidade = $conn->real_escape_string($_POST['quantidade']);

// 2. Prepara o comando SQL de INSERT (Inserir)
// Linha aproximada: 17
$sql = "INSERT INTO livros (titulo, autor, genero, preco, quantidade_estoque) 
        VALUES ('$titulo', '$autor', '$genero', '$preco', '$quantidade')";
// 3. Executa a query e verifica o resultado
if ($conn->query($sql) === TRUE) {
    // Retorna mensagem de sucesso em JSON
    echo json_encode(['sucesso' => true, 'mensagem' => "Livro '$titulo' cadastrado com sucesso!"]);
} else {
    // Retorna mensagem de erro em JSON
    echo json_encode(['sucesso' => false, 'mensagem' => "Erro ao cadastrar livro: " . $conn->error]);
}

// 4. Fecha a conexão
$conn->close();
?>