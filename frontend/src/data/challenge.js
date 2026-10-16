export const challenge = {
  id: "introducao-01",
  title: "Primeiros movimentos",

  description:
    "Leve o robô do início até a bandeira. Cada comando " +
    "move o personagem uma célula.",

  width: 7,
  height: 5,

  start: {
    x: 0,
    y: 4
  },

  goal: {
    x: 4,
    y: 1
  },

  obstacles: [
    { x: 1, y: 0 },
    { x: 2, y: 2 },
    { x: 3, y: 2 },
    { x: 5, y: 3 }
  ],

  commands: [
    {
      name: "frente()",
      description: "Uma célula para cima."
    },
    {
      name: "tras()",
      description: "Uma célula para baixo."
    },
    {
      name: "direita()",
      description: "Uma célula para a direita."
    },
    {
      name: "esquerda()",
      description: "Uma célula para a esquerda."
    }
  ],

  initialCode: `inicio
    frente()
    frente()
    frente()
    direita()
    direita()
    direita()
    direita()
fim`
};
