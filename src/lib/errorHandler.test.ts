import { describe, expect, it } from "bun:test";
import { generateDBError } from "./errorHandler";

describe("Error handler", () => {
  it("Should parse db duplicate error", () => {
    const err = new Error(
      "There was a problem with the database: Database index `bookHashIndex` already contains 'testing-name', with record `book:iyt39zaef6wkrhg2d02a`",
    );
    const parsed = generateDBError(err.message);
    expect(parsed?.http_status).toBe(400);
    expect(parsed?.key).toBe("DUPLICATE_RECORD");
    expect(parsed?.code).toBe("HandledError");
    expect(parsed?.message).toBe("Duplicate entity for testing-name");
  });
});
