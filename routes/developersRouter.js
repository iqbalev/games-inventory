import { Router } from "express";
import { getDevelopers } from "../controllers/developersController.js";

const developersRouter = Router();

developersRouter.get("/", getDevelopers);

export default developersRouter;
