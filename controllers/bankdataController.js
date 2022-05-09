import joi from "joi";
import dayjs from "dayjs";

import db from "../db.js";

const day = dayjs().locale("pt-br").format("DD/MM");

export async function getBankdata(req, res) {
	const { _id } = res.locals.user;
	try {
		const bankdata = await db
			.collection("bankdata")
			.find({ UserId: _id })
			.toArray();
		const user = await db.collection("users").findOne({ _id: _id });

		res.status(200).send({ bankdata, user });
	} catch (error) {
		res.status(500).send("Error creating data.");
	}
}

export async function postBankdata(req, res) {
	const { _id } = res.locals.user;
	const bankdataSchema = joi.object({
		value: joi.string().required(),
		description: joi.string().required(),
		type: joi.string().valid("withdrawn", "deposit").required(),
	});
	const { error } = bankdataSchema.validate(req.body);
	if (error) return res.sendStatus(422);

	try {
		await db.collection("bankdata").insertOne({
			...req.body,
			day: day,
			UserId: _id,
		});
		res.sendStatus(201);
	} catch (error) {
		res.status(500).send("Error creating data.");
	}
}
