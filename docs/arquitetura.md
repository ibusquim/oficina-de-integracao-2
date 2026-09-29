# Arquitetura do Sistema

## 1. Visão geral

O MoveCode utilizará uma arquitetura cliente-servidor.

O sistema será dividido em:

* Front-end;
* Interpretador Portugol;
* Back-end;
* Banco de dados;
* Serviço de autenticação.

O interpretador Portugol será responsável por analisar o código escrito pelo usuário, identificar os comandos válidos e transformá-los em instruções de movimentação do personagem.

## 2. Diagrama de arquitetura

```text
                         ┌─────────────────┐
                         │     Usuário     │
                         └────────┬────────┘
                                  │
                                  ▼
                    ┌─────────────────────────┐
                    │       Front-end         │
                    │                         │
                    │ HTML + CSS + JavaScript │
                    │                         │
                    │ Editor Portugol         │
                    │ Cenário / Personagem    │
                    │ Interface               │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Interpretador Portugol  │
                    │                         │
                    │ Análise do código       │
                    │ Validação da sintaxe    │
                    │ Geração de comandos     │
                    └────────────┬────────────┘
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │ Motor de execução       │
                    │                         │
                    │ Movimentação            │
                    │ Colisões                │
                    │ Objetivo                │
                    └────────────┬────────────┘
                                 │
                                 │ HTTP / JSON
                                 ▼
                    ┌─────────────────────────┐
                    │        Back-end         │
                    │     Node.js + Express   │
                    └────────────┬────────────┘
                                 │
                    ┌────────────┴────────────┐
                    ▼                         ▼
             ┌───────────────┐       ┌─────────────────┐
             │  PostgreSQL   │       │ Firebase Auth   │
             │               │       │  Google Login   │
             └───────────────┘       └─────────────────┘
```

## 3. Front-end

O front-end será responsável pela interação com o usuário.

Suas principais responsabilidades serão:

* apresentar os desafios;
* apresentar o cenário;
* apresentar o personagem e os obstáculos;
* disponibilizar o editor de código;
* apresentar os comandos disponíveis;
* permitir a execução do programa;
* apresentar mensagens de erro;
* apresentar o resultado da execução;
* apresentar o progresso do usuário.

Tecnologias:

* HTML;
* CSS;
* JavaScript;
* Vite.

## 4. Interpretador Portugol

O interpretador será responsável por processar o código escrito pelo usuário.

O processo será dividido conceitualmente em:

```text
Código Portugol
       ↓
Leitura do código
       ↓
Análise das linhas
       ↓
Validação da sintaxe
       ↓
Identificação dos comandos
       ↓
Lista de instruções
       ↓
Motor de execução
       ↓
Movimentação do personagem
```

Exemplo:

```portugol
inicio
    frente()
    direita()
    frente()
fim
```

Será convertido conceitualmente em:

```text
[
    FRENTE,
    DIREITA,
    FRENTE
]
```

O motor de execução utilizará essa sequência para movimentar o personagem.

## 5. Motor de execução

O motor de execução será responsável por aplicar as instruções ao cenário.

Entre suas responsabilidades estão:

* movimentar o personagem;
* verificar os limites do cenário;
* verificar colisões;
* atualizar a posição do personagem;
* verificar se o objetivo foi alcançado.

O motor deverá ser independente da interface para permitir a realização de testes automatizados.

## 6. Back-end

O back-end será responsável pela API da aplicação e pelo acesso aos dados persistidos.

Principais responsabilidades:

* gerenciamento dos desafios;
* gerenciamento do progresso;
* comunicação com o banco de dados;
* validação das operações;
* disponibilização de endpoints REST.

Tecnologias:

* Node.js;
* Express;
* JavaScript.

## 7. Banco de dados

O PostgreSQL será utilizado para persistência dos dados.

As principais entidades previstas são:

```text
USUARIO
DESAFIO
PROGRESSO
```

Uma entidade de tentativa poderá ser adicionada caso seja necessária durante a implementação.

## 8. Autenticação

O Firebase Authentication será utilizado para autenticação por meio de contas Google.

A aplicação não armazenará diretamente as credenciais da conta Google do usuário.

## 9. Separação de responsabilidades

A interface, o interpretador e o motor de execução deverão permanecer separados.

Essa separação permitirá que a lógica de interpretação e movimentação seja testada sem depender da interface gráfica.
