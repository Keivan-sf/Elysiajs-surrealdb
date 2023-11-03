import Elysia, { t } from "elysia";
import * as Service from "./books.service";

export const route = (app: Elysia) => {
  app.get("/book/:hash", async ({ params, set }) => {
    const res = await Service.getBook(params.hash);
    if (res) {
      return { data: res, success: true };
    }
    set.status = 404;
    return { error: "not_found", success: false };
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
