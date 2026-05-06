const NOTION_TOKEN   = process.env.NOTION_TOKEN;
const NOTION_DB      = process.env.NOTION_DB_INQUIRY;
const NOTION_VERSION = "2022-06-28";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  if (!NOTION_DB) return res.status(500).json({ error: "NOTION_DB_INQUIRY not configured" });

  const { company, contact, email, phone, product, message } = req.body ?? {};

  // 필수값 체크
  if (!company || !email || !message) {
    return res.status(400).json({ error: "회사명, 이메일, 문의내용은 필수입니다." });
  }

  const text  = (v) => ({ rich_text: [{ text: { content: String(v ?? "").slice(0, 2000) } }] });
  const title = (v) => ({ title:     [{ text: { content: String(v ?? "").slice(0, 2000) } }] });

  try {
    const r = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        Authorization:    `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type":   "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DB },
        properties: {
          회사명:   title(company),
          담당자:   text(contact),
          이메일:   { email:        email  || null },
          연락처:   { phone_number: phone  || null },
          관심상품: text(product),
          문의내용: text(message),
          상태:     { select: { name: "미확인" } },
        },
      }),
    }).then(r => r.json());

    if (r.object === "error") throw new Error(r.message);

    return res.status(200).json({ ok: true });
  } catch (e) {
    console.error("[api/inquiry]", e.message);
    return res.status(500).json({ error: e.message });
  }
}
