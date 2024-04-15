import { Router, Request } from "express";
import { DBLoader } from "./db.loader";
import { TableName } from "sequelize";

const router = Router();

interface ILoader {
  fixtures: object[],
  tableName: TableName,
}

router.post('/loader', (req: Request) => {
  const loader: ILoader = req.body;
  DBLoader.loadFixtures(loader.fixtures, loader.tableName)
})