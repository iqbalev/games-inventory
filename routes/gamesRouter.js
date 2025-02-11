import { Router } from "express";
import {
  getEditGame,
  getAddGame,
  getIndex,
  postAddGame,
  putEditGame,
  deleteGame,
} from "../controllers/gamesController.js";
import { validateGamesInput } from "../middlewares/inputValidation.js";

const gamesRouter = Router();

gamesRouter.get("/:gameId/edit-game", getEditGame);
gamesRouter.get("/add-game", getAddGame);
gamesRouter.get("/", getIndex);

gamesRouter.post("/add-game", validateGamesInput, postAddGame);

gamesRouter.put("/:gameId/edit-game", validateGamesInput, putEditGame);

gamesRouter.delete("/:gameId", deleteGame);

export default gamesRouter;
