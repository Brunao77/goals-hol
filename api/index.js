import { Hono } from "hono";
import { cors } from "hono/cors";
import scorers from "../db/scorers.json";
import scorers_argentine_league from "../db/scorers_argentine_league.json";
import scorers_boca_juniors from "../db/scorers_boca_juniors.json";

const app = new Hono();
app.use("*", cors());

app.get("/", (ctx) => {
  return ctx.json([
    {
      endpoint: "/scorers/all",
      description: "Return the top historical scorers",
    },
    {
      endpoint: "/scorers/argentine_league",
      description: "Return the historical Argentine league scorers",
    },
    {
      endpoint: "/scorers/boca_juniors",
      description: "Return the historical Boca Juniors scorers",
    },
  ]);
});

app.get("/scorers/all", (ctx) => ctx.json(scorers));

app.get("/scorers/argentine_league", (ctx) =>
  ctx.json(scorers_argentine_league)
);

app.get("/scorers/boca_juniors", (ctx) => ctx.json(scorers_boca_juniors));

export default app;
