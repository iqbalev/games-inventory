import asyncHandler from "express-async-handler";
import { fetchAllDevelopers, insertDeveloper } from "../database/queries.js";

export const getIndex = asyncHandler(async (req, res) => {
  const developers = await fetchAllDevelopers();
  res.render("developers/index", { heading: "Developers", developers });
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
