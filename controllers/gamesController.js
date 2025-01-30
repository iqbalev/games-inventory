import asyncHandler from "express-async-handler";
import {
  fetchAllDevelopers,
  fetchAllGenres,
  fetchAllGames,
  fetchDeveloperIdByName,
  fetchGenreIdByName,
  insertDeveloper,
  insertGenre,
  insertGame,
  insertGameDevelopers,
  insertGameGenres,
  deleteGameById,
} from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const games = await fetchAllGames();
  res.render("games/index", { heading: "Games", games });
});

export const getAddGame = asyncHandler(async (req, res) => {
  const developers = await fetchAllDevelopers();
  const genres = await fetchAllGenres();
  res.render("games/addGame", { developers, genres });
});

export const postAddGame = asyncHandler(async (req, res) => {
  const { name, developer, genre, stock } = req.body;

  const gameId = await insertGame(name, stock);

  let developerId = await fetchDeveloperIdByName(developer);
  if (!developerId) {
    developerId = await insertDeveloper(developer);
  }

  await insertGameDevelopers(gameId, developerId);

  let genreId = await fetchGenreIdByName(genre);
  if (!genreId) {
    genreId = await insertGenre(genre);
  }

  await insertGameGenres(gameId, genreId);

  console.log(`Game Added: ${name} | ${developer} | ${genre} | ${stock}`);
  return res.redirect("/games/add-game");
});

export const deleteGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  await deleteGameById(gameId);
  return res.redirect("/games");
});
