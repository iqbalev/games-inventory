import { fetchAllGenres, insertGenre } from "../database/queries.js";

export async function getIndex(req, res) {
  const genres = await fetchAllGenres();
  res.render("genres/index", { heading: "Genres", genres });
}

export async function getAddGenre(req, res) {
  const genres = await fetchAllGenres();
  res.render("genres/addGenre", { genres });
}

export async function postAddGenre(req, res) {
  const { name } = req.body;

  await insertGenre(name);
  console.log("Genre Added:", name);
  return res.redirect("/genres/add-genre");
}
