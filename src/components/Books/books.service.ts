import { createNewBook } from "../../database/models/book";
export const getBook = (name: string) => {
  return {
    name,
    author: "J.K Rowling",
    rating: 10,
  };
};

export const createBook = async({
  name,
  author,
}: {
  name: string;
  author: string;
}) => {
  await createNewBook({
    name,
    author,
    rating: -1,
  });
};
