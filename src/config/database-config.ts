import mongoose from "mongoose";
import oracledb from "oracledb";
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

function getDbkeys() {
  let user;
  let password;
  let connString;

  if (process.env.ENVIROMENT === "MAYFAIR_TEST") {
    user = process.env.MAYFAIR_DATABASE_USER;
    password = process.env.MAYFAIR_DATABASE_PASSWORD;
    connString = process.env.MAYFAIR_DATABASE_CONN_STRING;
  } else if (process.env.ENVIROMENT === "INTRA") {
    user = process.env.INTRA_DATABASE_USER;
    password = process.env.INTRA_DATABASE_PASSWORD;
    connString = process.env.INTRA_DATABASE_CONN_STRING;
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
