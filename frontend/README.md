# MoveCode — Front-end

Interface web do MoveCode: cenário do desafio, editor Portugol e execução visual
dos comandos. Desenvolvido com HTML, CSS e JavaScript (ES Modules) via Vite.

## Requisitos do ambiente

- Node.js `24.22.0`
- npm `11.19.1`

Consulte o arquivo [`.nvmrc`](../.nvmrc:1) na raiz do repositório para a versão
definida do Node.js.

## Instalação

A partir deste diretório (`frontend/`):

```bash
npm install
```

## Executar em desenvolvimento

```bash
npm run dev
```

Acesse o endereço local informado pelo Vite (por padrão `http://127.0.0.1:5173/`).

## Compilar a aplicação

```bash
npm run build
```

Os arquivos gerados estarão na pasta `dist/`.

## Executar os testes

```bash
npm run test
```

## Gerar relatório de cobertura

```bash
npm run coverage
```

O relatório HTML de cobertura será gerado na pasta `coverage/`.

## Sintaxe Portugol

Todo programa deverá conter `inicio`, os comandos de movimentação e `fim`.

Comandos disponíveis:

- `frente()`
- `tras()`
- `direita()`
- `esquerda()`

## Estrutura principal

- [`src/data/`](src/data/challenge.js:1): dados dos desafios.
- [`src/ui/`](src/ui/controller.js:1): interface e renderização do cenário.
- `src/core/`: interpretador e motor de execução (mantido pelo Igor).
- [`src/styles/`](src/styles/style.css:1): estilos da interface.

## Integração com o núcleo

Enquanto o interpretador e o motor não estiverem integrados, o
[`src/main.js`](src/main.js:1) usa `services: null` e o botão **Executar programa**
apenas informa que o núcleo está pendente. Após a integração, `main.js` importa
`parseProgram` de `./core/interpreter.js` e `executeProgram` de `./core/engine.js`.
