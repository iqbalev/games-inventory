import { Router } from "express";
import {
  getAddGenre,
  getIndex,
  postAddGenre,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/add-genre", getAddGenre);
genresRouter.get("/:genreId", getIndex);
genresRouter.get("/", getIndex);

genresRouter.post("/add-genre", postAddGenre);

export default genresRouter;
