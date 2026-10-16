import { describe, expect, it } from "vitest";
import { executeProgram } from "../engine.js";

function makeChallenge(overrides = {}) {
  const base = {
    width: 5,
    height: 5,
    start: { x: 2, y: 2 },
    goal: { x: 4, y: 4 },
    obstacles: []
  };

  return {
    ...base,
    ...overrides,
    start: overrides.start ?? base.start,
    goal: overrides.goal ?? base.goal,
    // Atenção: usamos "!== undefined" (e não "??") porque um valor
    // explicitamente nulo é justamente o caso do teste que verifica
    // a rejeição de uma coleção de obstáculos que não seja array.
    obstacles:
      overrides.obstacles !== undefined
        ? overrides.obstacles
        : base.obstacles
  };
}

function instruction(command, line = 1) {
  return { command, line };
}

describe("executeProgram", () => {
  it("move uma célula para frente", () => {
    const result = executeProgram(
      [instruction("FRENTE", 2)],
      makeChallenge()
    );

    expect(result.finalPosition).toEqual({ x: 2, y: 1 });
    expect(result.steps).toEqual([
      {
        command: "FRENTE",
        line: 2,
        from: { x: 2, y: 2 },
        to: { x: 2, y: 1 }
      }
    ]);
    expect(result.error).toBeNull();
    expect(result.completed).toBe(false);
  });

  it("move uma célula para trás", () => {
    const result = executeProgram(
      [instruction("TRAS")],
      makeChallenge()
    );

    expect(result.finalPosition).toEqual({ x: 2, y: 3 });
  });

  it("move uma célula para a direita", () => {
    const result = executeProgram(
      [instruction("DIREITA")],
      makeChallenge()
    );

    expect(result.finalPosition).toEqual({ x: 3, y: 2 });
  });

  it("move uma célula para a esquerda", () => {
    const result = executeProgram(
      [instruction("ESQUERDA")],
      makeChallenge()
    );

    expect(result.finalPosition).toEqual({ x: 1, y: 2 });
  });

  it("executa instruções na ordem recebida", () => {
    const result = executeProgram(
      [
        instruction("FRENTE", 2),
        instruction("DIREITA", 3),
        instruction("TRAS", 4)
      ],
      makeChallenge()
    );

    expect(result.steps.map((step) => step.to)).toEqual([
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 3, y: 2 }
    ]);
    expect(result.finalPosition).toEqual({ x: 3, y: 2 });
  });

  it("impede movimento para fora do limite superior", () => {
    const result = executeProgram(
      [instruction("FRENTE", 2)],
      makeChallenge({ start: { x: 0, y: 0 } })
    );

    expect(result.ok).toBe(false);
    expect(result.steps).toHaveLength(0);
    expect(result.finalPosition).toEqual({ x: 0, y: 0 });
    expect(result.error).toEqual({
      line: 2,
      message: "O movimento ultrapassa os limites do cenário."
    });
  });

  it("impede movimento para fora do limite esquerdo", () => {
    const result = executeProgram(
      [instruction("ESQUERDA", 3)],
      makeChallenge({ start: { x: 0, y: 2 } })
    );

    expect(result.ok).toBe(false);
    expect(result.finalPosition).toEqual({ x: 0, y: 2 });
    expect(result.error.line).toBe(3);
  });

  it("impede a entrada em um obstáculo", () => {
    const result = executeProgram(
      [instruction("DIREITA", 4)],
      makeChallenge({
        start: { x: 1, y: 1 },
        obstacles: [{ x: 2, y: 1 }]
      })
    );

    expect(result.ok).toBe(false);
    expect(result.finalPosition).toEqual({ x: 1, y: 1 });
    expect(result.steps).toHaveLength(0);
    expect(result.error).toEqual({
      line: 4,
      message: "O movimento está bloqueado por um obstáculo."
    });
  });

  it("preserva passos válidos antes de uma colisão", () => {
    const result = executeProgram(
      [
        instruction("DIREITA", 2),
        instruction("DIREITA", 3),
        instruction("DIREITA", 4)
      ],
      makeChallenge({
        start: { x: 0, y: 1 },
        goal: { x: 4, y: 4 },
        obstacles: [{ x: 2, y: 1 }]
      })
    );

    expect(result.steps).toHaveLength(1);
    expect(result.steps[0].to).toEqual({ x: 1, y: 1 });
    expect(result.finalPosition).toEqual({ x: 1, y: 1 });
    expect(result.error.line).toBe(3);
  });

  it("interrompe a execução no primeiro movimento inválido", () => {
    const result = executeProgram(
      [
        instruction("FRENTE", 2),
        instruction("FRENTE", 3),
        instruction("DIREITA", 4)
      ],
      makeChallenge({ start: { x: 0, y: 0 } })
    );

    expect(result.steps).toHaveLength(0);
    expect(result.error.line).toBe(2);
  });

  it("identifica o objetivo e encerra a sequência", () => {
    const result = executeProgram(
      [
        instruction("DIREITA", 2),
        instruction("ESQUERDA", 3)
      ],
      makeChallenge({
        start: { x: 2, y: 2 },
        goal: { x: 3, y: 2 }
      })
    );

    expect(result.ok).toBe(true);
    expect(result.completed).toBe(true);
    expect(result.steps).toHaveLength(1);
    expect(result.finalPosition).toEqual({ x: 3, y: 2 });
    expect(result.error).toBeNull();
  });

  it("retorna não concluído se as instruções terminarem antes do objetivo", () => {
    const result = executeProgram(
      [instruction("FRENTE")],
      makeChallenge()
    );

    expect(result.ok).toBe(true);
    expect(result.completed).toBe(false);
    expect(result.error).toBeNull();
  });

  it("identifica o objetivo se a posição inicial já for o objetivo", () => {
    const result = executeProgram(
      [],
      makeChallenge({
        start: { x: 2, y: 2 },
        goal: { x: 2, y: 2 }
      })
    );

    expect(result.completed).toBe(true);
    expect(result.steps).toHaveLength(0);
  });

  it("rejeita uma instrução interna desconhecida sem mover o personagem", () => {
    const result = executeProgram(
      [instruction("VOAR", 8)],
      makeChallenge()
    );

    expect(result.ok).toBe(false);
    expect(result.finalPosition).toEqual({ x: 2, y: 2 });
    expect(result.error.line).toBe(8);
    expect(result.error.message).toContain("desconhecida");
  });

  it("representa a linha como null se a instrução não tiver linha", () => {
    const result = executeProgram(
      [{ command: "DIREITA" }],
      makeChallenge()
    );

    expect(result.steps[0].line).toBeNull();
  });

  it("não altera o cenário ou as instruções recebidas", () => {
    const challenge = makeChallenge();
    const instructions = [instruction("DIREITA", 2)];
    const originalStart = { ...challenge.start };
    const originalInstructions = structuredClone(instructions);

    executeProgram(instructions, challenge);

    expect(challenge.start).toEqual(originalStart);
    expect(instructions).toEqual(originalInstructions);
  });

  it("rejeita uma lista de instruções que não seja array", () => {
    expect(() => executeProgram(null, makeChallenge())).toThrow(
      "As instruções devem ser fornecidas em um array."
    );
  });

  it("rejeita cenário ausente", () => {
    expect(() => executeProgram([], null)).toThrow(
      "O cenário deve ser um objeto válido."
    );
  });

  it("rejeita dimensões inválidas", () => {
    expect(() => executeProgram([], makeChallenge({ width: 0 }))).toThrow(
      "A largura do cenário deve ser um inteiro positivo."
    );

    expect(() => executeProgram([], makeChallenge({ height: -1 }))).toThrow(
      "A altura do cenário deve ser um inteiro positivo."
    );
  });

  it("rejeita coordenadas que não sejam inteiras", () => {
    expect(() => executeProgram([], makeChallenge({
      start: { x: 1.5, y: 0 }
    }))).toThrow("deve ter coordenadas inteiras");
  });

  it("rejeita posições e obstáculos fora da grade", () => {
    expect(() => executeProgram([], makeChallenge({
      start: { x: -1, y: 0 }
    }))).toThrow("está fora dos limites");

    expect(() => executeProgram([], makeChallenge({
      obstacles: [{ x: 8, y: 1 }]
    }))).toThrow("está fora dos limites");
  });

  it("rejeita obstáculos sobre o início ou sobre o objetivo", () => {
    expect(() => executeProgram([], makeChallenge({
      obstacles: [{ x: 2, y: 2 }]
    }))).toThrow("posição inicial");

    expect(() => executeProgram([], makeChallenge({
      obstacles: [{ x: 4, y: 4 }]
    }))).toThrow("não pode ocupar o objetivo");
  });

  it("rejeita uma coleção de obstáculos que não seja array", () => {
    expect(() => executeProgram([], makeChallenge({
      obstacles: null
    }))).toThrow("Os obstáculos devem ser fornecidos em um array.");
  });
});
