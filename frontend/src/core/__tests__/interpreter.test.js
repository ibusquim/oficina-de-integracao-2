import { describe, expect, it } from "vitest";
import { parseProgram } from "../interpreter.js";

describe("parseProgram", () => {
  it("converte comandos válidos para instruções internas", () => {
    const result = parseProgram(
      "inicio\n    frente()\n    direita()\n    tras()\n    esquerda()\nfim"
    );

    expect(result).toEqual({
      ok: true,
      instructions: [
        { command: "FRENTE", line: 2 },
        { command: "DIREITA", line: 3 },
        { command: "TRAS", line: 4 },
        { command: "ESQUERDA", line: 5 }
      ]
    });
  });

  it("permite linhas vazias e espaços externos", () => {
    const result = parseProgram(
      "\n  inicio  \n\n   frente()   \n\n fim  \n"
    );

    expect(result).toEqual({
      ok: true,
      instructions: [{ command: "FRENTE", line: 4 }]
    });
  });

  it("preserva a numeração original das linhas", () => {
    const result = parseProgram(
      "inicio\n\nfrente()\n\ndireita()\nfim"
    );

    expect(result.ok).toBe(true);
    expect(result.instructions).toEqual([
      { command: "FRENTE", line: 3 },
      { command: "DIREITA", line: 5 }
    ]);
  });

  it("aceita quebras de linha do Windows", () => {
    const result = parseProgram("inicio\r\nfrente()\r\nfim");

    expect(result).toEqual({
      ok: true,
      instructions: [{ command: "FRENTE", line: 2 }]
    });
  });

  it("rejeita valores que não sejam texto", () => {
    const result = parseProgram(null);

    expect(result.ok).toBe(false);
    expect(result.errors[0]).toEqual({
      line: 1,
      message: "O código do programa deve ser um texto."
    });
  });

  it("rejeita um programa vazio", () => {
    const result = parseProgram("\n   \n");

    expect(result.ok).toBe(false);
    expect(result.errors[0].line).toBe(1);
    expect(result.errors[0].message).toContain("vazio");
  });

  it("exige inicio como primeiro elemento não vazio", () => {
    const result = parseProgram("frente()\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors.some((error) => error.message.includes("começar")))
      .toBe(true);
  });

  it("exige fim como último elemento não vazio", () => {
    const result = parseProgram("inicio\nfrente()");

    expect(result.ok).toBe(false);
    expect(result.errors.some((error) => error.message.includes("terminar")))
      .toBe(true);
  });

  it("rejeita programa sem comandos", () => {
    const result = parseProgram("inicio\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors[0].message).toContain("ao menos um comando");
  });

  it("rejeita comandos desconhecidos", () => {
    const result = parseProgram("inicio\nandar()\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors).toContainEqual({
      line: 2,
      message: 'Comando inválido: "andar()". Use frente(), tras(), direita() ou esquerda().'
    });
  });

  it("rejeita comando sem parênteses e informa a linha", () => {
    const result = parseProgram("inicio\nfrente\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors[0].line).toBe(2);
    expect(result.errors[0].message).toContain('"frente"');
  });

  it("diferencia letras maiúsculas e minúsculas", () => {
    const result = parseProgram("inicio\nFrente()\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors[0].line).toBe(2);
  });

  it("rejeita inicio repetido dentro do programa", () => {
    const result = parseProgram("inicio\nfrente()\ninicio\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors.some((error) => error.message.includes("só pode aparecer")))
      .toBe(true);
  });

  it("rejeita fim antes da última linha não vazia", () => {
    const result = parseProgram("inicio\nfim\nfrente()\nfim");

    expect(result.ok).toBe(false);
    expect(result.errors.some((error) => error.message.includes("deve encerrar")))
      .toBe(true);
  });

  it("não retorna instruções executáveis quando há erros", () => {
    const result = parseProgram("inicio\nfrente()\nandar()\nfim");

    expect(result.ok).toBe(false);
    expect(result).not.toHaveProperty("instructions");
    expect(result.errors).toHaveLength(1);
  });
});
