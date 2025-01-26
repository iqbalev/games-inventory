import { fileURLToPath } from "node:url";
import path from "node:path";
import express from "express";
import indexRouter from "./routes/indexRouter.js";
import gamesRouter from "./routes/gamesRouter.js";
import developersRouter from "./routes/developersRouter.js";
import genresRouter from "./routes/genresRouter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/games", gamesRouter);
app.use("/developers", developersRouter);
app.use("/genres", genresRouter);

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
