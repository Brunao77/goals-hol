import * as cheerio from "cheerio";
import { writeDBFile } from "../db/index.js";

const URL = { scorer: "https://es.wikipedia.org/wiki/Goleador_(f%C3%BAtbol)" };

const scrape = async (url) => {
  const res = await fetch(url);
  const html = await res.text();
  return cheerio.load(html);
};

const getScorers = async () => {
  const $ = await scrape(URL.scorer);

  const $rows = $("table tbody tr td .wikitable tbody tr");

  const DATA_SELECTORS = {
    name: { selector: 1, typeOf: "string" },
    season: { selector: 2, typeOf: "string" },
    goals: { selector: 3, typeOf: "number" },
  };

  const scorers = [];

  const scorersSelectorEntries = Object.entries(DATA_SELECTORS);

  $rows.each((index, el) => {
    if (index !== 0) {
      const scorersEntries = scorersSelectorEntries.map(
        ([key, { selector, typeOf }]) => {
          const rawValue = $(el).find("td").eq(selector).text();
          const cleanedValue = rawValue.trim();

          const value =
            typeOf === "number" ? Number(cleanedValue) : cleanedValue;
          return [key, value];
        }
      );

      const scorersFromEntries = Object.fromEntries(scorersEntries);

      scorers.push(scorersFromEntries);
    }
  });

  return scorers;
};

const getImg = async (name) => {
  const $ = await scrape(`https://es.wikipedia.org/wiki/${name}`);

  const $img = $(
    "#content #bodyContent #mw-content-text .mw-parser-output table.infobox tbody tr td.imagen a.image"
  );

  const imageURL = $img.find("img").attr("src");

  return imageURL;
};

const scorers = await getScorers();

const scorersWithImg = await Promise.all(
  scorers.map(async (scorer) => {
    const imgURL = await getImg(scorer.name);
    return { ...scorer, imgURL };
  })
);

await writeDBFile("scorers", scorersWithImg);