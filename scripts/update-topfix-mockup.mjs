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
const DB_ID = env.NOTION_DB_RECRUIT;
const VERSION = "2022-06-28";

const headers = {
  Authorization: `Bearer ${TOKEN}`,
  "Notion-Version": VERSION,
  "Content-Type": "application/json",
};

// 1. 컬럼 추가
async function addProperties() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "목업_상단고정_PC구좌":     { number: {} },
        "목업_상단고정_모바일구좌": { number: {} },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(res.message);
  console.log("컬럼 추가 완료");
}

// 2. 페이지 조회
async function getPages() {
  const r = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: "POST", headers, body: JSON.stringify({}),
  }).then(r => r.json());
  return r.results;
}

// 3. lord만 업데이트 (emperor는 기본값과 동일해 null 유지)
const TOPFIX_DATA = {
  lord: { pc: 2, mob: 1 },
};

async function updatePage(pageId, data) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "목업_상단고정_PC구좌":     { number: data.pc },
        "목업_상단고정_모바일구좌": { number: data.mob },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(res.message);
}

async function run() {
  await addProperties();
  const pages = await getPages();

  const tierPages = pages.filter(p => {
    const sec = p.properties["섹션"]?.select?.name;
    return sec === "main_tier";
  });

  console.log(`${tierPages.length}개 tier 행 처리 중...`);
  for (const page of tierPages) {
    const tierId = page.properties["티어ID"]?.rich_text?.map(t => t.plain_text).join("") ?? "";
    const data = TOPFIX_DATA[tierId];
    if (!data) { console.log(`  skip: ${tierId}`); continue; }
    await updatePage(page.id, data);
    console.log(`  updated: ${tierId}`);
  }
  console.log("완료!");
}

run().catch(console.error);
