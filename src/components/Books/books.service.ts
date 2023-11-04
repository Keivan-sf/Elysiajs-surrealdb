import * as BookDB from "../../database/models/book";

export const getBook = (hash: string) => {
  return BookDB.getBookViaHash(hash);
};

export const createBook = async ({
  name,
  author,
}: {
  name: string;
  author: string;
}) => {
  const hash = name.toLowerCase().replace(/\s+/g, "-");
  await BookDB.createNewBook({
    hash,
    name,
    author,
    rating: -1,
  });
};

export const deleteBook = async (hash: string) => {
  await BookDB.deleteBookViaHash(hash);
};
