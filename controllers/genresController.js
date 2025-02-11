import asyncHandler from "express-async-handler";
import {
  fetchAllGenres,
  fetchGamesByGenre,
  fetchGenreNameById,
  insertGenre,
  updateGenre,
  deleteGenreById,
} from "../database/queries.js";
import { validationResult } from "express-validator";

export const getIndex = asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  const genres = await fetchAllGenres();
  const genreGames = await fetchGamesByGenre(genreId);
  console.log(genreGames);

  res.render("genres/index", { heading: "Genres", genres, genreGames });
});

export const getAddGenre = asyncHandler(async (req, res) => {
  res.render("genres/addGenre", { errors: [] });
});

export const getEditGenre = asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  const nameValue = await fetchGenreNameById(genreId);
  const genres = await fetchAllGenres();
  const genre = genres.find((genre) => genre.id === Number(genreId));

  res.render("genres/editGenre", { errors: [], genre, value: nameValue });
});

export const postAddGenre = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("genres/addGenre", { errors: errors.array() });
  }

  const { name } = req.body;
  await insertGenre(name);
  console.log("Genre Added:", name);

  return res.redirect("/genres/add-genre");
});

export const putEditGenre = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  const { genreId } = req.params;
  const nameValue = await fetchGenreNameById(genreId);
  const genres = await fetchAllGenres();
  const genre = genres.find((genre) => genre.id === Number(genreId));

  if (!errors.isEmpty()) {
    return res.status(400).render("genres/editGenre", {
      errors: errors.array(),
      genre,
      value: nameValue,
    });
  }

  const { name } = req.body;
  await updateGenre(name, genreId);
  console.log("Genre Edited:", name);

  return res.redirect("/genres");
});

export const deleteGenre = asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  await deleteGenreById(genreId);

  return res.redirect("/genres");
});
