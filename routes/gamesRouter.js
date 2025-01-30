import { Router } from "express";
import {
  getAddGame,
  getIndex,
  postAddGame,
  deleteGame,
} from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/add-game", getAddGame);
gamesRouter.get("/", getIndex);

gamesRouter.post("/add-game", postAddGame);

gamesRouter.delete("/:gameId", deleteGame);

export default gamesRouter;
