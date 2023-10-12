import "reflect-metadata";
import * as dotenv from 'dotenv';
import path = require('path');
import { DataSource } from "typeorm";


dotenv.config({
  path: path.resolve(__dirname, '../.env')
})

/*
const getDataSource = () => {
  switch (process.env.NODE_ENV) {
    case "test":
      return TestDataSource;
    case "production":
      return ProdDataSource;
    default:
      return AppDataSource;
  }
}

export { getDataSource, AppDataSource, TestDataSource };
*/
