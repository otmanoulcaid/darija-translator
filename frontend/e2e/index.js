import { main } from "./src/main.e2e.js";

main()
  .then(() => console.log("Test accompli avec succès"))
  .catch(error => console.error("Test échoué :", error));
