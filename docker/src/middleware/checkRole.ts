import { Request, Response, NextFunction } from "express";
import { AppDataSource } from '../datasource/db'
import logger from "../utils/logger";

import { User } from "../entities/User";
import { lookup } from "dns";

//Get user role from the database
const userRepository = AppDataSource.getRepository(User);

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    let user: User | null;
    try {
      user =  await userRepository.findOneBy({ id: parseInt(id) });
      //Check if array of authorized roles includes the user's role
      if (user?.role != null ){
          if (roles.indexOf(user.role) > -1) {
            next();
          } else {
            logger.error('No tiene rol de ADMIN');
          res.status(401).json({ message: "User not authorized" });
          }  
      }     
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error.message);
        return res.status(500).json({ message: error.message });
      }
    }
  };
};
