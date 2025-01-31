import asyncHandler from "express-async-handler";
import {
  fetchAllDevelopers,
  fetchGamesByDeveloper,
  fetchDeveloperNameById,
  insertDeveloper,
  updateDeveloper,
  deleteDeveloperById,
} from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const { developerId } = req.params;
  const developers = await fetchAllDevelopers();
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

export const getEditDeveloper = asyncHandler(async (req, res) => {
  const { developerId } = req.params;
  const nameValue = await fetchDeveloperNameById(developerId);
  const developers = await fetchAllDevelopers();
  const developer = developers.find(
    (developer) => developer.id === Number(developerId)
  );

  res.render("developers/editDeveloper", { developer, value: nameValue });
});

export const postAddDeveloper = asyncHandler(async (req, res) => {
  const { name } = req.body;
  await insertDeveloper(name);
  console.log("Developer Added:", name);
  return res.redirect("/developers/add-developer");
});

export const putEditDeveloper = asyncHandler(async (req, res) => {
  const { developerId } = req.params;
  const { name } = req.body;
  await updateDeveloper(name, developerId);
  console.log("Developer Edited:", name);
  return res.redirect("/developers");
});

export const deleteDeveloper = asyncHandler(async (req, res) => {
  const { developerId } = req.params;
  await deleteDeveloperById(developerId);
  return res.redirect("/developers");
});
