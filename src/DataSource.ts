import "reflect-metadata";
import * as dotenv from 'dotenv';
import path = require('path');
import { DataSource } from "typeorm";

dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

const MSSQLDataSource = new DataSource({
  type: "mssql",
  host: process.env.RDS_HOSTNAME,
  port: Number(process.env.RDS_PORT),
  username: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  synchronize: false,
  logging: true,
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
});

// const getDataSource = () => {
//   switch (process.env.APP_ENV) {
//     case "production":
//       return ProdDataSource;
//   }
// }

export { MSSQLDataSource };