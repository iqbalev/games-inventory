import asyncHandler from "express-async-handler";
import {
  fetchAllDevelopers,
  fetchAllGenres,
  fetchAllGames,
  fetchDeveloperIdByName,
  fetchGenreIdByName,
  fetchGameNameById,
  fetchGameStockById,
  fetchGameDevelopersById,
  fetchGameGenresById,
  insertDeveloper,
  insertGenre,
  insertGame,
  insertGameDevelopers,
  insertGameGenres,
  updateGame,
  deleteGameById,
  deleteGameDevelopers,
  deleteGameGenres,
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

export const getEditGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  const games = await fetchAllGames();
  const gameDevelopers = await fetchGameDevelopersById(gameId);
  const gameGenres = await fetchGameGenresById(gameId);
  const developers = await fetchAllDevelopers();
  const genres = await fetchAllGenres();
  const gameValue = await fetchGameNameById(gameId);
  const stockValue = await fetchGameStockById(gameId);
  const game = games.find((game) => game.id === Number(gameId));
  res.render("games/editGame", {
    game,
    developers,
    genres,
    gameValue,
    stockValue,
    gameDevelopers,
    gameGenres,
  });
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

export const putEditGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  const { name, stock } = req.body;
  let { developer, genre } = req.body;

  await updateGame(name, stock, gameId);

  await deleteGameDevelopers(gameId);
  await deleteGameGenres(gameId);

  developer = Array.isArray(developer) ? developer : [developer];
  genre = Array.isArray(genre) ? genre : [genre];

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
    `Game Edited: ${name} | ${developer.join(", ")} | ${genre.join(
      ", "
    )} | ${stock}`
  );
  res.redirect("/games");
});

export const deleteGame = asyncHandler(async (req, res) => {
  const { gameId } = req.params;
  await deleteGameById(gameId);
  return res.redirect("/games");
});
