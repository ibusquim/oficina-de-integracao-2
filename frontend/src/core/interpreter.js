const COMMANDS = new Map([
  ["frente()", "FRENTE"],
  ["tras()", "TRAS"],
  ["direita()", "DIREITA"],
  ["esquerda()", "ESQUERDA"]
]);

function makeError(line, message) {
  return { line, message };
}

/**
 * Analisa o Portugol simplificado do MoveCode.
 *
 * @param {string} source Texto completo escrito pelo usuário.
 * @returns {{ok: true, instructions: Array<{command: string, line: number}>}
 *   | {ok: false, errors: Array<{line: number, message: string}>}}
 */
export function parseProgram(source) {
  if (typeof source !== "string") {
    return {
      ok: false,
      errors: [
        makeError(1, "O código do programa deve ser um texto.")
      ]
    };
  }

  // split mantém as linhas originais para que possamos informar
  // corretamente o número da linha no editor.
  const lines = source.split(/\r?\n/u);

  const nonEmptyLines = lines
    .map((raw, index) => ({
      line: index + 1,
      value: raw.trim()
    }))
    .filter((entry) => entry.value.length > 0);

  if (nonEmptyLines.length === 0) {
    return {
      ok: false,
      errors: [
        makeError(
          1,
          'O programa está vazio. Escreva "inicio", ao menos um comando e "fim".'
        )
      ]
    };
  }

  const errors = [];
  const instructions = [];
  const first = nonEmptyLines[0];
  const last = nonEmptyLines[nonEmptyLines.length - 1];

  if (first.value !== "inicio") {
    errors.push(
      makeError(first.line, 'O programa deve começar com "inicio".')
    );
  }

  if (last.value !== "fim") {
    errors.push(
      makeError(last.line, 'O programa deve terminar com "fim".')
    );
  }

  for (const entry of nonEmptyLines) {
    const { line, value } = entry;

    // O marcador inicial válido não é um comando de movimento.
    if (line === first.line && value === "inicio") {
      continue;
    }

    // Um novo "inicio" dentro do programa é inválido.
    if (value === "inicio") {
      errors.push(
        makeError(line, 'O marcador "inicio" só pode aparecer no início.')
      );
      continue;
    }

    // "fim" só pode aparecer como último elemento não vazio.
    if (value === "fim") {
      if (line !== last.line) {
        errors.push(
          makeError(line, 'O marcador "fim" deve encerrar o programa.')
        );
      }
      continue;
    }

    const command = COMMANDS.get(value);

    if (!command) {
      errors.push(
        makeError(
          line,
          `Comando inválido: "${value}". Use frente(), tras(), direita() ou esquerda().`
        )
      );
      continue;
    }

    instructions.push({ command, line });
  }

  if (errors.length === 0 && instructions.length === 0) {
    errors.push(
      makeError(last.line, "O programa deve conter ao menos um comando de movimentação.")
    );
  }

  if (errors.length > 0) {
    return {
      ok: false,
      errors
    };
  }

  return {
    ok: true,
    instructions
  };
}
