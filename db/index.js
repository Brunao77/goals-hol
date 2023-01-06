import { writeFile, readFile } from "node:fs/promises";
import path from "node:path";

const DB_PATH = path.join(process.cwd(), "./db/");

const readDBFile = async (dbName) => {
  const file = await readFile(`${DB_PATH}/${dbName}.json`, "utf-8");
  return await JSON.parse(file);
};

export const writeDBFile = (dbName, data) => {
  return writeFile(
    `${DB_PATH}/${dbName}.json`,
    JSON.stringify(data, null, 2),
    "utf-8"
  );
};
