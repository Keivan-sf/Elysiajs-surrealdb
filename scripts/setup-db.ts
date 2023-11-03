import { Surreal } from "surrealdb.node";
const start = async () => {
  if (!process.env.SURREAL_URI)
    throw new Error("missing SURREAL_URI env variable");
  const db = new Surreal();
  await db.connect(process.env.SURREAL_URI);
  await db.signin({
    username: process.env.SURREAL_USER,
    password: process.env.SURREAL_PASS,
  });
  await db.query("DEFINE NAMESPACE test;");
  await db.use({ ns: "test" });
  await db.query("DEFINE DATABASE testdb;");
  await db.use({ db: "testdb" });
  await db.query("DEFINE TABLE book SCHEMAFUL;");
  await db.query("DEFINE FIELD name ON TABLE book TYPE string;");
  await db.query("DEFINE FIELD author ON TABLE book TYPE string;");
  await db.query("DEFINE FIELD rating ON TABLE book TYPE number;");
  await db.query("DEFINE FIELD hash ON TABLE book TYPE string;");
  await db.query(
    "DEFINE INDEX bookHashIndex ON TABLE book COLUMNS hash UNIQUE;",
  );
};

await start();
