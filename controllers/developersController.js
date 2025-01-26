import { fetchDevelopers } from "../database/queries.js";

export async function getDevelopers(req, res) {
  const developers = await fetchDevelopers();
  res.render("developers/index", { heading: "Developers", developers });
}
