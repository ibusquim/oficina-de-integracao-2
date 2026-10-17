# MoveCode

Ferramenta web educacional para o ensino de conceitos básicos de lógica de programação por meio da programação de um personagem utilizando comandos em Portugol.

## Objetivo

O MoveCode tem como objetivo auxiliar o ensino introdutório de lógica de programação por meio de desafios visuais.

O usuário deverá escrever um pequeno programa utilizando comandos simplificados em Portugol. O sistema interpretará os comandos e executará as instruções no cenário, movimentando o personagem até o objetivo do desafio.

## Funcionamento

O usuário seleciona um desafio e visualiza um cenário contendo:

- Personagem;
- Obstáculos;
- Posição inicial;
- Objetivo.

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

| Comando | Ação |
|---|---|
| `frente()` | Move o personagem uma posição para frente. |
| `tras()` | Move o personagem uma posição para trás. |
| `direita()` | Move o personagem uma posição para a direita. |
| `esquerda()` | Move o personagem uma posição para a esquerda. |

A sintaxe completa e as regras de execução são definidas na documentação do projeto.

## Funcionalidades

- Cadastro e autenticação de usuários;
- Login utilizando Google;
- Visualização de desafios;
- Visualização do cenário;
- Editor de código Portugol;
- Execução do código;
- Interpretação dos comandos de movimentação;
- Validação da sintaxe dos comandos;
- Validação dos movimentos;
- Identificação da conclusão do desafio;
- Registro do progresso do usuário.

## Tecnologias

- HTML
- CSS
- JavaScript
- Vite
- Node.js
- Express
- PostgreSQL
- Firebase Authentication
- Vitest
- Supertest
- Playwright
- Docker
- Git
- GitHub

## Arquitetura

O sistema utiliza uma arquitetura cliente-servidor, separando a interface da aplicação, a interpretação e execução dos comandos, a API e a persistência dos dados.

## Inicialização e execução

### 1. Pré-requisitos

Antes de executar o MoveCode, é necessário ter instalado:

- **Git:** para clonar o repositório.
- **Node.js 24.22.0 LTS:** ambiente de execução JavaScript.
- **npm:** gerenciador de dependências incluído na instalação do Node.js.

Para verificar se as ferramentas estão instaladas, execute:

```bash
git --version
node -v
npm -v
```

A versão do Node.js definida pelo projeto está registrada no arquivo `.nvmrc`, localizado na raiz do repositório.

### 2. Clonar o repositório

Clone o repositório do MoveCode:

```bash
git clone https://github.com/ibusquim/oficina-de-integracao-2.git
```

Entre na pasta do projeto:

```bash
cd oficina-de-integracao-2
```

### 3. Acessar o front-end

O front-end da aplicação está localizado na pasta `frontend/`.

Acesse essa pasta:

```bash
cd frontend
```

Os próximos comandos desta seção devem ser executados dentro de `frontend/`, onde estão o `package.json` e o `package-lock.json` da aplicação.

### 4. Instalar as dependências

Execute:

```bash
npm ci
```

Esse comando instala as dependências registradas no `package-lock.json`, respeitando as versões definidas pelo projeto.

### 5. Executar a aplicação

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação. Abra esse endereço no navegador para acessar o MoveCode.

### 6. Executar os testes automatizados

Para executar os testes:

```bash
npm run test
```

Para gerar o relatório de cobertura:

```bash
npm run coverage
```

A cobertura será utilizada para acompanhar os testes das principais regras de negócio, especialmente do interpretador Portugol e do motor de movimentação.

### 7. Compilar para produção

Para gerar a versão de produção, execute:

```bash
npm run build
```

Os arquivos compilados serão gerados na pasta `dist/`.

Para visualizar a versão compilada localmente, execute:

```bash
npm run preview
```

O comando de visualização pressupõe que o build tenha sido executado anteriormente.

## Documentação

- [Requisitos](docs/requisitos.md)
- [Arquitetura](docs/arquitetura.md)
- [Testes](docs/testes.md)
- [Tecnologias](docs/tecnologias.md)
- [Cronograma](docs/cronograma.md)
