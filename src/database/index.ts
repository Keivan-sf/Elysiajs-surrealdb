import { Surreal } from "surrealdb.node";

export class DB {
  private db = new Surreal();
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

const db = new DB();
export const getDB = async () => {
  if (db.initialized) return db;
  await db.initialize();
  return db;
};
