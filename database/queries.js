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

export async function fetchDeveloperNameById(developer_id) {
  const { rows } = await pool.query(
    "SELECT name FROM developers WHERE id = $1",
    [developer_id]
  );

  if (rows.length > 0) {
    return rows[0].name;
  }
  return null;
}

export async function fetchGenreNameById(genre_id) {
  const { rows } = await pool.query("SELECT name FROM genres WHERE id = $1", [
    genre_id,
  ]);

  if (rows.length > 0) {
    return rows[0].name;
  }
  return null;
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

export async function fetchGamesByDeveloper(developer_id) {
  const { rows } = await pool.query(
    `
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
    WHERE developers.id = $1
    GROUP BY games.id
    ORDER BY games.name ASC
  `,
    [developer_id]
  );

  return rows;
}

export async function fetchGamesByGenre(genre_id) {
  const { rows } = await pool.query(
    `
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
    WHERE genres.id = $1
    GROUP BY games.id
    ORDER BY games.name ASC
  `,
    [genre_id]
  );

  return rows;
}

export async function fetchTotalDevelopers() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM developers");
  return rows[0].count;
}

export async function fetchTotalGenres() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM genres");
  return rows[0].count;
}

export async function fetchTotalGames() {
  const { rows } = await pool.query("SELECT COUNT(*) FROM games");
  return rows[0].count;
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

export async function updateDeveloper(name, developer_id) {
  await pool.query("UPDATE developers SET name = $1 WHERE id = $2", [
    name,
    developer_id,
  ]);
}

export async function updateGenre(name, genreId) {
  await pool.query("UPDATE genres SET name = $1 WHERE id = $2", [
    name,
    genreId,
  ]);
}

export async function deleteDeveloperById(developer_id) {
  await pool.query("DELETE FROM developers WHERE id = $1", [developer_id]);
}

export async function deleteGenreById(genre_id) {
  await pool.query("DELETE FROM genres WHERE id = $1", [genre_id]);
}

export async function deleteGameById(game_id) {
  await pool.query("DELETE FROM games WHERE id = $1", [game_id]);
}
