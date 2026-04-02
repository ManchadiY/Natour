import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import User from "../models/userModel";

async function createuser(req: Request, res: Response) {
  try {
    console.log("hello from create user");
    const { name, email, password, passwordConfirm } = req.body;
    console.log(req.body);
    // body should contian name ,email ,password,passwordConfirm
    // 1)check user input
    if (!name || !email || !password || !passwordConfirm) {
      res.status(400).json({
        status: "failed",
        message: "invalid data",
      });
    }
    // 2)check if user already exist
    const checkIfUserExist = await User.findOne({ email });

    if (checkIfUserExist) {
      res.status(409).json({
        status: "failed",
        message: "user already exisit",
      });
      return;
    }
    // 3)check if the password is equal to password confirm
    if (password !== passwordConfirm) {
      res.status(401).json({
        status: "failed",
        message: "password and password confirm are not same",
      });
    }
    // 4)create a user in the db
    // 4a) hash the password using the bcrp
    const hasedpassword = await bcrypt.hash(password, 12);

    // for now we are saving password without hashing
    const newUser = await User.create({
      name,
      email,
      password: hasedpassword,
      passwordConfirm: undefined,
    });

    console.log(newUser);

    res.status(201).json({
      status: "success",
      message: "development phase",
      data: newUser,
    });
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: "something went wrong",
    });
  }
}

async function login(req: Request, res: Response) {
  try {
    const { email, userpassword } = req.body;
    if (!email || !userpassword) {
      res.status(400).json({
        status: "failed",
        message: "invalid password or email",
      });
      return;
    }
    // check if user exisit
    const getuser: any = await User.findOne({ email }).select("+password");
    if (!getuser) {
      res.status(400).json({
        status: "failed",
        message: "user not found",
      });
      return;
    }

    // check password
    const verifypassword = await bcrypt.compare(userpassword, getuser.password);
    if (!verifypassword) {
      res.status(401).json({
        status: "failed",
        message: "invalid email or password",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "development phase",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "failed",
      message: "something went wrong",
    });
  }
}

export { createuser, login };
