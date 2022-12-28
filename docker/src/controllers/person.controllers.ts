import { Request, Response } from "express";
import { AppDataSource } from "../datasource/db";
import { validate } from "class-validator";
import { Person } from "../entities/Person";
import logger from "../utils/logger";
import { RelationId } from "typeorm";
const personRepository = AppDataSource.getRepository(Person);


class PersonController {

    static getPersons = async (req: Request, res: Response) => {
      try {
        // const persons = await personRepository.find();
        const persons = await personRepository.find({
          relations: ['assets'],
        })
        return res.json(persons);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };


    static getPerson = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      // const person = await personRepository.findOneBy({ id: parseInt(id) });
      const person = await personRepository.findOne({
        where: { id: parseInt(id)},
        relations: ['assets'],
      })
      if (!person) return res.status(404).json({ message: "Person not found" });

      return res.json(person);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
    };

    static createPerson = async (
    req: Request,
    res: Response
    ) => {
      let { email, firstName, lastName } = req.body;
      const person = new Person();
      person.email = email;
      person.firstName = firstName;
      person.lastName = lastName;
      //Validade if the parameters are ok
      const errors = await validate(person);
      if (errors.length > 0) {
        logger.error(errors);
        res.status(400).send(errors);
        return;
      }
        try {
          await personRepository.save(person);
        } catch (error) {
          if (error instanceof Error) {
            logger.error(error);
            return res.status(409).json({ message: error.message });
          }
        }
      return res.status(201).send("Person created");
    };

    static updatePerson = async (req: Request, res: Response) => {
      const { id } = req.params;
      const { firstName, lastName } = req.body;

      try {
        const person = await personRepository.findOneBy({ id: parseInt(id) });
        if (!person) return res.status(404).json({ message: "Not person found" });
        //Validate the new values on model
        person.firstName = firstName;
        person.lastName = lastName;
        const errors = await validate(person);
        if (errors.length > 0) {
          logger.error(errors);
          res.status(400).send(errors);
          return;
        }
        await personRepository.update({ id: parseInt(id) }, req.body);

        //After all send a 204 (no content, but accepted) response
        return res.status(204).send();
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };

    static deletePerson = async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const person = await personRepository.findOneBy({ id: parseInt(id) });
        if (!person) return res.status(404).json({ message: "Person not found" });
        await personRepository.delete({ id: parseInt(id) });
        return res.sendStatus(204);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };
};

export default PersonController;