# MoveCode

Ferramenta web educacional para o ensino de conceitos básicos de lógica de programação por meio da programação de um personagem utilizando comandos em Portugol.

## Objetivo

O MoveCode tem como objetivo auxiliar o ensino introdutório de lógica de programação por meio de desafios visuais.

O usuário deverá escrever um pequeno programa utilizando comandos simplificados em Portugol. O sistema interpretará os comandos e executará as instruções no cenário, movimentando o personagem até o objetivo do desafio.

## Funcionamento

O usuário seleciona um desafio e visualiza um cenário contendo:

* personagem;
* obstáculos;
* posição inicial;
* objetivo.

Em seguida, o usuário escreve um programa em Portugol utilizando os comandos disponibilizados pela aplicação.

Exemplo:

```portugol
inicio
    frente()
    frente()
    direita()
    frente()
fim
```

Ao executar o programa, o sistema interpreta as instruções na ordem em que foram escritas e movimenta o personagem no cenário.

Caso o programa contenha um comando inválido ou produza um movimento impossível, o sistema deverá informar o problema ao usuário.

## Comandos iniciais

A primeira versão da aplicação utilizará os seguintes comandos:

| Comando      | Ação                                          |
| ------------ | --------------------------------------------- |
| `frente()`   | Move o personagem uma posição para frente     |
| `tras()`     | Move o personagem uma posição para trás       |
| `direita()`  | Move o personagem uma posição para a direita  |
| `esquerda()` | Move o personagem uma posição para a esquerda |

A sintaxe completa e as regras de execução serão definidas na documentação do projeto.

## Funcionalidades

* Cadastro e autenticação de usuários;
* Login utilizando Google;
* Visualização de desafios;
* Visualização do cenário;
* Editor de código Portugol;
* Execução do código;
* Interpretação dos comandos de movimentação;
* Validação da sintaxe dos comandos;
* Validação dos movimentos;
* Identificação da conclusão do desafio;
* Registro do progresso do usuário.

## Tecnologias

* HTML
* CSS
* JavaScript
* Vite
* Node.js
* Express
* PostgreSQL
* Firebase Authentication
* Vitest
* Supertest
* Playwright
* Docker
* Git
* GitHub

## Arquitetura

O sistema utilizará uma arquitetura cliente-servidor, separando a interface da aplicação, a interpretação e execução dos comandos, a API e a persistência dos dados.

## Documentação

* [Requisitos](docs/requisitos.md)
* [Arquitetura](docs/arquitetura.md)
* [Testes](docs/testes.md)
* [Tecnologias](docs/tecnologias.md)
* [Cronograma](docs/cronograma.md)
