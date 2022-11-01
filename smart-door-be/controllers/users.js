import { UserModel } from "../models/UserModel.js";
import Joi from "joi";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const validRegisterUserSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),

  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  avatarURL: Joi.string(),
  role: Joi.string().required(),
});

const validLoginUserSchema = Joi.object({
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required(),
});

// TODO: Permission for admin
export const createAccount = async (req, res) => {
  // Validate user input
  try {
    const validation = await validRegisterUserSchema.validateAsync(req.body);
  } catch (err) {
    res.status(500).json({ err: err.details[0].message });
  }

  // Checking if email is in database
  const newAccount = req.body;
  const emailExist = await UserModel.findOne({ email: newAccount.email });
  if (emailExist) return res.status(400).json({ err: "Email already existed" });

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newAccount.password, salt);

    const user = new UserModel({
      ...newAccount,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};


// Todo: Permission for admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.send(users);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export const loginAccount = async (req, res) => {
  // Validation
  try {
    const validation = await validLoginUserSchema.validateAsync(req.body);
  } catch (err) {
    res.status(500).json({ err: err.details[0].message });
  }

  // Authenticate
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ err: "Email not found" });
    }

    // Check password correct:
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).json({ err: "Invalid password" });
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: 60 * 60 * 24,
    });
    res.header("auth-token", token).send(token);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};
