import { Router } from "express";

import {
	getBankdata,
	postBankdata,
} from "../controllers/bankdataController.js";
import validateToken from "../middlewares/tokenMiddleware.js";

const bankdataRouter = Router();

bankdataRouter.post("/transition", validateToken, postBankdata);
bankdataRouter.get("/transition", validateToken, getBankdata);

export default bankdataRouter;
