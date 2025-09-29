<?php
// php/conexao.php
// Arquivo responsável por conectar com o banco de dados MySQL

// Configurações de acesso ao banco
$servidor = "localhost";    // Onde o MySQL está rodando
$usuario = "root";          // Usuário padrão do XAMPP
$senha = "";                // Senha padrão do XAMPP (vazia)
$banco = "livraria_saber";  // Nome do banco que criamos

// Tenta criar a conexão
$conn = new mysqli($servidor, $usuario, $senha, $banco);

// Verifica se a conexão deu certo
if ($conn->connect_error) {
    // Se der erro, mostra mensagem e PARA tudo
    die("Conexão falhou: " . $conn->connect_error);
}

// Se chegou aqui, a conexão deu certo!
// echo "Conectado ao Banco com Sucesso!";

?>