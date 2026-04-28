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
const DB_ID = env.NOTION_DB_PACKAGES;
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
const sel   = (v) => v ? { select: { name: String(v) } } : { select: null };
const num   = (v) => ({ number: v ?? null });
const bool  = (v) => ({ checkbox: !!v });
const title = (v) => ({ title: [{ text: { content: String(v ?? "") } }] });

const packages = [
  {
    id: "allinone",
    name: "올인원 패키지",
    tagline: "게임잡 전 지면 완전 커버",
    price: 14000000,
    period: "1주",
    highlight: true,
    desc: "PC·서브·모바일 전 지면에 배너 게재. 최대 노출로 확실한 브랜딩 효과.",
    includedIds: "backskin,maintop,topstrip,midstrip,curtain,mainright,subwing,subwing2,subsky,subbottom,commPick,commMid,mobMain,mobSub",
  },
  {
    id: "curtain",
    name: "커튼 패키지",
    tagline: "강렬한 첫인상, 커튼 중심 구성",
    price: 6600000,
    period: "1주",
    highlight: false,
    desc: "메인 커튼 배너로 방문자 시선을 확실하게 잡는 전략형 패키지.",
    includedIds: "curtain,mainright,subwing2,commPick,commMid,mobSub",
  },
  {
    id: "value",
    name: "실속 패키지",
    tagline: "핵심 지면 비용 효율 최적화",
    price: 4400000,
    period: "1주",
    highlight: false,
    desc: "메인 띠배너 + 서브 + 커뮤니티 핵심 지면으로 합리적 예산 운용.",
    includedIds: "maintop,topstrip,midstrip,subsky,subbottom,commPick",
  },
];

async function seed() {
  console.log(`총 ${packages.length}개 행 입력 시작...`);
  for (const p of packages) {
    await createPage({
      이름:      title(p.name),
      패키지ID:  text(p.id),
      태그라인:  text(p.tagline),
      가격:      num(p.price),
      기간:      text(p.period),
      추천여부:  bool(p.highlight),
      설명:      text(p.desc),
      포함상품ID: text(p.includedIds),
    });
    process.stdout.write(".");
  }
  console.log("\n완료!");
}

seed().catch(console.error);
