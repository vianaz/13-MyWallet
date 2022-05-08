import db from "./../db.js";
import joi from "joi";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
	const userSchema = joi.object({
		name: joi.string().required(),
		email: joi.string().email().required(),
		password: joi.string().required(),
	});
	const { error } = userSchema.validate(req.body);
	if (error) return res.sendStatus(422);

	try {
		await db.collection("users").insertOne({
			...req.body,
			password: bcrypt.hashSync(req.body.password, 10),
		});
		res.sendStatus(201);
	} catch (error) {
		res.status(500).send("Error creating user.");
	}
}

export async function signIn(req, res) {
	const userSchema = joi.object({
		email: joi.string().required(),
		password: joi.string().required(),
	});
	const { error } = userSchema.validate(req.body);
	if (error) return res.sendStatus(422);

	try {
		const user = await db
			.collection("users")
			.findOne({ email: req.body.email });
		if (!user) return res.sendStatus(404);
		if (user && bcrypt.compareSync(req.body.password, user.password)) {
			const token = uuid();
			await db.collection("sessions").insertOne({ token, userId: user._id });
			res.status(200).send(token);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		console.log(error);
		res.status(500).send("Error logging in user.");
	}
}
