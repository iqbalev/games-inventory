import { Router } from "express";
import {
  getEditGenre,
  getAddGenre,
  getIndex,
  postAddGenre,
  putEditGenre,
  deleteGenre,
} from "../controllers/genresController.js";

const genresRouter = Router();

genresRouter.get("/:genreId/edit-genre", getEditGenre);
genresRouter.get("/add-genre", getAddGenre);
genresRouter.get("/:genreId", getIndex);
genresRouter.get("/", getIndex);

genresRouter.post("/add-genre", postAddGenre);

genresRouter.put("/:genreId/edit-genre", putEditGenre);

genresRouter.delete("/:genreId", deleteGenre);

export default genresRouter;
