import { fetchGenres } from "../database/queries.js";

export async function getGenres(req, res) {
  const genres = await fetchGenres();
  res.render("genres/index", { heading: "Genres", genres });
}
