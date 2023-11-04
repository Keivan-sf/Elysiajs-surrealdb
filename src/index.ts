import { Elysia } from "elysia";
import * as DB from "./database";
import * as Books from "./components/Books/books.controller";
import { HandledError } from "./lib/errorHandler";
const PORT = process.env.PORT ? +process.env.PORT : 3002;

await DB.initialize();
const app = new Elysia();

app.onError(({ error, code, set }) => {
  const elysia_errors = ["NOT_FOUND", "VALIDATION", "PARSE"];
  if (elysia_errors.includes(code.toUpperCase())) {
    return { success: false, error: error.message };
  }
  if ((code as string) == "HandledError") {
    let err = error as HandledError;
    set.status = err.http_status;
    return { success: false, error: err.message };
  }

  console.dir(error, code);
  set.status = 500;
  return { success: false, error: "An unexpected error occurred" };
});

Books.route(app);
app.listen(PORT);

console.log(`App is running on ${app.server?.hostname}:${app.server?.port}`);
