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

// 1. DB에 컬럼 3개 추가
async function addProperties() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "목업_PC구좌":     { number: {} },
        "목업_모바일구좌": { number: {} },
        "목업_설명":       { rich_text: {} },
        "목업_갱신뱃지":   { rich_text: {} },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(res.message);
  console.log("컬럼 추가 완료");
}

// 2. 기존 tier 행 조회
async function getPages() {
  const r = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
    method: "POST", headers, body: JSON.stringify({}),
  }).then(r => r.json());
  return r.results;
}

// 3. 각 행 업데이트
const MOCKUP_DATA = {
  emperor: { pc: 4, mob: 2, sub: "상단 · 로고+공고3개", badge: "20분순환" },
  lord:    { pc: 3, mob: 2, sub: "중단 · 로고+공고2개", badge: "20분순환" },
  knight:  { pc: 2, mob: 1, sub: "하단 · 로고+공고1개", badge: "20분순환" },
  sword:   { pc: 3, mob: 2, sub: "상단 · 최근수정순",   badge: "매일갱신" },
  shield:  { pc: 3, mob: 2, sub: "중단 · 최근수정순",   badge: "매일갱신" },
  armor:   { pc: 3, mob: 2, sub: "하단 · 최근수정순",   badge: "매일갱신" },
};

async function updatePage(pageId, data) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "목업_PC구좌":     { number: data.pc },
        "목업_모바일구좌": { number: data.mob },
        "목업_설명":       { rich_text: [{ text: { content: data.sub } }] },
        "목업_갱신뱃지":   { rich_text: [{ text: { content: data.badge } }] },
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
    return sec === "main_tier" || sec === "recruit";
  });

  console.log(`${tierPages.length}개 티어 행 업데이트 중...`);
  for (const page of tierPages) {
    const tierId = page.properties["티어ID"]?.rich_text?.map(t => t.plain_text).join("") ?? "";
    const data = MOCKUP_DATA[tierId];
    if (!data) { console.log(`  skip: ${tierId}`); continue; }
    await updatePage(page.id, data);
    process.stdout.write(".");
  }
  console.log("\n완료!");
}

run().catch(console.error);
