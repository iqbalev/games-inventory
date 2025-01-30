import { Router } from "express";
import {
  getAddDeveloper,
  getIndex,
  postAddDeveloper,
  deleteDeveloper,
} from "../controllers/developersController.js";

const developersRouter = Router();

developersRouter.get("/add-developer", getAddDeveloper);
developersRouter.get("/:developerId", getIndex);
developersRouter.get("/", getIndex);

developersRouter.post("/add-developer", postAddDeveloper);

developersRouter.delete("/:developerId", deleteDeveloper);

export default developersRouter;
