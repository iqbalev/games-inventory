import { Router } from "express";
import {
  getEditDeveloper,
  getAddDeveloper,
  getIndex,
  postAddDeveloper,
  putEditDeveloper,
  deleteDeveloper,
} from "../controllers/developersController.js";
import { validateDeveloperInput } from "../middlewares/inputValidation.js";

const developersRouter = Router();

developersRouter.get("/:developerId/edit-developer", getEditDeveloper);
developersRouter.get("/add-developer", getAddDeveloper);
developersRouter.get("/:developerId", getIndex);
developersRouter.get("/", getIndex);

developersRouter.post(
  "/add-developer",
  validateDeveloperInput,
  postAddDeveloper
);

developersRouter.put(
  "/:developerId/edit-developer",
  validateDeveloperInput,
  putEditDeveloper
);

developersRouter.delete("/:developerId", deleteDeveloper);

export default developersRouter;
