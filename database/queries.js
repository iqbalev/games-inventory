import pool from "./pool.js";

export async function fetchAllDevelopers() {
  const { rows } = await pool.query(
    "SELECT * FROM developers ORDER BY name ASC"
  );
  return rows;
}

export async function fetchAllGenres() {
  const { rows } = await pool.query("SELECT * FROM genres ORDER BY name ASC");
  return rows;
}

export async function fetchAllGames() {
  const { rows } = await pool.query(`
    SELECT
      games.id,
      games.name,
      games.stock,
      ARRAY_AGG(DISTINCT developers.name) AS developer_names,
      ARRAY_AGG(DISTINCT genres.name) AS genre_names
    FROM games
    JOIN game_developers ON games.id = game_developers.game_id
    JOIN developers ON game_developers.developer_id = developers.id
    JOIN game_genres ON games.id = game_genres.game_id
    JOIN genres ON game_genres.genre_id = genres.id
    GROUP BY games.id
    ORDER BY games.name ASC
  `);

  return rows;
}

export async function fetchDeveloperIdByName(name) {
  const { rows } = await pool.query(
    "SELECT id FROM developers WHERE name = $1",
    [name]
  );

  if (rows.length > 0) {
    return rows[0].id;
  }
  return null;
}

export async function fetchGenreIdByName(name) {
  const { rows } = await pool.query("SELECT id FROM genres WHERE name = $1", [
    name,
  ]);

  if (rows.length > 0) {
    return rows[0].id;
  }
  return null;
}

export async function insertDeveloper(name) {
  const { rows } = await pool.query(
    "INSERT INTO developers (name) VALUES ($1) RETURNING id",
    [name]
  );

  return rows[0].id;
}

export async function insertGenre(name) {
  const { rows } = await pool.query(
    "INSERT INTO genres (name) VALUES ($1) RETURNING id",
    [name]
  );

  return rows[0].id;
}

export async function insertGame(name, stock) {
  const { rows } = await pool.query(
    "INSERT INTO games (name, stock) VALUES ($1, $2) RETURNING id",
    [name, stock]
  );

  return rows[0].id;
}

export async function insertGameDevelopers(game_id, developer_id) {
  await pool.query(
    "INSERT INTO game_developers (game_id, developer_id) VALUES ($1, $2)",
    [game_id, developer_id]
  );
}

export async function insertGameGenres(game_id, genre_id) {
  await pool.query(
    "INSERT INTO game_genres (game_id, genre_id) VALUES ($1, $2)",
    [game_id, genre_id]
  );
}
