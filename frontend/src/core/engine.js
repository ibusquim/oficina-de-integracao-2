const MOVEMENTS = {
  FRENTE: { x: 0, y: -1 },
  TRAS: { x: 0, y: 1 },
  DIREITA: { x: 1, y: 0 },
  ESQUERDA: { x: -1, y: 0 }
};

function isInteger(value) {
  return Number.isInteger(value);
}

function samePosition(first, second) {
  return first.x === second.x && first.y === second.y;
}

function isInsideBoard(position, challenge) {
  return (
    position.x >= 0 &&
    position.x < challenge.width &&
    position.y >= 0 &&
    position.y < challenge.height
  );
}

function assertPosition(position, label, challenge) {
  if (
    !position ||
    !isInteger(position.x) ||
    !isInteger(position.y)
  ) {
    throw new TypeError(
      `A posição "${label}" deve ter coordenadas inteiras x e y.`
    );
  }

  if (!isInsideBoard(position, challenge)) {
    throw new RangeError(
      `A posição "${label}" está fora dos limites do cenário.`
    );
  }
}

function validateChallenge(challenge) {
  if (!challenge || typeof challenge !== "object") {
    throw new TypeError("O cenário deve ser um objeto válido.");
  }

  if (!isInteger(challenge.width) || challenge.width <= 0) {
    throw new TypeError("A largura do cenário deve ser um inteiro positivo.");
  }

  if (!isInteger(challenge.height) || challenge.height <= 0) {
    throw new TypeError("A altura do cenário deve ser um inteiro positivo.");
  }

  assertPosition(challenge.start, "inicial", challenge);
  assertPosition(challenge.goal, "objetivo", challenge);

  if (!Array.isArray(challenge.obstacles)) {
    throw new TypeError("Os obstáculos devem ser fornecidos em um array.");
  }

  const obstacleKeys = new Set();

  for (const obstacle of challenge.obstacles) {
    assertPosition(obstacle, "obstáculo", challenge);

    if (samePosition(obstacle, challenge.start)) {
      throw new Error("Um obstáculo não pode ocupar a posição inicial.");
    }

    if (samePosition(obstacle, challenge.goal)) {
      throw new Error("Um obstáculo não pode ocupar o objetivo.");
    }

    obstacleKeys.add(`${obstacle.x},${obstacle.y}`);
  }

  return obstacleKeys;
}

function createFailure(message, line, steps, position) {
  return {
    ok: false,
    completed: false,
    steps,
    finalPosition: { ...position },
    error: {
      line: Number.isInteger(line) ? line : null,
      message
    }
  };
}

/**
 * Executa uma lista de instruções já validada pelo interpretador.
 * Não manipula o DOM e não altera os argumentos recebidos.
 *
 * @param {Array<{command: string, line: number}>} instructions
 * @param {object} challenge Dados do cenário.
 * @returns {object} Resultado da execução.
 */
export function executeProgram(instructions, challenge) {
  if (!Array.isArray(instructions)) {
    throw new TypeError("As instruções devem ser fornecidas em um array.");
  }

  const obstacleKeys = validateChallenge(challenge);
  let position = { ...challenge.start };
  const steps = [];

  // Se o cenário começar com o personagem no objetivo, a missão já está concluída.
  if (samePosition(position, challenge.goal)) {
    return {
      ok: true,
      completed: true,
      steps,
      finalPosition: { ...position },
      error: null
    };
  }

  for (const instruction of instructions) {
    const command = instruction?.command;
    const line = instruction?.line;
    const movement = Object.hasOwn(MOVEMENTS, command)
      ? MOVEMENTS[command]
      : null;

    if (!movement) {
      return createFailure(
        `Instrução de movimento desconhecida: "${String(command)}".`,
        line,
        steps,
        position
      );
    }

    const from = { ...position };
    const target = {
      x: position.x + movement.x,
      y: position.y + movement.y
    };

    if (!isInsideBoard(target, challenge)) {
      return createFailure(
        "O movimento ultrapassa os limites do cenário.",
        line,
        steps,
        position
      );
    }

    if (obstacleKeys.has(`${target.x},${target.y}`)) {
      return createFailure(
        "O movimento está bloqueado por um obstáculo.",
        line,
        steps,
        position
      );
    }

    position = target;

    steps.push({
      command,
      line: Number.isInteger(line) ? line : null,
      from,
      to: { ...position }
    });

    if (samePosition(position, challenge.goal)) {
      return {
        ok: true,
        completed: true,
        steps,
        finalPosition: { ...position },
        error: null
      };
    }
  }

  return {
    ok: true,
    completed: false,
    steps,
    finalPosition: { ...position },
    error: null
  };
}
