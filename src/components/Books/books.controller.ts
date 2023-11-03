import Elysia, { t } from "elysia";
import * as Service from "./books.service";

export const route = (app: Elysia) => {
  app.get("/book/:name", ({ params }) => {
    return Service.getBook(params.name);
  });
  app.post(
    "/book",
    ({ body }) => {
      Service.createBook({ name: body.name, author: body.author });
      return { success: true };
    },
    {
      body: t.Object({
        name: t.String(),
        author: t.String(),
      }),
    },
  );
};
