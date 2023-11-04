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
  return await db.query(`DELETE FROM book WHERE hash="${hash}"`);
};
