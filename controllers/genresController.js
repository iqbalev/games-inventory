import asyncHandler from "express-async-handler";
import {
  fetchAllGenres,
  fetchGamesByGenre,
  insertGenre,
  deleteGenreById,
} from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const genres = await fetchAllGenres();

  const { genreId } = req.params;

  const genreGames = await fetchGamesByGenre(genreId);
  console.log(genreGames);
  res.render("genres/index", { heading: "Genres", genres, genreGames });
});

export const getAddGenre = asyncHandler(async (req, res) => {
  const genres = await fetchAllGenres();
  res.render("genres/addGenre", { genres });
});

export const postAddGenre = asyncHandler(async (req, res) => {
  const { name } = req.body;

  await insertGenre(name);
  console.log("Genre Added:", name);
  return res.redirect("/genres/add-genre");
});

export const deleteGenre = asyncHandler(async (req, res) => {
  const { genreId } = req.params;
  await deleteGenreById(genreId);
  return res.redirect("/genres");
});
