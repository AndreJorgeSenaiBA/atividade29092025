<?php
// php/atualizar_livro.php

include 'conexao.php';

header('Content-Type: application/json');

// 1. Recebe os dados do formulário (POST)
// Usamos real_escape_string para sanitizar as strings
$id = $conn->real_escape_string($_POST['idLivro']);
$titulo = $conn->real_escape_string($_POST['titulo']);
$autor = $conn->real_escape_string($_POST['autor']);
$genero = $conn->real_escape_string($_POST['genero']);
$preco = $conn->real_escape_string($_POST['preco']);
$quantidade = $conn->real_escape_string($_POST['quantidade']);

// 2. Prepara o comando SQL de UPDATE (Atualizar)
// Usa prepared statements para segurança
$sql = "UPDATE livros SET titulo = ?, autor = ?, genero = ?, preco = ?, quantidade_estoque = ? WHERE id = ?";

$stmt = $conn->prepare($sql);
// "sssddi" -> s: string, d: double (para preço), i: integer (para quantidade e id)
$stmt->bind_param("sssddi", $titulo, $autor, $genero, $preco, $quantidade, $id);

// 3. Executa a query e verifica o resultado
if ($stmt->execute()) {
    echo json_encode(['sucesso' => true, 'mensagem' => "Livro '$titulo' atualizado com sucesso!"]);
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => "Erro ao atualizar livro: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>