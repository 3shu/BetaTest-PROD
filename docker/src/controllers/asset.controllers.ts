import { Request, Response } from "express";
import { AppDataSource } from "../datasource/db";
import { validate } from "class-validator";
import { Assets } from "../entities/Assets";
import logger from "../utils/logger";
const AssetRepository = AppDataSource.getRepository(Assets);


class AssetsController {

    static getAssets = async (req: Request, res: Response) => {
      try {
        const Assets = await AssetRepository.find();
        return res.json(Assets);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };


    static getAsset = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const Asset = await AssetRepository.findOneBy({ id: parseInt(id) });

      if (!Asset) return res.status(404).json({ message: "Assets not found" });

      return res.json(Asset);
    } catch (error) {
      if (error instanceof Error) {
        logger.error(error);
        return res.status(500).json({ message: error.message });
      }
    }
    };

    static createAssets = async (
    req: Request,
    res: Response
    ) => {
      let { title, description, personId } = req.body;
      const Asset = new Assets();
      Asset.title = title;
      Asset.description = description;
      Asset.person = personId;
      //Validade if the parameters are ok
      const errors = await validate(Asset);
      if (errors.length > 0) {
        logger.error(errors);
        res.status(400).send(errors);
        return;
      }
        try {
          await AssetRepository.save(Asset);
        } catch (error) {
          if (error instanceof Error) {
            logger.error(error);
            return res.status(409).json({ message: error.message });
          }
        }
      return res.status(201).send("Asset created");
    };

    static updateAssets = async (req: Request, res: Response) => {
      const { id } = req.params;
      const { title, description } = req.body;

      try {
        const Asset = await AssetRepository.findOneBy({ id: parseInt(id) });
        if (!Asset) return res.status(404).json({ message: "Not Asset found" });
        //Validate the new values on model
        Asset.title = title;
        Asset.description = description;
        const errors = await validate(Asset);
        if (errors.length > 0) {
          logger.error(errors);
          res.status(400).send(errors);
          return;
        }
        await AssetRepository.update({ id: parseInt(id) }, req.body);

        //After all send a 204 (no content, but accepted) response
        return res.status(204).send();
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };

    static deleteAssets = async (req: Request, res: Response) => {
      const { id } = req.params;
      try {
        const Asset = await AssetRepository.findOneBy({ id: parseInt(id) });
        if (!Asset) return res.status(404).json({ message: "Assets not found" });
        await AssetRepository.delete({ id: parseInt(id) });
        return res.sendStatus(204);
      } catch (error) {
        if (error instanceof Error) {
          logger.error(error);
          return res.status(500).json({ message: error.message });
        }
      }
    };
};

export default AssetsController;