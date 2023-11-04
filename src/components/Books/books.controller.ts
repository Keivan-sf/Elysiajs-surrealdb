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
    async ({ body, set }) => {
      await Service.createBook({ name: body.name, author: body.author });
      set.status = 201;
      return { success: true };
    },
    {
      body: t.Object({
        name: t.String(),
        author: t.String(),
      }),
    },
  );

  app.delete("/book/:hash", async ({ params, set }) => {
    await Service.deleteBook(params.hash);
    return { success: true };
  });
};
