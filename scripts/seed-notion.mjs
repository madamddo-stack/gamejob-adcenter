import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

// .env 파일 파싱
const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");
const env = Object.fromEntries(
  readFileSync(envPath, "utf-8")
    .split("\n")
    .filter(l => l.includes("="))
    .map(l => l.split("=").map(s => s.trim()))
);

const TOKEN = env.NOTION_TOKEN;
const DB_ID = env.NOTION_DB_RECRUIT; // 채용관 DB

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

const text  = (v) => ({ rich_text: [{ text: { content: String(v ?? "") } }] });
const sel   = (v) => ({ select: { name: String(v) } });
const num   = (v) => v == null ? { number: null } : { number: Number(v) };
const title = (v) => ({ title: [{ text: { content: String(v ?? "") } }] });

// ── 메인 채용관 티어 ─────────────────────────────────────────
const mainTiers = [
  {
    섹션: "main_tier", 티어ID: "emperor", 상품명: "Emperor 채용관",
    위치: "상단", 색상: "#185FA5", 배경색: "#E6F1FB",
    특징: "기업 로고 + 대표공고 3개 노출\n20분 간격 위치 순환\n채용정보(Sword 채용관) 동시 노출\n이력서 열람서비스 건수 제공",
  },
  {
    섹션: "main_tier", 티어ID: "lord", 상품명: "Lord 채용관",
    위치: "중단", 색상: "#3B6D11", 배경색: "#EAF3DE",
    특징: "기업 로고 + 대표공고 2개 노출\n20분 간격 위치 순환\n채용정보(Shield 채용관) 동시 노출\n이력서 열람서비스 건수 제공",
  },
  {
    섹션: "main_tier", 티어ID: "knight", 상품명: "Knight 채용관",
    위치: "하단", 색상: "#854F0B", 배경색: "#FFF8EE",
    특징: "기업 로고 + 대표공고 1개 노출\n20분 간격 위치 순환\n채용정보(Armor 채용관) 동시 노출\n이력서 열람서비스 건수 제공",
  },
];

// ── 메인 채용관 가격 ─────────────────────────────────────────
const mainPrices = [
  // Emperor 결합
  { 섹션:"main_price", 티어ID:"emperor", 유형:"결합", 기간:"1주(7일)",    가격:1573000,  정가:2420000,  상단고정:627000,   상단고정합계:2200000  },
  { 섹션:"main_price", 티어ID:"emperor", 유형:"결합", 기간:"1개월(30일)", 가격:5148000,  정가:7920000,  상단고정:2024000,  상단고정합계:7172000  },
  { 섹션:"main_price", 티어ID:"emperor", 유형:"결합", 기간:"3개월(90일)", 가격:11440000, 정가:17600000, 상단고정:6072000,  상단고정합계:17512000 },
  { 섹션:"main_price", 티어ID:"emperor", 유형:"결합", 기간:"6개월(180일)",가격:17160000, 정가:26400000, 상단고정:12144000, 상단고정합계:29304000 },
  // Emperor 개별
  { 섹션:"main_price", 티어ID:"emperor", 유형:"개별", 기간:"1주(7일)",    가격:1210000,  상단고정:627000,   상단고정합계:1837000  },
  { 섹션:"main_price", 티어ID:"emperor", 유형:"개별", 기간:"1개월(30일)", 가격:3960000,  상단고정:2024000,  상단고정합계:5984000  },
  { 섹션:"main_price", 티어ID:"emperor", 유형:"개별", 기간:"3개월(90일)", 가격:8800000,  상단고정:6072000,  상단고정합계:14872000 },
  { 섹션:"main_price", 티어ID:"emperor", 유형:"개별", 기간:"6개월(180일)",가격:13200000, 상단고정:12144000, 상단고정합계:25344000 },
  // Lord 결합
  { 섹션:"main_price", 티어ID:"lord", 유형:"결합", 기간:"1주(7일)",    가격:1043000,  정가:1606000,  상단고정:417000,  상단고정합계:1460000  },
  { 섹션:"main_price", 티어ID:"lord", 유형:"결합", 기간:"1개월(30일)", 가격:3146000,  정가:4840000,  상단고정:1258000, 상단고정합계:4404000  },
  { 섹션:"main_price", 티어ID:"lord", 유형:"결합", 기간:"3개월(90일)", 가격:7865000,  정가:12100000, 상단고정:3774000, 상단고정합계:11639000 },
  { 섹션:"main_price", 티어ID:"lord", 유형:"결합", 기간:"6개월(180일)",가격:12870000, 정가:19800000, 상단고정:7548000, 상단고정합계:20418000 },
  // Lord 개별
  { 섹션:"main_price", 티어ID:"lord", 유형:"개별", 기간:"1주(7일)",    가격:803000,  상단고정:417000,  상단고정합계:1220000  },
  { 섹션:"main_price", 티어ID:"lord", 유형:"개별", 기간:"1개월(30일)", 가격:2420000, 상단고정:1258000, 상단고정합계:3678000  },
  { 섹션:"main_price", 티어ID:"lord", 유형:"개별", 기간:"3개월(90일)", 가격:6050000, 상단고정:3774000, 상단고정합계:9824000  },
  { 섹션:"main_price", 티어ID:"lord", 유형:"개별", 기간:"6개월(180일)",가격:9900000, 상단고정:7548000, 상단고정합계:17448000 },
  // Knight 결합
  { 섹션:"main_price", 티어ID:"knight", 유형:"결합", 기간:"1주(7일)",    가격:836000,  정가:1287000 },
  { 섹션:"main_price", 티어ID:"knight", 유형:"결합", 기간:"1개월(30일)", 가격:2416000, 정가:3718000 },
  // Knight 개별
  { 섹션:"main_price", 티어ID:"knight", 유형:"개별", 기간:"1주(7일)",    가격:643500  },
  { 섹션:"main_price", 티어ID:"knight", 유형:"개별", 기간:"1개월(30일)", 가격:1859000 },
];

// ── 채용정보 채용관 ──────────────────────────────────────────
const recruitTiers = [
  { 섹션:"recruit", 티어ID:"sword",  상품명:"Sword 채용관",  위치:"상단", 결합단가:35750, 개별단가:27500 },
  { 섹션:"recruit", 티어ID:"shield", 상품명:"Shield 채용관", 위치:"중단", 결합단가:28600, 개별단가:22000 },
  { 섹션:"recruit", 티어ID:"armor",  상품명:"Armor 채용관",  위치:"하단", 결합단가:21450, 개별단가:16500 },
];

async function seedRecruitDB() {
  const all = [...mainTiers, ...mainPrices, ...recruitTiers];
  console.log(`총 ${all.length}개 행 입력 시작...`);

  for (const row of all) {
    const props = {
      이름:     title(row.상품명 ?? row.티어ID ?? ""),
      섹션:     sel(row.섹션),
      티어ID:   text(row.티어ID ?? ""),
      상품명:   text(row.상품명 ?? ""),
      위치:     text(row.위치 ?? ""),
      색상:     text(row.색상 ?? ""),
      배경색:   text(row.배경색 ?? ""),
      특징:     text(row.특징 ?? ""),
      유형:     row.유형 ? sel(row.유형) : { select: null },
      기간:     row.기간 ? sel(row.기간) : { select: null },
      가격:     num(row.가격 ?? null),
      정가:     num(row.정가 ?? null),
      상단고정: num(row.상단고정 ?? null),
      상단고정합계: num(row.상단고정합계 ?? null),
      결합단가: num(row.결합단가 ?? null),
      개별단가: num(row.개별단가 ?? null),
    };
    await createPage(props);
    process.stdout.write(".");
  }
  console.log("\n완료!");
}

seedRecruitDB().catch(console.error);
