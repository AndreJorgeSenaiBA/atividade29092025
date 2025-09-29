<?php
// php/buscar_livro.php

include 'conexao.php';

// Define o cabeçalho da resposta como JSON
header('Content-Type: application/json');

// Pega o ID enviado via GET e garante que é um inteiro
$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id > 0) {
    // Usa prepared statements para segurança
    $sql = "SELECT * FROM livros WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id); // "i" significa que o parâmetro é um inteiro
    $stmt->execute();
    
    $resultado = $stmt->get_result();
    
    if ($resultado->num_rows > 0) {
        $livro = $resultado->fetch_assoc();
        echo json_encode($livro);
    } else {
        echo json_encode(['erro' => 'Livro não encontrado']);
    }
    
    $stmt->close();
} else {
    echo json_encode(['erro' => 'ID inválido']);
}

$conn->close();
?>