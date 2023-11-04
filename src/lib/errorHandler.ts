type DBErrorKey = "NOT_FOUND" | "DUPLICATE_RECORD";

export class HandledError extends Error {
  public code = "HandledError";
  constructor(
    public message: string,
    public key: string,
    public http_status: number,
  ) {
    super(message);
  }
}

export const generateDBError = (message: string) => {
  const raw_erorr = getRawError(message);
  const duplicateError = parseDuplicateError(raw_erorr);
  if (duplicateError) {
    return new HandledError(
      `Duplicate entity for ${duplicateError.cause}`,
      "DUPLICATE_RECORD",
      400,
    );
  }
};

const getRawError = (message: string) => {
  const splitter = "There was a problem with the database: ";
  const [_, ...rest] = message.split(splitter);
  return rest.join(splitter);
};

const parseDuplicateError = (error: string) => {
  const duplicateRegex =
    /Database index `(.+)` already contains '(.+)', with record `(.+)`/g;
  const match = duplicateRegex.exec(error);
  if (match) {
    return {
      index: match[1],
      cause: match[2],
      record_id: match[3],
    };
  }
};
