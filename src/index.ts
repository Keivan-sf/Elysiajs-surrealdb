import { Elysia } from "elysia";
const app = new Elysia();
app.listen(3002);
console.log(`App is running on ${app.server?.hostname}:${app.server?.port}`);
