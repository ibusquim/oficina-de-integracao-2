import "./styles/style.css";

import { challenge } from "./data/challenge.js";

import { parseProgram } from "./core/interpreter.js";
import { executeProgram } from "./core/engine.js";

import { initializeController } from "./ui/controller.js";

initializeController({
  challenge,

  services: {
    parseProgram,
    executeProgram
  }
});
