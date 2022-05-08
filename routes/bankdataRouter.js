import { Router } from "express";

import { signIn, signUp } from "../controllers/authController.js";

const bankdataRouter = Router();

bankdataRouter.post("/sign-up", signUp);
bankdataRouter.post("/sign-in", signIn);

export default bankdataRouter;
