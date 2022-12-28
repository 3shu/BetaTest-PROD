import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import logger from "../utils/logger";
import {JWTSECRET} from "../config/config";

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  //Get the jwt token from the head
  const bearerHeader = <string>req.headers["authorization"];
  if(typeof bearerHeader !== 'undefined'){

    //split the space at the bearer
    const bearer = bearerHeader.split(' ');
    //Get token from string
    const bearerToken = bearer[1];
    // console.log(bearerToken);
    let jwtPayload;

    //Try to validate the token and get data
    try {
      jwtPayload = <any>jwt.verify(bearerToken, JWTSECRET);
      res.locals.jwtPayload = jwtPayload;
    } catch (error) {
      //If token is not valid, respond with 401 (unauthorized)
      logger.error(error);
      res.status(401).json({ message: "User not authorized" });
      return;
    }

    //The token is valid for 1 hour
    //We want to send a new token on every request
    const { userId, username } = jwtPayload;
    const newToken = jwt.sign({ userId, username }, JWTSECRET, {
      expiresIn: "1h"
    });
    res.setHeader("token", newToken);


    //next middleweare
    next();

  }else{
      //Fobidden
      res.sendStatus(403);
  }
};
