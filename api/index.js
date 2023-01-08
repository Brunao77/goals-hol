import { Hono } from "hono";
import { cors } from "hono/cors";
import scorers from "../db/scorers.json";
import historical_scorers_argentine from "../db/historical_scorers_argentine.json";

const app = new Hono();
app.use("*", cors());

app.get("/", (ctx) => {
  return ctx.json([
    {
      endpoint: "/scorers/all",
      description: "Return the top historical scorers",
    },
    {
      endpoint: "/scorers/argentine-league",
      description: "Return the historical scorer of the Argentine league",
    },
  ]);
});

app.get("/scorers/all", (ctx) => ctx.json(scorers));

app.get("/scorers/argentine-league", (ctx) =>
  ctx.json(historical_scorers_argentine)
);

export default app;
