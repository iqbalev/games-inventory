import { fetchGames } from "../database/queries.js";

export async function getGames(req, res) {
  const games = await fetchGames();
  res.render("games/index", { heading: "Games", games });
}
