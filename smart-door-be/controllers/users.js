import { UserModel } from "../models/UserModel.js";
import Joi from "joi";

const validUserSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),

  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  avatarURL: Joi.string(),
  role: Joi.string().required(),
});

export const createAccount = async (req, res) => {
  // Validate user input
  try {
    const validation = await validUserSchema.validateAsync(req.body);
  } catch (err) {
    res.status(500).json({ err: err.details[0].message });
  }

  // Checking if email is in database
  const newAccount = req.body;
  const emailExist = await UserModel.findOne({ email: newAccount.email });
  if (emailExist) return res.status(400).json({ err: "Email already existed" });

  try {
    const user = new UserModel({
      ...newAccount,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
