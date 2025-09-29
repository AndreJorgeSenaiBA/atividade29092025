<?php
// php/ler_livros.php

// Inclui o arquivo de conexão com o banco de dados
include 'conexao.php';

// Define o cabeçalho da resposta como JSON
header('Content-Type: application/json');

// 1. Prepara o comando SQL para selecionar todos os campos (*) da tabela de livros
$sql = "SELECT * FROM livros ORDER BY id DESC";

// 2. Executa a consulta no banco de dados
$resultado = $conn->query($sql);

$livros = array();

// 3. Verifica se a consulta retornou linhas (livros)
if ($resultado->num_rows > 0) {
    // Loop para percorrer cada linha (livro) do resultado
    while($row = $resultado->fetch_assoc()) {
        $livros[] = $row;
    }
}

// 4. Converte o array PHP de livros para o formato JSON e imprime
echo json_encode($livros);

// 5. Fecha a conexão com o banco
$conn->close();
?>