import { model } from "mongoose";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import { ProtectedRequest } from "../ts/types";

const getUser = async (req: ProtectedRequest, res: Response) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    debugger;
    res.status(200).json({ user });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const signin = async (req: Request, res: Response) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(422).send({ error: true, message: "missing email and/or password" });
    return;
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
      return;
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET as string;

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ email, token });
    });
  } catch (err: any) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).send({ error: true, message: "missing email and/or password" });
  }

  try {
    let user = await User.findOne({ email });
    if (!!user) {
      return res.status(400).json({ error: true, message: "email in use" });
    }

    user = new User({
      email,
      password,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    const JWT_SECRET = process.env.JWT_SECRET as string;

    jwt.sign(payload, JWT_SECRET, { expiresIn: 360000 }, (err, token) => {
      if (err) throw err;
      res.status(200).json({ token, email });
    });
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).send(error.message);
  }
};

export const userControllers = {
  getUser,
  signin,
  signup,
};
