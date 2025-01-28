import { fetchAllDevelopers, insertDeveloper } from "../database/queries.js";

export async function getIndex(req, res) {
  const developers = await fetchAllDevelopers();
  res.render("developers/index", { heading: "Developers", developers });
}

export async function getAddDeveloper(req, res) {
  const developers = await fetchAllDevelopers();
  res.render("developers/addDeveloper", { developers });
}

export async function postAddDeveloper(req, res) {
  const { name } = req.body;

  await insertDeveloper(name);
  console.log("Developer Added:", name);
  return res.redirect("/developers/add-developer");
}
