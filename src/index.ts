import { Elysia } from "elysia";
import { getDB } from "./database";
import * as Books from "./components/Books/books.controller";

getDB();
const app = new Elysia();
Books.route(app);

app.listen(3002);
console.log(`App is running on ${app.server?.hostname}:${app.server?.port}`);
