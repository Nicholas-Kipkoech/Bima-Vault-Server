import { config } from "dotenv";
import mongoose from "mongoose";
import oracledb from "oracledb";
config();

export class MongodbConnection {
  static async connect(dbUrl: string) {
    try {
      await mongoose.connect(dbUrl);
      console.info("connected to the database");
    } catch (error) {
      console.error("error connecting to the mongoose database", error);
    }
  }
}

//getting database connections credentials

function getDbkeys() {
  let user;
  let password;
  let connString;

  const {
    ENVIROMENT,
    MAYFAIR_DATABASE_USER,
    MAYFAIR_DATABASE_PASSWORD,
    MAYFAIR_DATABASE_CONN_STRING,
    INTRA_DATABASE_USER,
    INTRA_DATABASE_PASSWORD,
    INTRA_DATABASE_CONN_STRING,
    LOCAL_DATABASE_USER,
    LOCAL_DATABASE_PASSWORD,
    LOCAL_DATABASE_CONN_STRING,
  } = process.env;

  if (ENVIROMENT === "MAYFAIR_TEST") {
    user = MAYFAIR_DATABASE_USER;
    password = MAYFAIR_DATABASE_PASSWORD;
    connString = MAYFAIR_DATABASE_CONN_STRING;
  } else if (ENVIROMENT === "INTRA") {
    user = INTRA_DATABASE_USER;
    password = INTRA_DATABASE_PASSWORD;
    connString = INTRA_DATABASE_CONN_STRING;
  } else if (ENVIROMENT === "LOCAL") {
    user = LOCAL_DATABASE_USER;
    password = LOCAL_DATABASE_PASSWORD;
    connString = LOCAL_DATABASE_CONN_STRING;
  }
  return { user, password, connString };
}

const { user, password, connString } = getDbkeys();
// Create and export the connection pool
export const pool = oracledb.createPool({
  user: user,
  password: password,
  connectionString: connString,
  poolMin: 5,
  poolMax: 5,
  poolIncrement: 5,
});

export default pool;
