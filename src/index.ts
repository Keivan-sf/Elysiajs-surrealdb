import { Elysia } from "elysia";
import * as DB from "./database";
import * as Books from "./components/Books/books.controller";

await DB.initialize();
const app = new Elysia();
Books.route(app);

app.listen(3002);
console.log(`App is running on ${app.server?.hostname}:${app.server?.port}`);
