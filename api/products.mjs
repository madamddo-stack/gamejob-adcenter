const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_VERSION = "2022-06-28";

// Notion DB 전체 조회 (페이지네이션 포함)
const queryAll = async (dbId) => {
  if (!dbId) return [];
  const results = [];
  let cursor;
  do {
    const body = cursor ? { start_cursor: cursor } : {};
    const r = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then(r => r.json());
    if (r.results) results.push(...r.results);
    cursor = r.has_more ? r.next_cursor : undefined;
  } while (cursor);
  return results;
};

// Notion 속성 값 추출 헬퍼
const prop = (page, name) => {
  const p = page.properties[name];
  if (!p) return null;
  switch (p.type) {
    case "title":     return p.title.map(t => t.plain_text).join("").trim();
    case "rich_text": return p.rich_text.map(t => t.plain_text).join("").trim();
    case "number":    return p.number;
    case "select":    return p.select?.name ?? null;
    case "checkbox":  return p.checkbox;
    default:          return null;
  }
};

const PERIOD_ORDER = ["1주(7일)", "1개월(30일)", "3개월(90일)", "6개월(180일)"];
const sortByPeriod = (a, b) =>
  PERIOD_ORDER.indexOf(prop(a, "기간")) - PERIOD_ORDER.indexOf(prop(b, "기간"));

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=120");

  try {
    const DB_ID = process.env.NOTION_DB_MAIN_TIERS;

    // DEBUG: raw Notion 응답 확인
    const rawResponse = await fetch(`https://api.notion.com/v1/databases/${DB_ID}/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).then(r => r.json());

    return res.json({ debug: true, DB_ID, rawResponse });

    const allPages = await queryAll(DB_ID);

    // DEBUG: 실제 속성명 확인
    return res.json({
      debug: true,
      total: allPages.length,
      sample: allPages.slice(0, 3).map(p => ({
        id: p.id,
        props: Object.keys(p.properties),
        values: Object.fromEntries(
          Object.entries(p.properties).map(([k, v]) => [k, prop(p, k)])
        ),
      })),
    });

    const MAIN_IDS    = ["emperor", "lord", "knight"];
    const RECRUIT_IDS = ["sword", "shield", "armor"];

    const mainTiers    = allPages.filter(p => MAIN_IDS.includes(prop(p, "티어ID")) && prop(p, "기간") === null);
    const mainPrices   = allPages.filter(p => MAIN_IDS.includes(prop(p, "티어ID")) && prop(p, "기간") !== null);
    const recruitTiers = allPages.filter(p => RECRUIT_IDS.includes(prop(p, "티어ID")));
    const banners      = allPages.filter(p => prop(p, "상품ID") !== null);
    const packages     = allPages.filter(p => prop(p, "패키지ID") !== null);
    const resumePlans  = allPages.filter(p => prop(p, "열람건수") !== null);

    // ── 메인 채용관 ──────────────────────────────────────────
    const TIER_ORDER = ["emperor", "lord", "knight"];
    const mainBooth = {
      title: "메인 채용관",
      desc: "게임잡 메인화면 최상단 노출 — 기업 로고 + 대표 공고를 직접 게재",
      tiers: TIER_ORDER.map(tierId => {
        const t = mainTiers.find(p => prop(p, "티어ID") === tierId);
        if (!t) return null;
        const prices = mainPrices.filter(p => prop(p, "티어ID") === tierId);
        return {
          id: tierId,
          name:     prop(t, "상품명"),
          position: prop(t, "위치"),
          color:    prop(t, "색상"),
          bgLight:  prop(t, "배경색"),
          features: (prop(t, "특징") || "").split("\n").filter(Boolean),
          combined: prices.filter(p => prop(p, "유형") === "결합").sort(sortByPeriod).map(p => ({
            period:      prop(p, "기간"),
            price:       prop(p, "가격"),
            original:    prop(p, "정가"),
            topfix:      prop(p, "상단고정"),
            topfixTotal: prop(p, "상단고정합계"),
          })),
          individual: prices.filter(p => prop(p, "유형") === "개별").sort(sortByPeriod).map(p => ({
            period:      prop(p, "기간"),
            price:       prop(p, "가격"),
            topfix:      prop(p, "상단고정"),
            topfixTotal: prop(p, "상단고정합계"),
          })),
        };
      }).filter(Boolean),
    };

    // ── 채용정보 채용관 ──────────────────────────────────────
    const RECRUIT_ORDER = ["sword", "shield", "armor"];
    const recruitBooth = {
      title: "채용정보 채용관",
      desc: "채용정보 탭 내 직종·지역·경력 조건 기반 타깃 노출 (일 단가 · VAT포함)",
      note: "메인채용관 구매 시 자동 포함 — Emperor→Sword / Lord→Shield / Knight→Armor",
      tiers: RECRUIT_ORDER.map(tierId => {
        const p = recruitTiers.find(page => prop(page, "티어ID") === tierId);
        if (!p) return null;
        return {
          id:         tierId,
          name:       prop(p, "상품명"),
          position:   prop(p, "위치"),
          combined:   prop(p, "결합단가"),
          individual: prop(p, "개별단가"),
        };
      }).filter(Boolean),
    };

    // ── 배너 광고 ────────────────────────────────────────────
    const BANNER_ORDER = [
      "backskin","emperiredge","maintop","topstrip","midstrip",
      "curtain","mainright","subwing","subwing2","subsky",
      "subbottom","commPick","commMid","mobMain","mobSub",
    ];
    const bannerAds = BANNER_ORDER.map(id => {
      const p = banners.find(page => prop(page, "상품ID") === id);
      if (!p) return null;
      return {
        id,
        device:   prop(p, "디바이스"),
        zone:     prop(p, "지면"),
        name:     prop(p, "상품명"),
        size:     prop(p, "이미지사이즈") || "-",
        capacity: prop(p, "이미지용량")  || "-",
        rolling:  prop(p, "노출방식"),
        location: id === "emperiredge" ? "PC 메인 채용관 상단 우측" : null,
        price:    prop(p, "가격"),
        note:     prop(p, "비고")       || null,
      };
    }).filter(Boolean);

    // ── 배너 패키지 ──────────────────────────────────────────
    const PKG_ORDER = ["allinone", "curtain", "value"];
    const bannerPackages = PKG_ORDER.map(id => {
      const p = packages.find(page => prop(page, "패키지ID") === id);
      if (!p) return null;
      return {
        id,
        name:        prop(p, "패키지명"),
        tagline:     prop(p, "태그라인"),
        price:       prop(p, "가격"),
        period:      prop(p, "기간"),
        highlight:   prop(p, "추천여부") || false,
        desc:        prop(p, "설명"),
        includedIds: (prop(p, "포함상품ID") || "").split(",").map(s => s.trim()).filter(Boolean),
      };
    }).filter(Boolean);

    // ── 이력서 열람 ──────────────────────────────────────────
    const resumeService = {
      title: "이력서 열람 서비스",
      desc: "게임잡 회원의 이력서·자기소개서·포트폴리오·연락처를 열람하고 직접 입사제의 가능. 이력서 원본 열람 시 건수 차감.",
      note: "메인채용관 구매 시 신청 기간과 동일한 건수 기본 제공",
      plans: resumePlans
        .map(p => ({
          count: prop(p, "열람건수"),
          days:  prop(p, "이용기간"),
          price: prop(p, "가격"),
        }))
        .sort((a, b) => a.count - b.count),
    };

    res.json({ mainBooth, recruitBooth, bannerAds, bannerPackages, resumeService });

  } catch (e) {
    console.error("[api/products]", e.message);
    res.status(500).json({ error: e.message });
  }
}
