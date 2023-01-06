import { Hono } from "hono";
import scorers from "../db/scorers.json";

const app = new Hono();

app.get("/", (ctx) => {
  return ctx.json([
    {
      endpoint: "scorers",
      description: "Return the top historical scorers",
    },
  ]);
});

app.get("/scorers", (ctx) => ctx.json(scorers));

export default app;
