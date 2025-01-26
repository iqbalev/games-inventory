import pool from "./pool.js";

export async function fetchDevelopers() {
  const { rows } = await pool.query("SELECT * FROM developers");
  return rows;
}

export async function fetchGenres() {
  const { rows } = await pool.query("SELECT * FROM genres");
  return rows;
}

export async function fetchGames() {
  const { rows } = await pool.query(`
    SELECT
      games.id,
      games.name,
      developers.name AS developer_name,
      genres.name AS genre_name,
      games.stock
    FROM games
    JOIN developers ON games.developer_id = developers.id
    JOIN genres ON games.genre_id = genres.id
  `);

  return rows;
}
