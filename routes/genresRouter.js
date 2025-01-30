import { Router } from "express";
import {
  getAddGenre,
  getIndex,
  postAddGenre,
  deleteGenre,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/add-genre", getAddGenre);
genresRouter.get("/:genreId", getIndex);
genresRouter.get("/", getIndex);

genresRouter.post("/add-genre", postAddGenre);

genresRouter.delete("/:genreId", deleteGenre);

export default genresRouter;
