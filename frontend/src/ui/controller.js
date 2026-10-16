import { renderBoard } from "./renderBoard.js";

const COMMAND_LABELS = {
  FRENTE: "frente()",
  TRAS: "tras()",
  DIREITA: "direita()",
  ESQUERDA: "esquerda()"
};

function getElement(id) {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(
      `Elemento obrigatório não encontrado: #${id}`
    );
  }

  return element;
}

function wait(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

function formatError(error, fallbackMessage) {
  const message =
    typeof error?.message === "string" && error.message.length > 0
      ? error.message
      : fallbackMessage;

  if (Number.isInteger(error?.line)) {
    return `Linha ${error.line}: ${message}`;
  }

  return message;
}

export function initializeController({
  challenge,
  services = null
}) {
  const elements = {
    title: getElement("challenge-title"),
    description: getElement("challenge-description"),
    boardSize: getElement("board-size"),
    board: getElement("game-board"),
    status: getElement("status-pill"),
    message: getElement("result-message"),
    commandList: getElement("command-list"),
    editor: getElement("code-editor"),
    runButton: getElement("run-button"),
    resetButton: getElement("reset-button"),
    executionLog: getElement("execution-log")
  };

  let currentPosition = { ...challenge.start };
  let activeRunId = 0;
  let isRunning = false;

  function setStatus(type, label) {
    elements.status.className =
      `status-pill status-pill--${type}`;

    elements.status.textContent = label;
  }

  function showMessage(type, text) {
    elements.message.className = `message message--${type}`;
    elements.message.textContent = text;
    elements.message.hidden = false;
  }

  function clearMessage() {
    elements.message.textContent = "";
    elements.message.className = "message message--hidden";
    elements.message.hidden = true;
  }

  function clearExecutionLog() {
    elements.executionLog.replaceChildren();
  }

  function addLogEntry(step) {
    const entry = document.createElement("li");
    entry.className = "execution-log__entry";

    const command =
      COMMAND_LABELS[step.command] ?? String(step.command);

    const line =
      Number.isInteger(step.line)
        ? `Linha ${step.line}: `
        : "";

    entry.textContent =
      `${line}${command} → (${step.to.x}, ${step.to.y})`;

    elements.executionLog.appendChild(entry);
  }

  function setBusy(busy) {
    isRunning = busy;

    elements.runButton.disabled = busy;
    elements.editor.disabled = busy;

    elements.runButton.textContent = busy
      ? "Executando..."
      : "Executar programa";
  }

  function drawBoard() {
    renderBoard(
      elements.board,
      challenge,
      currentPosition
    );
  }

  function renderCommands() {
    elements.commandList.replaceChildren();

    for (const command of challenge.commands) {
      const item = document.createElement("div");
      item.className = "command-item";

      const name = document.createElement("code");
      name.className = "command-item__name";
      name.textContent = command.name;

      const description = document.createElement("span");
      description.className = "command-item__description";
      description.textContent = command.description;

      item.append(name, description);
      elements.commandList.appendChild(item);
    }
  }

  function resetScenario() {
    // Invalida uma execução anterior, caso ainda esteja aguardando.
    activeRunId += 1;

    currentPosition = { ...challenge.start };

    setBusy(false);
    drawBoard();
    clearMessage();
    clearExecutionLog();
    setStatus("ready", "Pronto");
  }

  async function runProgram() {
    if (isRunning) {
      return;
    }

    const runId = ++activeRunId;

    clearMessage();
    clearExecutionLog();

    currentPosition = { ...challenge.start };
    drawBoard();

    if (
      !services ||
      typeof services.parseProgram !== "function" ||
      typeof services.executeProgram !== "function"
    ) {
      setStatus("pending", "Núcleo pendente");

      showMessage(
        "info",
        "A interface está pronta. A execução será habilitada " +
          "quando o interpretador e o motor do Igor forem integrados."
      );

      return;
    }

    setBusy(true);
    setStatus("running", "Validando");

    try {
      // 1. Analisa o código escrito no editor.
      const parsed = services.parseProgram(
        elements.editor.value
      );

      if (!parsed || parsed.ok !== true) {
        const errors = Array.isArray(parsed?.errors)
          ? parsed.errors
          : parsed?.error
            ? [parsed.error]
            : [];

        const firstError = errors[0] ?? null;

        showMessage(
          "error",
          formatError(
            firstError,
            "O programa contém um erro de sintaxe."
          )
        );

        setStatus("error", "Erro no código");
        return;
      }

      if (!Array.isArray(parsed.instructions)) {
        throw new Error(
          "O interpretador retornou instruções em formato inválido."
        );
      }

      // 2. Executa a sequência no motor, sem manipular o HTML.
      const outcome = services.executeProgram(
        parsed.instructions,
        challenge
      );

      if (!outcome || !Array.isArray(outcome.steps)) {
        throw new Error(
          "O motor não retornou a sequência de passos esperada."
        );
      }

      setStatus("running", "Executando");

      // 3. Apresenta, uma a uma, as etapas válidas da execução.
      for (const step of outcome.steps) {
        await wait(250);

        // Uma reinicialização invalida a execução anterior.
        if (runId !== activeRunId) {
          return;
        }

        if (
          !step.to ||
          !Number.isInteger(step.to.x) ||
          !Number.isInteger(step.to.y)
        ) {
          throw new Error(
            "O motor retornou uma posição inválida."
          );
        }

        currentPosition = {
          x: step.to.x,
          y: step.to.y
        };

        drawBoard();
        addLogEntry(step);
      }

      if (runId !== activeRunId) {
        return;
      }

      if (outcome.finalPosition) {
        currentPosition = {
          x: outcome.finalPosition.x,
          y: outcome.finalPosition.y
        };

        drawBoard();
      }

      // 4. Apresenta o resultado da execução.
      if (outcome.error) {
        showMessage(
          "error",
          formatError(
            outcome.error,
            "A execução foi interrompida por um movimento inválido."
          )
        );

        setStatus("error", "Execução interrompida");
      } else if (outcome.completed) {
        showMessage(
          "success",
          "Parabéns! Você alcançou o objetivo do desafio."
        );

        setStatus("success", "Desafio concluído");
      } else {
        showMessage(
          "info",
          "Programa executado, mas o objetivo não foi alcançado. " +
            "Revise os comandos e tente novamente."
        );

        setStatus("ready", "Não concluído");
      }
    } catch (error) {
      if (runId !== activeRunId) {
        return;
      }

      console.error("Falha na execução do MoveCode:", error);

      showMessage(
        "error",
        "Não foi possível executar o programa. " +
          "Verifique a integração dos componentes e tente novamente."
      );

      setStatus("error", "Falha na execução");
    } finally {
      if (runId === activeRunId) {
        setBusy(false);
      }
    }
  }

  // Dados do desafio e conteúdo inicial do editor.
  elements.title.textContent = challenge.title;
  elements.description.textContent = challenge.description;

  elements.boardSize.textContent =
    `${challenge.width} × ${challenge.height}`;

  elements.editor.value = challenge.initialCode;

  renderCommands();
  drawBoard();

  // Eventos da interface.
  elements.runButton.addEventListener("click", () => {
    void runProgram();
  });

  elements.resetButton.addEventListener(
    "click",
    resetScenario
  );

  elements.editor.addEventListener("keydown", (event) => {
    // Ctrl+Enter no Windows/Linux e Cmd+Enter no macOS.
    if (
      event.key === "Enter" &&
      (event.ctrlKey || event.metaKey)
    ) {
      event.preventDefault();
      void runProgram();
      return;
    }

    // Permite inserir quatro espaços ao pressionar Tab.
    if (event.key === "Tab" && !event.shiftKey) {
      event.preventDefault();

      const start = elements.editor.selectionStart;
      const end = elements.editor.selectionEnd;

      elements.editor.setRangeText(
        "    ",
        start,
        end,
        "end"
      );
    }
  });

  setStatus("ready", "Pronto");
  clearMessage();
  clearExecutionLog();
}
