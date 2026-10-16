import "./styles/style.css";

import { challenge } from "./data/challenge.js";
import { initializeController } from "./ui/controller.js";

initializeController({
  challenge,
  services: null
});
