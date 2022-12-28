import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppDataSource } from "../datasource/db";
import { validate } from "class-validator";
import { User } from "../entities/User";
import logger from "../utils/logger";
import {JWTSECRET} from "../config/config";

const userRepository = AppDataSource.getRepository(User);


class AuthController {

  static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).json({ message: "USername & password are required" });
    }

    //Get user from database
    try {
      let user = await userRepository.findOneBy({username});
      //Check if encrypted password match
      if (!user?.checkIfUnencryptedPasswordIsValid(password)) {
        logger.error("Invalid username or password");
        res.status(401).json({ message: "Invalid username or password" });
        return;
      }

      //Sing JWT, valid for 1 hour
      const token = jwt.sign(
        { userId: user?.id, username: user?.username },
        JWTSECRET,
        { expiresIn: "1h" }
      );

      //Send the jwt in the response
      res.status(200).json({ token });
    } catch (error) {
      logger.error(error);
      res.status(400).json({ message: "User not found" });
    }
  };

};

export default AuthController;