import { Hono } from "hono";
import { cors } from "hono/cors";
import scorers from "../db/scorers.json";
import scorers_argentine_league from "../db/scorers_argentine_league.json";
import scorers_boca_juniors from "../db/scorers_boca_juniors.json";
import scorers_river_plate from "../db/scorers_river_plate.json";
import scorers_argentine_national_team from "../db/scorers_argentine_national_team.json";
import scorers_world_cup from "../db/scorers_world_cup.json";

const app = new Hono();
app.use("*", cors());

app.get("/", (ctx) => {
  return ctx.json([
    {
      endpoint: "/scorers/all",
      description: "Return the historical scorers",
    },
    {
      endpoint: "/scorers/argentine_league",
      description: "Return the historical Argentine league scorers",
    },
    {
      endpoint: "/scorers/boca_juniors",
      description: "Return the historical Boca Juniors scorers",
    },
    {
      endpoint: "/scorers/river_plate",
      description: "Return the historical River Plate scorers",
    },
    {
      endpoint: "/scorers/argentine_national_team",
      description: "Return the historical Argentine National Team scorers",
    },
    {
      endpoint: "/scorers/world_cup",
      description: "Return the historical World Cup scorers",
    },
  ]);
});

app.get("/scorers/all", (ctx) => ctx.json(scorers));

app.get("/scorers/argentine_league", (ctx) =>
  ctx.json(scorers_argentine_league)
);

app.get("/scorers/boca_juniors", (ctx) => ctx.json(scorers_boca_juniors));

app.get("/scorers/river_plate", (ctx) => ctx.json(scorers_river_plate));

app.get("/scorers/argentine_national_team", (ctx) =>
  ctx.json(scorers_argentine_national_team)
);

app.get("/scorers/world_cup", (ctx) => ctx.json(scorers_world_cup));

export default app;
