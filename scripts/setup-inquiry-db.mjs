/**
 * 광고 문의 Notion DB 컬럼 세팅 스크립트
 *
 * 사전 준비:
 *  1. Notion에서 빈 테이블 DB 생성 ("광고 문의")
 *  2. 기존 integration에 해당 DB 공유
 *  3. .env에 NOTION_DB_INQUIRY=DB_ID 추가
 *
 * 실행: NODE_TLS_REJECT_UNAUTHORIZED=0 node scripts/setup-inquiry-db.mjs
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

const TOKEN   = env.NOTION_TOKEN;
const DB_ID   = env.NOTION_DB_INQUIRY;
const VERSION = "2022-06-28";

const headers = {
  Authorization:    `Bearer ${TOKEN}`,
  "Notion-Version": VERSION,
  "Content-Type":   "application/json",
};

if (!DB_ID) {
  console.error("❌ NOTION_DB_INQUIRY 환경변수가 없습니다. .env를 확인하세요.");
  process.exit(1);
}

async function setupColumns() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        // 기본 title 컬럼 → 회사명으로 rename
        "이름": { name: "회사명" },

        // 추가 컬럼
        "담당자":   { rich_text: {} },
        "이메일":   { email: {} },
        "연락처":   { phone_number: {} },
        "관심상품": { rich_text: {} },
        "문의내용": { rich_text: {} },
        "상태": {
          select: {
            options: [
              { name: "미확인", color: "red"    },
              { name: "검토중", color: "yellow" },
              { name: "완료",   color: "green"  },
            ],
          },
        },
        "제출일시": { created_time: {} },
      },
    }),
  }).then(r => r.json());

  if (res.object === "error") throw new Error(res.message);
  console.log("✅ 컬럼 세팅 완료!");
  console.log("   회사명(제목) / 담당자 / 이메일 / 연락처 / 관심상품 / 문의내용 / 상태 / 제출일시");
}

setupColumns().catch(console.error);
