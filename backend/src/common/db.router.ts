import { Router, Request } from "express";
import { DBLoader } from "./db.loader";
import { ModelAttributes, ModelStatic } from "sequelize";
import { AuthModel } from "../models/db";
const router = Router();

interface ILoader {
  fixtures: object[]
  entity: string;
  attributes: ModelAttributes;
}

router.post('/', (req: Request) => {
  const loader: ILoader = req.body;
  DBLoader.loadFixtures(loader.fixtures, loader.entity, loader.attributes);
})

export default router;