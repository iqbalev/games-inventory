import dotenv, { config } from "dotenv";
import pkg from "pg";

dotenv.config();

const { Client } = pkg;

const dropTables = `
  DROP TABLE IF EXISTS developers CASCADE;
  DROP TABLE IF EXISTS genres CASCADE;
  DROP TABLE IF EXISTS games CASCADE;
`;

const createTables = `
  CREATE TABLE IF NOT EXISTS developers (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS genres (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL
  );
    
  CREATE TABLE IF NOT EXISTS games (
    id SERIAL PRIMARY KEY,
    name VARCHAR (255) NOT NULL,
    developer_id INT NOT NULL REFERENCES developers (id), 
    genre_id INT NOT NULL REFERENCES genres (id),
    stock INT NOT NULL
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

  INSERT INTO games (name, developer_id, genre_id, stock) VALUES
    ('Cyberpunk 2077', 1, 1, 80),
    ('The Witcher 3', 1, 1, 45),
    ('TES V: Skyrim Special Edition', 2, 1, 70),
    ('Fallout 4', 2, 1, 55),
    ('eFootball PES 2021', 3, 2, 120),
    ('Stardew Valley', 4, 3, 20);
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
