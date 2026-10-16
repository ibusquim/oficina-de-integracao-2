export function renderBoard(
  boardElement,
  challenge,
  playerPosition
) {
  boardElement.replaceChildren();

  boardElement.style.gridTemplateColumns =
    `repeat(${challenge.width}, minmax(0, 1fr))`;

  boardElement.setAttribute(
    "aria-rowcount",
    String(challenge.height)
  );

  boardElement.setAttribute(
    "aria-colcount",
    String(challenge.width)
  );

  for (let y = 0; y < challenge.height; y += 1) {
    for (let x = 0; x < challenge.width; x += 1) {
      const cell = document.createElement("div");

      const isStart =
        x === challenge.start.x &&
        y === challenge.start.y;

      const isGoal =
        x === challenge.goal.x &&
        y === challenge.goal.y;

      const isPlayer =
        x === playerPosition.x &&
        y === playerPosition.y;

      const isObstacle = challenge.obstacles.some(
        (obstacle) =>
          obstacle.x === x && obstacle.y === y
      );

      cell.classList.add("cell");
      cell.setAttribute("role", "gridcell");

      if (isStart) {
        cell.classList.add("cell--start");
      }

      if (isGoal) {
        cell.classList.add("cell--goal");
      }

      if (isObstacle) {
        cell.classList.add("cell--obstacle");
      }

      if (isPlayer) {
        cell.classList.add("cell--player");
      }

      let symbol = "";
      let description = "Célula livre";

      if (isPlayer) {
        symbol = "🤖";
        description = "Personagem";
      } else if (isObstacle) {
        symbol = "🧱";
        description = "Obstáculo";
      } else if (isGoal) {
        symbol = "🏁";
        description = "Objetivo";
      } else if (isStart) {
        symbol = "S";
        description = "Posição inicial";
      }

      cell.textContent = symbol;

      cell.setAttribute(
        "aria-label",
        `Linha ${y + 1}, coluna ${x + 1}: ${description}`
      );

      boardElement.appendChild(cell);
    }
  }
}
