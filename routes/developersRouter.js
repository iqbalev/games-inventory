import { Router } from "express";
import {
  getIndex,
  getAddDeveloper,
  postAddDeveloper,
} from "../controllers/developersController.js";

const developersRouter = Router();

developersRouter.get("/", getIndex);
developersRouter.get("/add-developer", getAddDeveloper);

developersRouter.post("/add-developer", postAddDeveloper);

export default developersRouter;
