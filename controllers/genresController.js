import asyncHandler from "express-async-handler";
import { fetchAllGenres, insertGenre } from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const genres = await fetchAllGenres();
  res.render("genres/index", { heading: "Genres", genres });
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
