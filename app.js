import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
