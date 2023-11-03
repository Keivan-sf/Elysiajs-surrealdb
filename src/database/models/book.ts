import { getDB } from "..";
const db = getDB();

export const createNewBook = async(book: {
  name: string;
  author: string;
  rating: number;
}) => {
  return db.create("book", book);
};
