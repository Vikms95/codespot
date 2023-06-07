import "dotenv/config.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt, { Secret, JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    // @ts-expect-error
    const message = result.errors[0].msg;
    return res.status(500).json({ message });
  }
  const { username, password } = req.body;
  const userExist = await User.findOne({ username });

  if (userExist) {
    return res.status(409).json({
      message: "Username already exists, please choose a different one.",
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    username,
    password: hashedPassword,
  });

  if (user) {
    user.save();
    res.status(201).json({
      _id: user.id,
      name: user.username,
    });
  } else {
    return res
      .status(400)
      .json({ message: "Something went wrong, please try again." });
  }
};

const loginUser = async (req: Request, res: Response, next: NextFunction) => {
  const results = validationResult(req);

  if (!results.isEmpty()) {
    // @ts-expect-error
    const message = results.errors[0].msg;
    return res.status(500).json({ message });
  }

  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user?.password && (await bcrypt.compare(password, user.password))) {
    jwt.sign(
      { user: user._id },
      process.env.JWT_SECRET,
      (err: any, token: any) => {
        if (err) return next(err);
        // Send the token and the user id to the front end
        return res.json({ token, user: user._id });
      }
    );
  } else {
    res
      .status(400)
      .json({ message: "Something went wrong, please try again." });
  }
};

const retrieveToken = (
  req: Request & { token: string },
  res: Response,
  next: NextFunction
) => {
  const bearerHeader = req.headers.authorization;

  if (typeof bearerHeader !== "undefined") {
    // Token is received as 'Bearer token' string, so we split the
    // authorization header at the space and retrieve the second index
    const bearerToken = bearerHeader.split(" ")[1];
    req.token = JSON.parse(bearerToken);
    next();
  } else {
    return res.status(400).json({
      message: "Something went wrong with validation, please try again.",
    });
  }
};

const verifyToken = (req: Request & { token: string }, res: Response) => {
  jwt.verify(req.token, process.env.JWT_SECRET as Secret, (err, authData) => {
    if (err) {
      return res.status(403).json({ message: "Unauthorized access." });
    } else {
      if (!authData) return;

      return res.json({
        user: (authData as JwtPayload).user,
      });
    }
  });
};

export { createUser, loginUser, retrieveToken, verifyToken };
