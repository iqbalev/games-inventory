import asyncHandler from "express-async-handler";
import {
  fetchAllDevelopers,
  fetchGamesByDeveloper,
  insertDeveloper,
  deleteDeveloperById,
} from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const developers = await fetchAllDevelopers();

  const { developerId } = req.params;

  const developerGames = await fetchGamesByDeveloper(developerId);
  console.log(developerGames);
  res.render("developers/index", {
    heading: "Developers",
    developers,
    developerGames,
  });
});

export const getAddDeveloper = asyncHandler(async (req, res) => {
  const developers = await fetchAllDevelopers();
  res.render("developers/addDeveloper", { developers });
});

export const postAddDeveloper = asyncHandler(async (req, res) => {
  const { name } = req.body;

  await insertDeveloper(name);
  console.log("Developer Added:", name);
  return res.redirect("/developers/add-developer");
});

export const deleteDeveloper = asyncHandler(async (req, res) => {
  const { developerId } = req.params;
  await deleteDeveloperById(developerId);
  return res.redirect("/developers");
});
