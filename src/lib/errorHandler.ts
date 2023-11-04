type DBErrorCode = "NOT_FOUND" | "DUPLICATE_RECORD";
const DBErrorHTTPStatus: { [key in DBErrorCode]: number } = {
  NOT_FOUND: 404,
  DUPLICATE_RECORD: 400,
};

class DBError extends Error {
  constructor(
    public original_message: string,
    public code: DBErrorCode,
    user_message: string,
  ) {
    super(user_message);
  }

  public getHttpStatus() {
    return DBErrorHTTPStatus[this.code];
  }
}

export const generateDBError = (message: string) => {
  const raw_erorr = getRawError(message);
  const duplicateError = parseDuplicateError(raw_erorr);
  if (duplicateError) {
    return new DBError(
      raw_erorr,
      "DUPLICATE_RECORD",
      `Duplicate entity for ${duplicateError.cause}`,
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
