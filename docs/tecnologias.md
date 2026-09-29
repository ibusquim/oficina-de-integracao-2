# Tecnologias

| Componente             | Tecnologia              | Finalidade                                  |
| ---------------------- | ----------------------- | ------------------------------------------- |
| Estrutura do Front-end | HTML                    | Estrutura das páginas                       |
| Estilização            | CSS                     | Interface e cenário                         |
| Programação            | JavaScript              | Lógica da aplicação e interpretador         |
| Build                  | Vite                    | Ambiente de desenvolvimento e build         |
| Back-end               | Node.js                 | Execução do servidor                        |
| API                    | Express                 | Desenvolvimento da API REST                 |
| Banco de dados         | PostgreSQL              | Persistência dos dados                      |
| Autenticação           | Firebase Authentication | Login com Google                            |
| Testes unitários       | Vitest                  | Testes do interpretador e regras de negócio |
| Testes de integração   | Supertest               | Testes da API                               |
| Testes E2E             | Playwright              | Testes dos fluxos completos                 |
| Versionamento          | Git + GitHub            | Controle de versão                          |
| Gerenciamento          | GitHub Projects         | Kanban e gerenciamento das tarefas          |
| Ambiente               | Docker + Docker Compose | Padronização do ambiente                    |

## Justificativa

### JavaScript

Será utilizado tanto no front-end quanto no back-end, reduzindo a quantidade de tecnologias diferentes e permitindo que a equipe concentre o desenvolvimento na lógica da aplicação.

O JavaScript também será utilizado na implementação do interpretador simplificado de Portugol.

### Vite

Será utilizado para facilitar o desenvolvimento e a execução do front-end.

### Node.js e Express

Serão utilizados para implementar o back-end e disponibilizar uma API REST para comunicação entre o front-end e os dados persistidos.

### PostgreSQL

Será utilizado para armazenar informações relacionadas aos usuários, desafios e progresso.

### Firebase Authentication

Será utilizado para implementar o login utilizando contas Google.

### Vitest

Será utilizado para testes unitários, principalmente do interpretador Portugol e do motor de movimentação.

### Supertest

Será utilizado para testar os endpoints da API.

### Playwright

Será utilizado para testes End-to-End dos principais fluxos da aplicação.

### Docker

Será utilizado para facilitar a configuração e padronização do ambiente de desenvolvimento.
