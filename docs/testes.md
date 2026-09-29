# Estratégia de Testes

## 1. Objetivo

Os testes automatizados terão como objetivo verificar o funcionamento do interpretador Portugol, do motor de movimentação, da API e das principais funcionalidades da aplicação.

Serão utilizadas três categorias principais:

* testes unitários;
* testes de integração;
* testes End-to-End.

---

## 2. Testes unitários

Os testes unitários serão utilizados principalmente para validar o interpretador Portugol e o motor de execução.

### Interpretador

Serão testados:

* reconhecimento dos comandos válidos;
* reconhecimento da estrutura `inicio` e `fim`;
* identificação de comandos inválidos;
* identificação de sintaxe inválida;
* identificação da linha que contém o erro;
* conversão do código em uma sequência de instruções.

Exemplo:

```portugol
inicio
    frente()
    direita()
fim
```

Resultado esperado:

```text
[
    FRENTE,
    DIREITA
]
```

### Motor de movimentação

Serão testados:

* movimento para frente;
* movimento para trás;
* movimento para direita;
* movimento para esquerda;
* limite do cenário;
* colisão com obstáculos;
* atualização da posição;
* identificação do objetivo.

---

## 3. Testes de integração

Os testes de integração verificarão a comunicação entre diferentes partes do sistema.

Serão testados:

* API de desafios;
* API de progresso;
* persistência no PostgreSQL;
* recuperação dos desafios;
* registro da conclusão de um desafio;
* comunicação entre back-end e banco de dados.

A ferramenta Supertest será utilizada para testar os endpoints da API.

---

## 4. Testes End-to-End

Os testes End-to-End serão realizados utilizando Playwright.

Eles deverão simular a utilização da aplicação por um usuário real.

### Cenário de sucesso

```text
Acessar aplicação
       ↓
Realizar login
       ↓
Selecionar desafio
       ↓
Visualizar cenário
       ↓
Escrever programa Portugol
       ↓
Executar programa
       ↓
Personagem alcançar objetivo
       ↓
Desafio concluído
```

### Cenário de erro

```text
Selecionar desafio
       ↓
Escrever comando inválido
       ↓
Executar programa
       ↓
Sistema identifica erro
       ↓
Mensagem de erro apresentada
```

---

## 5. Ferramentas

| Tipo                 | Ferramenta         |
| -------------------- | ------------------ |
| Testes unitários     | Vitest             |
| Testes de integração | Vitest + Supertest |
| Testes E2E           | Playwright         |

## 6. Cobertura

Será utilizada a cobertura de testes fornecida pelo Vitest para acompanhar a cobertura do código.

Será estabelecida como meta uma cobertura mínima de 80% das principais regras de negócio, especialmente do interpretador Portugol e do motor de movimentação.

A cobertura será analisada durante os sprints e os testes poderão ser ampliados de acordo com os resultados encontrados.

## 7. Estratégia

As regras de negócio serão priorizadas nos testes automatizados.

A prioridade será:

1. Interpretador Portugol;
2. Motor de movimentação;
3. Validação de desafios;
4. API;
5. Fluxos principais da interface.
