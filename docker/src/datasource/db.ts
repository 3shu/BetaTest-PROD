import { DataSource } from "typeorm";
import { PG_HOST, PG_USER, PG_PASS, PG_DATABASE, PG_PORT } from "../config/config";
import { User } from "../entities/User";
import { Person } from "../entities/Person";
import { Assets } from "../entities/Assets";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: PG_HOST,
  port: PG_PORT,
  username: PG_USER,
  password: PG_PASS,
  database: PG_DATABASE,
  synchronize: true,
//   logging: true,
  entities: [User,Person,Assets],
});