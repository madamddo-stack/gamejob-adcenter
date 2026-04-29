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

async function addProperty() {
  const res = await fetch(`https://api.notion.com/v1/databases/${DB_ID}`, {
    method: "PATCH",
    headers,
    body: JSON.stringify({
      properties: {
        "미리보기_URL": { url: {} },
      },
    }),
  }).then(r => r.json());
  if (res.object === "error") throw new Error(res.message);
  console.log("컬럼 추가 완료: 미리보기_URL");
  console.log("노션에서 Emperor 행의 미리보기_URL에 이미지 URL을 입력하세요.");
}

addProperty().catch(console.error);
