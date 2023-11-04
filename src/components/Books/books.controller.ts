import Elysia, { t } from "elysia";
import * as Service from "./books.service";
import { Optional } from "@sinclair/typebox";

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

  app.patch(
    "/book/:hash",
    async ({ params, body }) => {
      return await Service.updateBook(params.hash, body);
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        author: t.Optional(t.String()),
        rating: t.Optional(t.Number()),
      }),
    },
  );
};
