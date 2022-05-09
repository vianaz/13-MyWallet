import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRouter from "./routes/authRouter.js";
import bankdataRouter from "./routes/bankdataRouter.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

app.use(authRouter);

app.use(bankdataRouter);

const port = process.env.PORT;
app.listen(port, () => {
	console.log(`Server is running on port ${port}.`);
});
