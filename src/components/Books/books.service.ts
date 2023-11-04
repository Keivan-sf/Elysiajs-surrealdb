import * as BookDB from "../../database/models/book";
import { HandledError, generateDBError } from "../../lib/errorHandler";
import { areAllPropertiesUndefined } from "../../lib/objectUtils";

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
  try {
    await BookDB.createNewBook({
      hash,
      name,
      author,
      rating: -1,
    });
  } catch (err: any) {
    throw generateDBError(err.message);
  }
};

export const deleteBook = async (hash: string) => {
  return await BookDB.deleteBookViaHash(hash);
};

export const updateBook = async (
  hash: string,
  data: { name?: string; author?: string; rating?: number },
) => {
  if (areAllPropertiesUndefined(data)) {
    throw new HandledError(
      "You must at least specify one property to update",
      "VALIDATION",
      400,
    );
  }
  const result = await BookDB.updateBookViaHash(hash, data);
  if (result.length > 0) {
    return result[0];
  } else {
    throw new HandledError(
      `Record regarding ${hash} not found`,
      "NOT_FOUND",
      404,
    );
  }
};
