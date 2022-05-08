import joi from "joi";

import db from "../db.js";

export function postBankdata(req, res) {
	const bankdataSchema = joi.object({
		email: joi.string().required(),
		password: joi.string().required(),
	});
}
