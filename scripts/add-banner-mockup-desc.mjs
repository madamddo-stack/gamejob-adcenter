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
const DB_ID = env.NOTION_DB_BANNERS;
const VERSION = "2022-06-28";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Notion-Version": VERSION,
  "Content-Type": "application/json",
};

// 1. 배너 DB에 목업_설명 컬럼 추가
async function addProperty() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "목업_설명": { rich_text: {} },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(res.message);
  console.log("컬럼 추가 완료: 목업_설명");
}

async function run() {
  await addProperty();
  console.log("완료! 노션에서 각 배너 상품의 목업_설명을 입력하세요.");
  console.log("(좁은 공간 줄바꿈은 Shift+Enter로 입력)");
}

run().catch(console.error);
