import { Request, Response } from "express";
import { AppDataSource } from "../datasource/db";
import { validate } from "class-validator";
import { User } from "../entities/User";
import logger from "../utils/logger";
const userRepository = AppDataSource.getRepository(User);


class UserController {

    static getUsers = async (req: Request, res: Response) => {
      try {
        const users = await userRepository.find();
        return res.json(users);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };


    static getUser = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await userRepository.findOneBy({ id: parseInt(id) });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.json(user);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
    };

    static createUser = async (
    req: Request,
    res: Response
    ) => {
    let { username, password, role } = req.body;
    const user = new User();
    user.username = username;
    user.password = password;
    user.role = role;
    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      logger.error(errors);
      res.status(400).send(errors);
      return;
    }
      //Hash the password, to securely store on DB
      user.hashPassword();
      try {
      await userRepository.save(user);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        return res.status(409).json({ message: error.message });
      }
    }
    return res.status(201).send("User created");
    };

    static updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { username, role } = req.body;

    try {
      const user = await userRepository.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "Not user found" });
      //Validate the new values on model
      user.username = username;
      user.role = role;
      const errors = await validate(user);
      if (errors.length > 0) {
        logger.error(errors);
        res.status(400).send(errors);
        return;
      }
      await userRepository.update({ id: parseInt(id) }, req.body);

      //After all send a 204 (no content, but accepted) response
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
    };

    static deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const user = await userRepository.findOneBy({ id: parseInt(id) });
      if (!user) return res.status(404).json({ message: "User not found" });
      await userRepository.delete({ id: parseInt(id) });
      return res.sendStatus(204);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
    };
};

export default UserController;