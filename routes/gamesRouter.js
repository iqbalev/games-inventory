import { Router } from "express";
import {
  getAddGame,
  getIndex,
  postAddGame,
} from "../controllers/gamesController.js";

const gamesRouter = Router();
gamesRouter.get("/add-game", getAddGame);
gamesRouter.get("/", getIndex);

gamesRouter.post("/add-game", postAddGame);

export default gamesRouter;
