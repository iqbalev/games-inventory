import asyncHandler from "express-async-handler";
import {
  fetchAllDevelopers,
  fetchGamesByDeveloper,
  fetchDeveloperNameById,
  insertDeveloper,
  updateDeveloper,
  deleteDeveloperById,
} from "../database/queries.js";
import { validationResult } from "express-validator";

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
  res.render("developers/addDeveloper", { errors: [] });
});

export const getEditDeveloper = asyncHandler(async (req, res) => {
  const { developerId } = req.params;
  const nameValue = await fetchDeveloperNameById(developerId);
  const developers = await fetchAllDevelopers();
  const developer = developers.find(
    (developer) => developer.id === Number(developerId)
  );

  res.render("developers/editDeveloper", {
    errors: [],
    developer,
    value: nameValue,
  });
});

export const postAddDeveloper = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res
      .status(400)
      .render("developers/addDeveloper", { errors: errors.array() });
  }

  const { name } = req.body;
  await insertDeveloper(name);
  console.log("Developer Added:", name);

  return res.redirect("/developers/add-developer");
});

export const putEditDeveloper = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  const { developerId } = req.params;
  const nameValue = await fetchDeveloperNameById(developerId);
  const developers = await fetchAllDevelopers();
  const developer = developers.find(
    (developer) => developer.id === Number(developerId)
  );

  if (!errors.isEmpty()) {
    return res.status(400).render("developers/editDeveloper", {
      errors: errors.array(),
      developer,
      value: nameValue,
    });
  }

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
