import { getDB } from "..";
const db = getDB();

export const createNewBook = async (book: {
  hash: string;
  name: string;
  author: string;
  rating: number;
}) => {
  return db.create("book", { ...book });
};

export const getBookViaHash = async (book_hash: string) => {
  const result = await db.query(`SELECT * FROM book WHERE hash="${book_hash}"`);
  return result[0];
};

export const deleteBookViaHash = async (hash: string) => {
  return await db.query(`DELETE FROM book WHERE hash="${hash}" RETURN BEFORE`);
};

export const updateBookViaHash = async (
  hash: string,
  data: { name?: string; author?: string; rating?: number },
) => {
  const set_statement = generateSetStatement(data);
  const query = `UPDATE book ${set_statement} WHERE hash="${hash}"`;
  return await db.query(query);
};

const generateSetStatement = (data: Object): string => {
  const set_statement = Object.entries(data).reduce((acc: string[], d) => {
    const needs_qoutes =
      typeof d[1] != "boolean" &&
      typeof d[1] != "number" &&
      typeof d[1] != "bigint";
    const value = needs_qoutes ? `'${d[1]}'` : d[1];
    if (d[0] && d[1]) acc.push(`${d[0]} = ${value}`);
    return acc;
  }, []);
  return "SET " + set_statement.join(", ");
};
