import { Elysia } from "elysia";
import * as DB from "./database";
import * as Books from "./components/Books/books.controller";
const PORT = process.env.PORT ? +process.env.PORT : 3002;

await DB.initialize();
const app = new Elysia();
Books.route(app);
app.onError(({ error }) => {
  console.dir(error);
  return "internal error";
});
app.listen(PORT);

console.log(`App is running on ${app.server?.hostname}:${app.server?.port}`);
