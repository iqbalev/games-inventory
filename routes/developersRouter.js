import { Router } from "express";
import {
  getAddDeveloper,
  getIndex,
  postAddDeveloper,
} from "../controllers/developersController.js";

const developersRouter = Router();
developersRouter.get("/add-developer", getAddDeveloper);
developersRouter.get("/", getIndex);

developersRouter.post("/add-developer", postAddDeveloper);

export default developersRouter;
