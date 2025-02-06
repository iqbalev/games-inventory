import { Router } from "express";
import {
  getEditGame,
  getAddGame,
  getIndex,
  postAddGame,
  putEditGame,
  deleteGame,
} from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/:gameId/edit-game", getEditGame);
gamesRouter.get("/add-game", getAddGame);
gamesRouter.get("/", getIndex);

gamesRouter.post("/add-game", postAddGame);

gamesRouter.put("/:gameId/edit-game", putEditGame);

gamesRouter.delete("/:gameId", deleteGame);

export default gamesRouter;
