import Elysia from "elysia";
import * as Service from "./books.service";

export const route = (app: Elysia) => {
  app.get("/book/:name", ({ params }) => {
    return Service.getBook(params.name);
  });
};
