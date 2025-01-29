import asyncHandler from "express-async-handler";
import {
  fetchTotalDevelopers,
  fetchTotalGenres,
  fetchTotalGames,
} from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const totalDevelopers = await fetchTotalDevelopers();
  const totalGenres = await fetchTotalGenres();
  const totalGames = await fetchTotalGames();

  console.log("Total Developers:", totalDevelopers);
  console.log("Total Genres:", totalGenres);
  console.log("Total Games:", totalGames);

  res.render("index", {
    heading: "Home",
    totalDevelopers,
    totalGenres,
    totalGames,
  });
});
