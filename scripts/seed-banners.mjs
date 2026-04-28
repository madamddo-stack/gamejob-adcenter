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
const title = (v) => ({ title: [{ text: { content: String(v ?? "") } }] });

const banners = [
  { id:"backskin",    device:"PC",    zone:"메인",     name:"메인 백스킨",       size:"2560×1000px",                  cap:"500KB 이하",  rolling:"고정",                        price:3300000 },
  { id:"emperiredge", device:"PC",    zone:"메인",     name:"Emperor Edge",      size:"258×532px",                    cap:"10MB 이하",   rolling:"최상단 우측 1번째, 2번째 줄", price:2750000 },
  { id:"maintop",     device:"PC",    zone:"메인",     name:"메인 탑",           size:"2560×1000px",                  cap:"500KB 이하",  rolling:"3구좌 롤링",                  price:2200000 },
  { id:"topstrip",    device:"PC",    zone:"메인",     name:"메인 상단띠",       size:"1080×70px",                    cap:"200KB 이하",  rolling:"3구좌 롤링",                  price:1815000 },
  { id:"midstrip",    device:"PC",    zone:"메인",     name:"메인 미들띠",       size:"1080×70px",                    cap:"200KB 이하",  rolling:"3구좌 롤링",                  price:1430000 },
  { id:"curtain",     device:"PC",    zone:"메인",     name:"메인 커튼",         size:"-",                            cap:"-",           rolling:"고정",                        price:null,  note:"패키지 포함 상품" },
  { id:"mainright",   device:"PC",    zone:"메인",     name:"메인 우측",         size:"-",                            cap:"-",           rolling:"고정",                        price:null,  note:"패키지 포함 상품" },
  { id:"subwing",     device:"PC",    zone:"서브",     name:"서브 날개",         size:"90×154px",                     cap:"100KB 이하",  rolling:"3구좌 롤링",                  price:2200000 },
  { id:"subwing2",    device:"PC",    zone:"서브",     name:"서브 날개2",        size:"90×154px",                     cap:"100KB 이하",  rolling:"3구좌 롤링",                  price:null,  note:"패키지 포함 상품" },
  { id:"subsky",      device:"PC",    zone:"서브",     name:"서브 스카이",       size:"120×600px",                    cap:"100KB 이하",  rolling:"4구좌",                       price:1100000 },
  { id:"subbottom",   device:"PC",    zone:"서브",     name:"서브 하단",         size:"570×110px",                    cap:"200KB 이하",  rolling:"4구좌",                       price:880000 },
  { id:"commPick",    device:"PC+M",  zone:"커뮤니티", name:"커뮤니티 Pick",     size:"PC 1780×528 / M 640×240px",    cap:"300KB 이하",  rolling:"4구좌",                       price:2200000 },
  { id:"commMid",     device:"PC+M",  zone:"커뮤니티", name:"커뮤니티 미들띠",  size:"-",                            cap:"-",           rolling:"롤링",                        price:null,  note:"패키지 포함 상품" },
  { id:"mobMain",     device:"Mobile",zone:"메인",     name:"모바일 메인띠",     size:"624×210px",                    cap:"300KB 이하",  rolling:"3구좌",                       price:3300000 },
  { id:"mobSub",      device:"Mobile",zone:"서브",     name:"모바일 서브띠",     size:"-",                            cap:"-",           rolling:"롤링",                        price:null,  note:"패키지 포함 상품" },
];

async function seed() {
  console.log(`총 ${banners.length}개 행 입력 시작...`);
  for (const b of banners) {
    await createPage({
      이름:     title(b.name),
      상품명ID: text(b.id),
      디바이스: sel(b.device),
      지면:     text(b.zone),
      이미지사이즈: text(b.size),
      이미지용량:   text(b.cap),
      노출방식: text(b.rolling),
      가격:     num(b.price),
      비고:     text(b.note ?? ""),
    });
    process.stdout.write(".");
  }
  console.log("\n완료!");
}

seed().catch(console.error);
