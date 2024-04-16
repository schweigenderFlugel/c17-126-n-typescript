import { ModelAttributes } from "sequelize";
import { sequelize } from "../models/db/database.manager";
import { Auth, AuthModel } from "../models/db";

export class DBLoader {
  static async loadFixtures(fixture: object[], entity: string, attributes: ModelAttributes) {
  }
}