import { Router } from "express";
import {
  getIndex,
  getAddGenre,
  postAddGenre,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/", getIndex);
genresRouter.get("/add-genre", getAddGenre);

genresRouter.post("/add-genre", postAddGenre);

export default genresRouter;
