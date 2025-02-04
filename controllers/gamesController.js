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
  const { name, stock } = req.body;
  let { developer, genre } = req.body;

  developer = Array.isArray(developer) ? developer : [developer];
  genre = Array.isArray(genre) ? genre : [genre];

  const gameId = await insertGame(name, stock);

  for (const developerNames of developer) {
    let developerId = await fetchDeveloperIdByName(developerNames);
    if (!developerId) {
      developerId = await insertDeveloper(developerNames);
    }

    await insertGameDevelopers(gameId, developerId);
  }

  for (const genreNames of genre) {
    let genreId = await fetchGenreIdByName(genreNames);
    if (!genreId) {
      genreId = await insertGenre(genreNames);
    }

    await insertGameGenres(gameId, genreId);
  }

  console.log(
    `Game Added: ${name} | ${developer.join(", ")} | ${genre.join(
      ", "
    )} | ${stock}`
  );
  return res.redirect("/games/add-game");
});

export const deleteGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  await deleteGameById(gameId);
  return res.redirect("/games");
});
