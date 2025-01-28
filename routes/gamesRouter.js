import { Router } from "express";
import {
  getIndex,
  getAddGame,
  postAddGame,
} from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/", getIndex);
gamesRouter.get("/add-game", getAddGame);

gamesRouter.post("/add-game", postAddGame);

export default gamesRouter;
