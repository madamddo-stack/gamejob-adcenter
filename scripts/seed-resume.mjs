import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, "../.env"), "utf-8")
    .split("\n").filter(l => l.includes("="))
    .map(l => l.split("=").map(s => s.trim()))
);

const TOKEN = env.NOTION_TOKEN;
const DB_ID = env.NOTION_DB_RESUME;
const VERSION = "2022-06-28";

async function createPage(properties) {
  const res = await fetch("https://api.notion.com/v1/pages", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": VERSION,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ parent: { database_id: DB_ID }, properties }),
  });
  const data = await res.json();
  if (data.object === "error") throw new Error(data.message);
  return data;
}

const num   = (v) => ({ number: v ?? null });
const title = (v) => ({ title: [{ text: { content: String(v ?? "") } }] });

const plans = [
  { count: 10,  days: 3,  price: 55000  },
  { count: 20,  days: 7,  price: 99000  },
  { count: 30,  days: 30, price: 148500 },
  { count: 50,  days: 30, price: 220000 },
  { count: 100, days: 30, price: 385000 },
  { count: 200, days: 30, price: 660000 },
  { count: 300, days: 90, price: 825000 },
  { count: 500, days: 90, price: 1100000 },
];

async function seed() {
  console.log(`총 ${plans.length}개 행 입력 시작...`);
  for (const p of plans) {
    await createPage({
      이름:     title(`이력서 ${p.count}건`),
      열람건수: num(p.count),
      이용기간: num(p.days),
      가격:     num(p.price),
    });
    process.stdout.write(".");
  }
  console.log("\n완료!");
}

seed().catch(console.error);
