/**
 * 패키지 DB에 해시태그·핵심특징 컬럼을 추가하고
 * 기존 3개 패키지 페이지에 데이터를 채웁니다.
 *
 * 실행: node scripts/add-package-fields.mjs
 */

import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const env = Object.fromEntries(
  readFileSync(resolve(__dirname, "../.env"), "utf-8")
    .split("\n").filter(l => l.includes("="))
    .map(l => l.split("=").map(s => s.trim()))
);

const TOKEN  = env.NOTION_TOKEN;
const DB_ID  = env.NOTION_DB_PACKAGES;
const VERSION = "2022-06-28";

const headers = {
  Authorization:  `Bearer ${TOKEN}`,
  "Notion-Version": VERSION,
  "Content-Type": "application/json",
};

// ── 패키지별 초기 데이터 ───────────────────────────────────
const PACKAGES = [
  {
    id: "allinone",
    해시태그: "#대규모 공채,#브랜드 인지도",
    핵심특징: "PC·서브·모바일 전 지면 15개 완전 커버\n백스킨·커튼 등 프리미엄 단독 지면 포함\n최대 노출로 채용 브랜딩 극대화",
  },
  {
    id: "curtain",
    해시태그: "#단기집중,#비주얼 강조",
    핵심특징: "메인 커튼·우측으로 방문자 시선을 즉시 집중\n커뮤니티 채널까지 커버하는 스마트 구성\n올인원 대비 절반 비용으로 강렬한 첫인상",
  },
  {
    id: "value",
    해시태그: "#상시채용,#예산 최적화",
    핵심특징: "메인 탑·띠배너 + 서브 + 커뮤니티 핵심 지면\n올인원 대비 30% 비용으로 효율적인 노출\n적은 예산으로 주요 지면 커버가 필요할 때 최적",
  },
];

// ── 1. DB에 컬럼 추가 ─────────────────────────────────────
async function addColumns() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        해시태그: { rich_text: {} },
        핵심특징: { rich_text: {} },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(`컬럼 추가 실패: ${res.message}`);
  console.log("✅ 컬럼 추가 완료: 해시태그, 핵심특징");
}

// ── 2. 기존 페이지 전체 조회 ──────────────────────────────
async function queryAll() {
  const results = [];
  let cursor;
  do {
    const body = cursor ? { start_cursor: cursor } : {};
    const r = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: "POST", headers, body: JSON.stringify(body),
    }).then(r => r.json());
    if (r.object === "error") throw new Error(r.message);
    if (r.results) results.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return results;
}

function getProp(page, name) {
  const p = page.properties[name];
  if (!p) return null;
  if (p.type === "title")     return p.title.map(t => t.plain_text).join("").trim();
  if (p.type === "rich_text") return p.rich_text.map(t => t.plain_text).join("").trim();
  return null;
}

// ── 3. 페이지 업데이트 ────────────────────────────────────
async function updatePage(pageId, data) {
  const res = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        해시태그: { rich_text: [{ text: { content: data.해시태그 } }] },
        핵심특징: { rich_text: [{ text: { content: data.핵심특징 } }] },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(`페이지 업데이트 실패: ${res.message}`);
}

// ── 실행 ──────────────────────────────────────────────────
async function run() {
  if (!DB_ID) throw new Error("NOTION_DB_PACKAGES 환경변수가 없습니다.");

  await addColumns();

  console.log("페이지 조회 중...");
  const pages = await queryAll();
  console.log(`총 ${pages.length}개 페이지 발견`);

  for (const pkg of PACKAGES) {
    const page = pages.find(p => getProp(p, "패키지ID") === pkg.id);
    if (!page) {
      console.warn(`⚠️  패키지ID="${pkg.id}" 페이지를 찾을 수 없습니다. 노션에서 먼저 seed-packages.mjs를 실행하세요.`);
      continue;
    }
    await updatePage(page.id, pkg);
    console.log(`✅ 업데이트 완료: ${pkg.id}`);
  }
  console.log("\n완료! 노션에서 해시태그·핵심특징 내용을 확인·수정하세요.");
  console.log("  - 해시태그: 쉼표로 구분 (예: #대규모 공채,#브랜드 인지도)");
  console.log("  - 핵심특징: Shift+Enter로 줄바꿈 (3줄 → 3개 항목)");
}

run().catch(console.error);
