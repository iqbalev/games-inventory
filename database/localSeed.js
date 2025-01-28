import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();

const { Client } = pkg;

const dropTables = `
  DROP TABLE IF EXISTS developers CASCADE;
  DROP TABLE IF EXISTS genres CASCADE;
  DROP TABLE IF EXISTS games CASCADE;
  DROP TABLE IF EXISTS game_developers CASCADE;
  DROP TABLE IF EXISTS game_genres CASCADE;
`;

const createTables = `
  CREATE TABLE IF NOT EXISTS developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
  );
    
  CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    stock INT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS game_developers (
    game_id INT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    developer_id INT NOT NULL REFERENCES developers(id) ON DELETE CASCADE,
    PRIMARY KEY(game_id, developer_id)
  );

  CREATE TABLE IF NOT EXISTS game_genres (
    game_id INT NOT NULL REFERENCES games(id) ON DELETE CASCADE,
    genre_id INT NOT NULL REFERENCES genres(id) ON DELETE CASCADE,
    PRIMARY KEY(game_id, genre_id)
  );
`;

const insertTables = `
  INSERT INTO developers (name) VALUES
    ('CD Projekt Red'),
    ('Bethesda Game Studios'),
    ('Konami'),
    ('ConcernedApe');

  INSERT INTO genres (name) VALUES
    ('Role-playing'),
    ('Sports'),
    ('Simulation');

  INSERT INTO games (name, stock) VALUES
    ('Cyberpunk 2077', 7),
    ('The Witcher 3', 13),
    ('TES V: Skyrim Special Edition', 20),
    ('Fallout 4', 4),
    ('eFootball PES 2021', 1),
    ('Stardew Valley', 9);

  INSERT INTO game_developers (game_id, developer_id) VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 2),
    (5, 3),
    (6, 4);

  INSERT INTO game_genres (game_id, genre_id) VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 2),
    (6, 3);
`;

async function main() {
  console.log("Seeding...");

  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@localhost:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  });
  try {
    await client.connect();
    console.log("Connected to the database.");

    await client.query(dropTables);
    console.log("Dropped existing tables.");

    await client.query(createTables);
    console.log("Created new tables.");

    await client.query(insertTables);
    console.log("Inserted initial data.");

    console.log("Seeding completed!");
  } catch (error) {
    console.error("Something went wrong during seeding...", error);
  } finally {
    await client.end();
    console.log("Database connection ended.");
  }
}

main();
