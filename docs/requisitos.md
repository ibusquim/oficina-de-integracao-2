# Requisitos do Sistema

## 1. Identificação do Sistema

| Campo | Informação |
|---|---|
| **Nome do sistema** | Sistema de Desafios de Programação em Portugol |
| **Tipo** | Aplicação web educacional |
| **Objetivo** | Permitir que usuários aprendam e pratiquem conceitos básicos de programação por meio de desafios de movimentação utilizando uma sintaxe simplificada de Portugol. |
| **Público-alvo** | Estudantes e iniciantes em programação |
| **Plataforma** | Web |
| **Autenticação** | Conta Google |
| **Versão dos requisitos** | 1.0 |

---

# 2. Requisitos Funcionais

Os requisitos funcionais descrevem as funcionalidades que o sistema deverá oferecer ao usuário.

| ID | Nome | Descrição | Prioridade | Origem | Critério de Aceitação | Dependências |
|---|---|---|---|---|---|---|
| **RF01** | Cadastro de usuário | O sistema deve permitir que o usuário realize seu cadastro por meio de uma conta Google. | Alta | Necessidade de identificação do usuário | Ao selecionar a opção de cadastro, o usuário deve conseguir autenticar-se com uma conta Google e ter seu cadastro criado. | Autenticação Google |
| **RF02** | Login | O sistema deve permitir que o usuário realize login utilizando uma conta Google. | Alta | Necessidade de autenticação | Um usuário cadastrado deve conseguir acessar o sistema utilizando sua conta Google. | RF01 |
| **RF03** | Visualização dos desafios | O sistema deve apresentar uma lista de desafios disponíveis para o usuário. | Alta | Funcionalidade principal | Após acessar o sistema, o usuário deve conseguir visualizar os desafios disponíveis. | RF02 |
| **RF04** | Visualização do cenário | O sistema deve apresentar um cenário contendo o personagem, obstáculos, posição inicial e objetivo do desafio. | Alta | Funcionalidade principal | Ao iniciar um desafio, o usuário deve visualizar todos os elementos necessários para sua execução. | RF03 |
| **RF05** | Visualização das instruções | O sistema deve apresentar ao usuário os comandos Portugol disponíveis para o desafio. | Alta | Necessidade de orientação ao usuário | O usuário deve conseguir consultar os comandos disponíveis durante a realização do desafio. | RF03 |
| **RF06** | Edição do código | O sistema deve permitir que o usuário escreva e edite um programa utilizando a sintaxe Portugol definida pela aplicação. | Alta | Funcionalidade principal | O usuário deve conseguir inserir, alterar e remover comandos no editor de código. | RF05 |
| **RF07** | Execução do programa | O sistema deve permitir que o usuário execute o programa escrito no editor. | Alta | Funcionalidade principal | Ao executar o programa, o sistema deve processar o código informado pelo usuário. | RF06 |
| **RF08** | Interpretação dos comandos | O sistema deve interpretar os comandos de movimentação presentes no código e convertê-los em ações realizadas pelo personagem. | Alta | Motor de execução | Cada comando válido deve produzir a ação de movimentação correspondente. | RF07 |
| **RF09** | Execução sequencial | O sistema deve executar os comandos válidos na ordem em que aparecem no programa. | Alta | Regras de execução | Os comandos devem ser processados seguindo a ordem em que foram escritos pelo usuário. | RF08 |
| **RF10** | Validação da sintaxe | O sistema deve identificar comandos ou estruturas que não estejam de acordo com a sintaxe Portugol definida pela aplicação. | Alta | Validação do código | O sistema deve detectar comandos inválidos antes ou durante a execução do programa. | RF06 |
| **RF11** | Exibição de erros | O sistema deve informar ao usuário a existência de erros no código, indicando, quando possível, a linha em que o erro ocorreu. | Alta | Feedback ao usuário | Ao existir um erro, o sistema deve apresentar uma mensagem indicando o problema e sua localização quando possível. | RF10 |
| **RF12** | Validação dos movimentos | O sistema deve impedir que o personagem atravesse obstáculos ou ultrapasse os limites do cenário. | Alta | Regras do desafio | Quando um comando resultar em movimento inválido, o sistema não deve permitir que o personagem atravesse o obstáculo ou saia do cenário. | RF08 |
| **RF13** | Identificação do objetivo | O sistema deve identificar quando o personagem alcançar o objetivo do desafio. | Alta | Regras do desafio | Quando o personagem ocupar a posição definida como objetivo, o sistema deve reconhecer a conclusão do desafio. | RF12 |
| **RF14** | Resultado da execução | O sistema deve informar ao usuário o resultado da execução do programa, indicando se o desafio foi concluído ou se a execução não atingiu o objetivo. | Alta | Feedback ao usuário | Após a execução, o sistema deve informar se o objetivo foi alcançado ou não. | RF07, RF13 |
| **RF15** | Registro do progresso | O sistema deve registrar os desafios concluídos pelo usuário. | Média | Acompanhamento do aprendizado | Após a conclusão de um desafio, o sistema deve registrar que aquele desafio foi concluído pelo usuário. | RF02, RF13 |
| **RF16** | Visualização do progresso | O sistema deve permitir que o usuário visualize seu progresso nos desafios. | Média | Acompanhamento do aprendizado | O usuário deve conseguir visualizar quais desafios já foram concluídos. | RF15 |

---

# 3. Sintaxe Portugol

A primeira versão do sistema utilizará um subconjunto simplificado de Portugol, destinado exclusivamente aos comandos de movimentação do personagem.

## 3.1 Estrutura do programa

Todo programa deverá possuir uma estrutura composta por `inicio`, comandos de movimentação e `fim`.

| Elemento | Obrigatório | Descrição |
|---|---|---|
| `inicio` | Sim | Indica o início do programa. |
| Comandos | Sim | Representam as ações que serão executadas pelo personagem. |
| `fim` | Sim | Indica o encerramento do programa. |

### Exemplo

```text
inicio
    frente()
    frente()
    direita()
    esquerda()
fim
```

## 3.2 Comandos disponíveis

| Comando | Descrição | Ação |
|---|---|---|
| `frente()` | Move o personagem uma posição para frente. | Movimentação para frente |
| `tras()` | Move o personagem uma posição para trás. | Movimentação para trás |
| `direita()` | Move o personagem uma posição para a direita. | Movimentação para direita |
| `esquerda()` | Move o personagem uma posição para a esquerda. | Movimentação para esquerda |

## 3.3 Regras da sintaxe

| ID | Regra | Descrição |
|---|---|---|
| **S01** | Início obrigatório | Todo programa deve iniciar com `inicio`. |
| **S02** | Fim obrigatório | Todo programa deve terminar com `fim`. |
| **S03** | Comandos válidos | Somente os comandos definidos pela aplicação poderão ser executados. |
| **S04** | Parênteses | Os comandos de movimentação devem possuir `()` após o nome do comando. |
| **S05** | Uma instrução por linha | Cada comando deverá ser escrito individualmente em uma linha. |
| **S06** | Ordem de execução | Os comandos deverão ser executados na mesma ordem em que aparecem no programa. |
| **S07** | Sensibilidade à sintaxe | Comandos escritos de forma diferente da sintaxe definida deverão ser considerados inválidos. |

## 3.4 Exemplo válido

```text
inicio
    frente()
    frente()
    direita()
    esquerda()
fim
```

## 3.5 Exemplo inválido

```text
inicio
    andar()
    frente
    direita()
fim
```

Nesse exemplo:

| Linha | Código | Problema |
|---|---|---|
| 2 | `andar()` | O comando não está definido na sintaxe da aplicação. |
| 3 | `frente` | O comando não possui a sintaxe esperada `frente()`. |
| 4 | `direita()` | Comando válido. |

---

# 4. Requisitos Não Funcionais

Os requisitos não funcionais definem características de qualidade, restrições e condições de operação do sistema.

| ID | Nome | Descrição | Prioridade | Categoria | Critério de Aceitação |
|---|---|---|---|---|---|
| **RNF01** | Compatibilidade | A aplicação deverá funcionar nos principais navegadores modernos para desktop. | Alta | Compatibilidade | As funcionalidades principais devem funcionar corretamente nos navegadores modernos suportados pelo projeto. |
| **RNF02** | Usabilidade | A interface deverá apresentar de forma clara o cenário, o editor de código, os comandos disponíveis e o resultado da execução. | Alta | Usabilidade | O usuário deve conseguir identificar e acessar esses elementos sem necessidade de configurações adicionais. |
| **RNF03** | Feedback | A aplicação deverá fornecer mensagens claras para erros de sintaxe e movimentos inválidos. | Alta | Usabilidade | Quando ocorrer um erro, uma mensagem deverá ser apresentada explicando o problema de forma compreensível. |
| **RNF04** | Desempenho | A interpretação e execução de programas simples deverão ocorrer sem atrasos perceptíveis para o usuário. | Média | Desempenho | Programas dentro dos limites definidos pelo sistema devem ser processados sem atraso perceptível durante seu uso normal. |
| **RNF05** | Testabilidade | As principais regras de interpretação, movimentação e validação deverão possuir testes automatizados. | Alta | Manutenibilidade | As funcionalidades críticas de interpretação, movimentação e validação deverão possuir testes automatizados. |
| **RNF06** | Segurança | Informações de autenticação e credenciais não deverão ser armazenadas diretamente pela aplicação. | Alta | Segurança | O sistema deverá utilizar o mecanismo de autenticação fornecido pelo provedor Google, sem armazenar diretamente as credenciais do usuário. |
| **RNF07** | Manutenibilidade | A lógica de interpretação do código deverá ser separada da interface gráfica, permitindo a realização de testes automatizados de forma independente. | Alta | Manutenibilidade | O interpretador deverá poder ser testado independentemente dos componentes da interface gráfica. |

---

# 5. Prioridades dos Requisitos

A prioridade dos requisitos será classificada utilizando três níveis.

| Prioridade | Descrição |
|---|---|
| **Alta** | Requisito essencial para o funcionamento do sistema ou para sua principal finalidade. |
| **Média** | Requisito importante, mas cuja ausência não impede o funcionamento básico do sistema. |
| **Baixa** | Requisito desejável que pode ser implementado posteriormente sem comprometer as funcionalidades principais. |

---

# 6. Rastreabilidade dos Requisitos

A matriz de rastreabilidade relaciona os requisitos funcionais às principais funcionalidades do sistema.

| Funcionalidade | Requisitos relacionados |
|---|---|
| Autenticação | RF01, RF02, RNF06 |
| Seleção de desafios | RF03 |
| Cenário do desafio | RF04 |
| Instruções | RF05 |
| Editor de código | RF06 |
| Execução | RF07, RF08, RF09 |
| Validação do código | RF10, RF11 |
| Movimentação | RF08, RF09, RF12 |
| Conclusão do desafio | RF13, RF14 |
| Progresso | RF15, RF16 |
| Testes | RNF05 |
| Arquitetura | RNF07 |
| Interface | RNF02, RNF03 |
| Compatibilidade | RNF01 |
| Desempenho | RNF04 |

---

# 7. Regras de Negócio

| ID | Regra | Descrição |
|---|---|---|
| **RN01** | Código válido | Somente programas que estejam de acordo com a sintaxe definida poderão ser executados. |
| **RN02** | Movimentação válida | O personagem não poderá atravessar obstáculos nem ultrapassar os limites definidos pelo cenário. |
| **RN03** | Ordem dos comandos | Os comandos serão executados na sequência em que foram escritos pelo usuário. |
| **RN04** | Conclusão | Um desafio será considerado concluído quando o personagem alcançar o objetivo definido no cenário. |
| **RN05** | Registro | Um desafio concluído deverá ser registrado no progresso do usuário. |
| **RN06** | Comandos permitidos | Apenas os comandos definidos pela versão atual da sintaxe Portugol poderão ser utilizados. |

---

# 8. Restrições do Sistema

| ID | Restrição | Descrição |
|---|---|---|
| **RE01** | Plataforma | O sistema será desenvolvido como uma aplicação web. |
| **RE02** | Autenticação | A autenticação dos usuários será realizada por meio de uma conta Google. |
| **RE03** | Sintaxe | A primeira versão utilizará apenas o subconjunto de Portugol definido neste documento. |
| **RE04** | Movimentação | A primeira versão será limitada a comandos básicos de movimentação do personagem. |
| **RE05** | Execução | O sistema não terá como objetivo executar Portugol completo, mas somente a sintaxe definida pela aplicação. |
| **RE06** | Ambiente | A aplicação será destinada inicialmente ao uso em navegadores modernos para desktop. |

---

# 9. Critérios Gerais de Aceitação

| ID | Critério |
|---|---|
| **CA01** | O usuário deve conseguir realizar autenticação utilizando uma conta Google. |
| **CA02** | O usuário autenticado deve conseguir visualizar os desafios disponíveis. |
| **CA03** | O usuário deve conseguir visualizar o cenário e as instruções do desafio. |
| **CA04** | O usuário deve conseguir escrever um programa utilizando os comandos disponíveis. |
| **CA05** | O sistema deve identificar comandos que não pertencem à sintaxe definida. |
| **CA06** | O sistema deve informar erros de sintaxe ao usuário. |
| **CA07** | O sistema deve executar os comandos válidos na ordem em que foram escritos. |
| **CA08** | O personagem não deve atravessar obstáculos ou ultrapassar os limites do cenário. |
| **CA09** | O sistema deve identificar quando o personagem atingir o objetivo. |
| **CA10** | O sistema deve informar o resultado da execução ao usuário. |
| **CA11** | O sistema deve registrar os desafios concluídos. |
| **CA12** | O usuário deve conseguir visualizar seu progresso. |
| **CA13** | As regras principais do interpretador e da movimentação devem possuir testes automatizados. |

---

# 10. Controle de Versão dos Requisitos

| Versão | Data | Descrição | Responsável |
|---|---|---|---|
| **1.0** | 28/09/2026 | Criação inicial dos requisitos do sistema. | Equipe do projeto |
