<?php
// php/deletar_livro.php

include 'conexao.php';

header('Content-Type: application/json');

// Recebe o ID via POST
$id = isset($_POST['id']) ? intval($_POST['id']) : 0;

if ($id > 0) {
    // Usa prepared statements para segurança
    $sql = "DELETE FROM livros WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        // Verifica se alguma linha foi realmente afetada
        if ($stmt->affected_rows > 0) {
            echo json_encode(['sucesso' => true, 'mensagem' => 'Livro excluído com sucesso!']);
        } else {
            echo json_encode(['sucesso' => false, 'mensagem' => 'Nenhum livro encontrado com este ID.']);
        }
    } else {
        echo json_encode(['sucesso' => false, 'mensagem' => 'Erro ao excluir o livro: ' . $stmt->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['sucesso' => false, 'mensagem' => 'ID inválido fornecido.']);
}

$conn->close();
?>