import { Router } from "express";
import { getGames } from "../controllers/gamesController.js";

const gamesRouter = Router();

gamesRouter.get("/", getGames);

export default gamesRouter;
