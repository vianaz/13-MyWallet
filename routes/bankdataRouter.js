import { Router } from "express";

import {
	getBankdata,
	postBankdata,
} from "../controllers/bankdataController.js";
import { validateToken } from "../middlewares/tokenMiddleware.js";

const bankdataRouter = Router();

bankdataRouter.use(validateToken);

bankdataRouter.post("/transition", postBankdata);
bankdataRouter.get("/transition", getBankdata);

export default bankdataRouter;
