import { Surreal } from "surrealdb.node";

export class DBConnection {
  public db = new Surreal();
  public initialized: boolean = false;

  public async initialize() {
    this.initialized = true;
    console.log("connecting to 0.0.0.0");
    if (!process.env.SURREAL_URI)
      throw new Error("missing SURREAL_URI env variable");
    await this.db.connect(process.env.SURREAL_URI);
    await this.db.signin({
      username: process.env.SURREAL_USER,
      password: process.env.SURREAL_PASS,
    });
    await this.db.use({ ns: "test", db: "testdb" });
    console.log("connected");
  }
}

const dbc = new DBConnection();
export const initialize = async () => {
  await dbc.initialize();
};
export const getDB = () => {
  return dbc.db;
};
