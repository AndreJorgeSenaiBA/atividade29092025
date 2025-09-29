// js/scripts.js (Versão Completa)

// --- CONSTANTES E ELEMENTOS GLOBAIS ---
const URL_BASE_PHP = 'php/';

// Pega referências dos elementos HTML do formulário e da tabela
const formLivro = document.getElementById('formLivro');
const btnSalvar = document.getElementById('btnSalvar');
const btnCancelar = document.getElementById('btnCancelar');
const idLivroInput = document.getElementById('idLivro');
const tabelaLivrosContainer = document.getElementById('tabelalivros');


// --- FUNÇÕES DE CRUD (Create, Read, Update, Delete) ---

/**
 * FUNÇÃO 1: READ
 * Busca os livros no servidor e chama a função para exibi-los na tabela.
 */
function carregarLivros() {
    fetch(URL_BASE_PHP + 'ler_livros.php')
        .then(response => response.json())
        .then(livros => {
            exibirTabelaLivros(livros);
        })
        .catch(error => {
            console.error('Erro ao carregar livros:', error);
            tabelaLivrosContainer.innerHTML = '<p>Erro ao carregar os dados. Tente novamente.</p>';
        });
}

/**
 * FUNÇÃO 2: UPDATE (Parte 1 - Preparação)
 * Busca os dados de um livro específico e preenche o formulário para edição.
 * @param {number} id - O ID do livro a ser editado.
 */
function prepararEdicao(id) {
    fetch(`${URL_BASE_PHP}buscar_livro.php?id=${id}`)
        .then(response => response.json())
        .then(livro => {
            if (livro.erro) {
                alert(livro.erro);
                return;
            }

            // Preenche os campos do formulário com os dados do livro
            idLivroInput.value = livro.id;
            document.getElementById('titulo').value = livro.titulo;
            document.getElementById('autor').value = livro.autor;
            document.getElementById('genero').value = livro.genero;
            document.getElementById('preco').value = livro.preco;
            document.getElementById('quantidade').value = livro.quantidade;

            // Altera o texto do botão e exibe o botão de cancelar
            btnSalvar.textContent = 'Atualizar Livro';
            btnCancelar.style.display = 'inline-block';

            // Rola a página para o topo para focar no formulário
            window.scrollTo(0, 0);
        })
        .catch(error => {
            console.error('Erro ao buscar dados do livro:', error);
            alert('Não foi possível carregar os dados para edição.');
        });
}

/**
 * FUNÇÃO 3: DELETE
 * Envia uma requisição para deletar um livro, após confirmação.
 * @param {number} id - O ID do livro a ser excluído.
 */
function deletarLivro(id) {
    if (confirm('Tem certeza que deseja excluir este livro? Esta ação não pode ser desfeita.')) {
        const formData = new FormData();
        formData.append('id', id);

        fetch(URL_BASE_PHP + 'deletar_livro.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.sucesso) {
                    alert(data.mensagem);
                    carregarLivros(); // Recarrega a lista para remover o livro da tela
                } else {
                    alert('Erro: ' + data.mensagem);
                }
            })
            .catch(error => {
                console.error('Erro ao deletar livro:', error);
                alert('Ocorreu um erro na comunicação com o servidor.');
            });
    }
}


// --- FUNÇÕES AUXILIARES DE INTERFACE (UI) ---

/**
 * Monta a tabela HTML com os dados dos livros e a insere na página.
 * @param {Array} livros - Um array de objetos, onde cada objeto é um livro.
 */
function exibirTabelaLivros(livros) {
    if (livros.length === 0) {
        tabelaLivrosContainer.innerHTML = '<p>Nenhum livro cadastrado. Use o formulário acima para adicionar.</p>';
        return;
    }

    let htmlTabela = `
        <table>
            <thead>
                <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Gênero</th>
                    <th>Preço (R$)</th>
                    <th>Estoque</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
    `;

    livros.forEach(livro => {
        htmlTabela += `
            <tr>
                <td>${livro.titulo}</td>
                <td>${livro.autor}</td>
                <td>${livro.genero}</td>
                <td>R$ ${parseFloat(livro.preco).toFixed(2).replace('.', ',')}</td>
                <td>${livro.quantidade_estoque}</td>
                <td>
                    <button class="btn-editar" data-id="${livro.id}">Editar</button>
                    <button class="btn-excluir" data-id="${livro.id}">Excluir</button>
                </td>
            </tr>
        `;
    });

    htmlTabela += `</tbody></table>`;
    tabelaLivrosContainer.innerHTML = htmlTabela;

    adicionarEventListenersTabela();
}

/**
 * Adiciona os eventos de clique aos botões de "Editar" e "Excluir" da tabela.
 */
function adicionarEventListenersTabela() {
    document.querySelectorAll('.btn-editar').forEach(button => {
        button.addEventListener('click', function() {
            prepararEdicao(this.getAttribute('data-id'));
        });
    });

    document.querySelectorAll('.btn-excluir').forEach(button => {
        button.addEventListener('click', function() {
            deletarLivro(this.getAttribute('data-id'));
        });
    });
}

/**
 * Limpa o formulário e o restaura para o modo de "Cadastro".
 */
function cancelarEdicao() {
    formLivro.reset();
    idLivroInput.value = '';
    btnSalvar.textContent = 'Cadastrar Livro';
    btnCancelar.style.display = 'none';
}


// --- EVENT LISTENERS PRINCIPAIS ---

/**
 * Listener para o envio do formulário (CREATE e UPDATE).
 * Decide se deve chamar o script de criar ou atualizar com base na existência de um ID.
 */
formLivro.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = new FormData(this);
    const idLivro = idLivroInput.value;

    const actionUrl = idLivro ? URL_BASE_PHP + 'atualizar_livro.php' : URL_BASE_PHP + 'criar_livro.php';

    fetch(actionUrl, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.sucesso) {
                alert(data.mensagem);
                cancelarEdicao(); // Limpa o formulário e reseta os botões
                carregarLivros(); // Recarrega a lista de livros
            } else {
                alert("Erro: " + data.mensagem);
            }
        })
        .catch(error => {
            alert('Ocorreu um erro na comunicação com o servidor.');
            console.error('Erro ao salvar livro:', error);
        });
});

/**
 * Listener para o botão de cancelar a edição.
 */
btnCancelar.addEventListener('click', cancelarEdicao);


// --- INICIALIZAÇÃO ---

// Garante que a lista de livros seja carregada assim que a página for aberta.
window.onload = carregarLivros;