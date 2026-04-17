import { useState } from "react";
import {
  mainBooth, recruitBooth, bannerAds, bannerPackages,
  packageCompareRows, resumeService, won,
} from "./data/products";

// ─── 색상 팔레트 ────────────────────────────────────────────
const BRAND = {
  navy:   "#1A2B4A",
  blue:   "#185FA5",
  blueL:  "#E6F1FB",
  green:  "#3B6D11",
  greenL: "#EAF3DE",
  amber:  "#854F0B",
  amberL: "#FFF8EE",
  purple: "#3C3489",
  purpleL:"#EEEDFE",
  pink:   "#72243E",
  pinkL:  "#FBEAF0",
  teal:   "#0F6E56",
  tealL:  "#E1F5EE",
  gray:   "#444441",
  grayL:  "#F1EFE8",
};

const TIER_COLOR = {
  emperor: { text: BRAND.blue,   bg: BRAND.blueL,   border: "#B5D4F4" },
  lord:    { text: BRAND.green,  bg: BRAND.greenL,  border: "#C0DD97" },
  knight:  { text: BRAND.amber,  bg: BRAND.amberL,  border: "#FAC775" },
  sword:   { text: BRAND.blue,   bg: BRAND.blueL,   border: "#B5D4F4" },
  shield:  { text: BRAND.green,  bg: BRAND.greenL,  border: "#C0DD97" },
  armor:   { text: BRAND.amber,  bg: BRAND.amberL,  border: "#FAC775" },
};

// ─── 공통 UI 파트 ─────────────────────────────────────────

const Badge = ({ label, color, bg }) => (
  <span style={{
    display: "inline-block", fontSize: 11, fontWeight: 600,
    padding: "2px 9px", borderRadius: 5,
    color: color || BRAND.blue, background: bg || BRAND.blueL,
    letterSpacing: "0.03em",
  }}>{label}</span>
);

const SectionLabel = ({ children }) => (
  <p style={{
    fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
    textTransform: "uppercase", color: BRAND.blue,
    marginBottom: 8, opacity: 0.7,
  }}>{children}</p>
);

const Card = ({ children, style = {}, featured = false }) => (
  <div style={{
    background: "#fff",
    border: featured ? `2px solid ${BRAND.blue}` : "1px solid #E8ECF2",
    borderRadius: 14, padding: "1.1rem 1.25rem",
    ...style,
  }}>{children}</div>
);

const PriceTable = ({ headers, rows, note }) => (
  <div style={{ overflowX: "auto" }}>
    <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i} style={{
              textAlign: i === 0 ? "left" : "center",
              padding: "8px 10px", background: "#F7F9FC",
              color: "#6B7280", fontWeight: 600, fontSize: 11.5,
              borderBottom: "1px solid #E8ECF2",
              whiteSpace: "nowrap",
            }}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, ri) => (
          <tr key={ri} style={{ borderBottom: ri < rows.length - 1 ? "1px solid #F0F3F8" : "none" }}>
            {row.map((cell, ci) => (
              <td key={ci} style={{
                padding: "8px 10px",
                textAlign: ci === 0 ? "left" : "center",
                color: cell?.highlight ? BRAND.blue : (cell?.muted ? "#9CA3AF" : "#374151"),
                fontWeight: cell?.highlight ? 600 : 400,
                fontSize: cell?.small ? 11 : 12.5,
                whiteSpace: "nowrap",
              }}>
                {cell?.value ?? cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    {note && <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 8 }}>{note}</p>}
  </div>
);

// ─── 탭 정의 ──────────────────────────────────────────────
const TABS = [
  { id: "overview",  label: "상품 개요" },
  { id: "main",      label: "메인 채용관" },
  { id: "recruit",   label: "채용정보 채용관" },
  { id: "banner",    label: "배너 광고" },
  { id: "package",   label: "배너 패키지" },
  { id: "resume",    label: "이력서 열람" },
  { id: "position",  label: "지면 위치도" },
];

// ══════════════════════════════════════════════════════════
//  섹션 컴포넌트
// ══════════════════════════════════════════════════════════

// ── 1. 개요 ───────────────────────────────────────────────
function Overview() {
  const cards = [
    {
      badge: "프리미엄 노출형", color: BRAND.blue, bg: BRAND.blueL,
      title: "메인 채용관",
      desc: "게임잡 메인화면 최상단 — 기업 로고 + 공고를 직접 게재. Emperor · Lord · Knight 3단계 선택.",
      from: "836,000원~", fromSub: "1주 개별 기준",
      points: ["20분 간격 위치 순환", "채용정보 채용관 동시 노출 포함", "이력서 열람 건수 기본 제공"],
      featured: true,
    },
    {
      badge: "성과 효율형", color: BRAND.green, bg: BRAND.greenL,
      title: "채용정보 채용관",
      desc: "직종·지역·경력 조건 기반 타깃 노출. Sword · Shield · Armor 3등급.",
      from: "16,500원~", fromSub: "일 단가 개별 기준",
      points: ["최근 수정공고 순 갱신", "특정 직군 타깃 효율 집중", "단독 신청 또는 메인채용관 세트"],
    },
    {
      badge: "브랜딩형", color: BRAND.purple, bg: BRAND.purpleL,
      title: "배너 광고 / 패키지",
      desc: "메인·서브·모바일·커뮤니티 전 지면 배너. 올인원·커튼·실속 패키지 구성.",
      from: "4,400,000원~", fromSub: "실속 패키지 1주 기준",
      points: ["PC + 모바일 동시 노출", "커튼·백스킨 등 풀스크린 배너", "패키지 구성으로 할인 혜택"],
    },
  ];

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 12, marginBottom: 16 }}>
        {cards.map((c, i) => (
          <Card key={i} featured={c.featured} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div>
              <Badge label={c.badge} color={c.color} bg={c.bg} />
              <h3 style={{ fontSize: 15, fontWeight: 700, marginTop: 8, color: BRAND.navy }}>{c.title}</h3>
              <p style={{ fontSize: 12, color: "#6B7280", marginTop: 4, lineHeight: 1.6 }}>{c.desc}</p>
            </div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
              {c.points.map((p, pi) => (
                <li key={pi} style={{ fontSize: 12, color: "#4B5563", display: "flex", gap: 7, alignItems: "flex-start" }}>
                  <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.color, marginTop: 5, flexShrink: 0 }} />
                  {p}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: "auto", paddingTop: 10, borderTop: "1px solid #F0F3F8" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: c.color }}>{c.from}</span>
              <span style={{ fontSize: 11, color: "#9CA3AF", marginLeft: 6 }}>{c.fromSub}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* 이력서 카드 */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10, flexWrap: "wrap" }}>
          <Badge label="인재 DB" color={BRAND.pink} bg={BRAND.pinkL} />
          <span style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy }}>이력서 열람 서비스</span>
          <span style={{ fontSize: 12, color: "#6B7280" }}>— 이력서·포트폴리오 열람 후 직접 입사제의</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {resumeService.plans.map((p, i) => (
            <div key={i} style={{
              padding: "5px 12px", borderRadius: 20, background: "#F7F9FC",
              border: "1px solid #E8ECF2", fontSize: 12, color: "#374151",
            }}>
              <span style={{ fontWeight: 600 }}>{p.count}건</span>
              <span style={{ color: "#9CA3AF", margin: "0 4px" }}>·</span>
              {p.days}일
              <span style={{ color: "#9CA3AF", margin: "0 4px" }}>·</span>
              <span style={{ color: BRAND.blue, fontWeight: 600 }}>{won(p.price)}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ── 2. 메인 채용관 ────────────────────────────────────────
function MainBooth() {
  const [mode, setMode] = useState("combined");
  const [tierIdx, setTierIdx] = useState(0);
  const tier = mainBooth.tiers[tierIdx];
  const rows_data = mode === "combined" ? tier.combined : tier.individual;

  const tableHeaders = mode === "combined"
    ? ["기간", "기본가", "결합 할인가", "상단고정 옵션", "상단고정 포함가"]
    : ["기간", "개별 가격", "상단고정 옵션", "상단고정 포함가"];

  const makeRows = (rows) => rows.map(r => {
    if (mode === "combined") {
      return [
        r.period,
        { value: won(r.original), muted: true, small: true },
        { value: won(r.price), highlight: true },
        r.topfix ? { value: won(r.topfix) } : { value: "—", muted: true },
        r.topfixTotal ? { value: won(r.topfixTotal), highlight: true } : { value: "미제공", muted: true },
      ];
    } else {
      return [
        r.period,
        { value: won(r.price), highlight: true },
        r.topfix ? { value: won(r.topfix) } : { value: "—", muted: true },
        r.topfixTotal ? { value: won(r.topfixTotal), highlight: true } : { value: "미제공", muted: true },
      ];
    }
  });

  return (
    <div>
      {/* 채용관 등급 선택 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
        {mainBooth.tiers.map((t, i) => {
          const c = TIER_COLOR[t.id];
          const active = i === tierIdx;
          return (
            <Card key={t.id} featured={active}
              style={{ cursor: "pointer", transition: "all .15s", borderColor: active ? BRAND.blue : "#E8ECF2" }}
              onClick={() => setTierIdx(i)}>
              <Badge label={t.position} color={c.text} bg={c.bg} />
              <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 7, color: BRAND.navy }}>{t.name}</h3>
              <ul style={{ listStyle: "none", marginTop: 8, display: "flex", flexDirection: "column", gap: 3 }}>
                {t.features.map((f, fi) => (
                  <li key={fi} style={{ fontSize: 11.5, color: "#6B7280", display: "flex", gap: 6 }}>
                    <span style={{ color: c.text, fontWeight: 700, flexShrink: 0 }}>·</span>{f}
                  </li>
                ))}
              </ul>
              <div style={{ marginTop: 10, paddingTop: 8, borderTop: "1px solid #F0F3F8" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: c.text }}>
                  결합 {won(t.combined[0].price)}~
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {/* 모드 전환 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 12 }}>
        {[["combined", "결합상품 (PC + Mobile)"], ["individual", "개별상품 (PC 또는 Mobile)"]].map(([v, l]) => (
          <button key={v} onClick={() => setMode(v)} style={{
            padding: "6px 16px", fontSize: 12.5, fontWeight: 600,
            borderRadius: 7, cursor: "pointer", transition: "all .15s",
            border: mode === v ? `1.5px solid ${BRAND.blue}` : "1px solid #E8ECF2",
            background: mode === v ? BRAND.blueL : "#fff",
            color: mode === v ? BRAND.blue : "#6B7280",
          }}>{l}</button>
        ))}
      </div>

      <Card>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy, marginBottom: 12 }}>
          {tier.name} — {mode === "combined" ? "결합상품 (PC + Mobile · VAT포함)" : "개별상품 (PC 또는 Mobile · VAT포함)"}
        </h3>
        <PriceTable
          headers={tableHeaders}
          rows={makeRows(rows_data)}
          note={mode === "combined" ? "* 결합상품: 개별 합산가 대비 35% 할인 / 최소 신청기간 1주일" : "* 최소 신청기간 1주일 / VAT 포함가"}
        />
      </Card>
    </div>
  );
}

// ── 3. 채용정보 채용관 ────────────────────────────────────
function RecruitBooth() {
  const color = [TIER_COLOR.sword, TIER_COLOR.shield, TIER_COLOR.armor];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
        {recruitBooth.tiers.map((t, i) => {
          const c = color[i];
          return (
            <Card key={t.id}>
              <Badge label={t.name} color={c.text} bg={c.bg} />
              <p style={{ fontSize: 12, color: "#6B7280", marginTop: 6 }}>채용정보 탭 {t.position} 노출</p>
              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: c.text }}>{t.combined.toLocaleString()}원 <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 400 }}>결합/일</span></div>
                <div style={{ fontSize: 12, color: "#9CA3AF" }}>{t.individual.toLocaleString()}원 <span style={{ fontSize: 11 }}>개별/일</span></div>
              </div>
            </Card>
          );
        })}
      </div>
      <Card>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy, marginBottom: 12 }}>채용정보 채용관 가격표 (일 단가 · VAT포함)</h3>
        <PriceTable
          headers={["상품", "노출 위치", "결합 (PC+M)", "개별 (PC/M)"]}
          rows={recruitBooth.tiers.map(t => [
            t.name, `채용정보 ${t.position}`,
            { value: `${t.combined.toLocaleString()}원/일`, highlight: true },
            `${t.individual.toLocaleString()}원/일`,
          ])}
          note={`* ${recruitBooth.note}`}
        />
      </Card>
    </div>
  );
}

// ── 4. 배너 광고 ─────────────────────────────────────────
function BannerAds() {
  const [deviceFilter, setDeviceFilter] = useState("전체");
  const devices = ["전체", "PC", "PC+M", "Mobile"];
  const filtered = deviceFilter === "전체" ? bannerAds : bannerAds.filter(b => b.device === deviceFilter);

  const deviceColor = {
    "PC":     { bg: BRAND.blueL,   text: BRAND.blue  },
    "PC+M":   { bg: BRAND.purpleL, text: BRAND.purple },
    "Mobile": { bg: BRAND.tealL,   text: BRAND.teal  },
  };

  return (
    <div>
      {/* 필터 */}
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {devices.map(d => (
          <button key={d} onClick={() => setDeviceFilter(d)} style={{
            padding: "5px 14px", fontSize: 12.5, fontWeight: 600,
            borderRadius: 7, cursor: "pointer", transition: "all .15s",
            border: deviceFilter === d ? `1.5px solid ${BRAND.blue}` : "1px solid #E8ECF2",
            background: deviceFilter === d ? BRAND.blueL : "#fff",
            color: deviceFilter === d ? BRAND.blue : "#6B7280",
          }}>{d}</button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 10, marginBottom: 16 }}>
        {filtered.map(b => {
          const dc = deviceColor[b.device] || deviceColor["PC"];
          return (
            <Card key={b.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <Badge label={`${b.device} · ${b.zone}`} color={dc.text} bg={dc.bg} />
              </div>
              <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy }}>{b.name}</div>
              <div style={{ fontSize: 11, color: "#9CA3AF", marginTop: 3 }}>{b.size} · {b.rolling}</div>
              <div style={{ marginTop: 9, paddingTop: 8, borderTop: "1px solid #F0F3F8" }}>
                {b.price
                  ? <span style={{ fontSize: 14, fontWeight: 700, color: BRAND.blue }}>{won(b.price)}<span style={{ fontSize: 11, fontWeight: 400, color: "#9CA3AF" }}>/주</span></span>
                  : <span style={{ fontSize: 12, color: "#9CA3AF" }}>{b.note || "별도 문의"}</span>
                }
              </div>
            </Card>
          );
        })}
      </div>

      <Card>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy, marginBottom: 12 }}>배너 광고 단가표 (1주 · VAT포함)</h3>
        <PriceTable
          headers={["디바이스", "지면", "상품명", "노출방식", "가격 (1주)"]}
          rows={bannerAds.filter(b => b.price).map(b => [
            b.device, b.zone, b.name, b.rolling,
            { value: won(b.price), highlight: true },
          ])}
          note="* 최소 신청기간 1주 이상"
        />
      </Card>
    </div>
  );
}

// ── 5. 배너 패키지 ─────────────────────────────────────────
function BannerPackage() {
  const [selected, setSelected] = useState(null);
  const allIds = (pkg) => pkg.includedIds;

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12, marginBottom: 20 }}>
        {bannerPackages.map(pkg => (
          <div key={pkg.id} onClick={() => setSelected(selected === pkg.id ? null : pkg.id)}
            style={{
              background: "#fff",
              border: selected === pkg.id
                ? `2px solid ${BRAND.blue}`
                : pkg.highlight ? `2px solid ${BRAND.navy}` : "1px solid #E8ECF2",
              borderRadius: 14, padding: "1.2rem", cursor: "pointer",
              transition: "all .15s", position: "relative", overflow: "hidden",
            }}>
            {pkg.highlight && (
              <div style={{
                position: "absolute", top: 12, right: -22, background: BRAND.navy,
                color: "#fff", fontSize: 10, fontWeight: 700, padding: "3px 30px",
                transform: "rotate(35deg)", letterSpacing: "0.1em",
              }}>BEST</div>
            )}
            <div style={{ fontSize: 11, fontWeight: 700, color: BRAND.blue, letterSpacing: "0.08em", marginBottom: 6 }}>
              {pkg.name.toUpperCase()}
            </div>
            <div style={{ fontSize: 13, color: "#6B7280", marginBottom: 12 }}>{pkg.tagline}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: BRAND.navy }}>{won(pkg.price)}</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 14 }}>{pkg.period} · VAT포함</div>
            <p style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.6, marginBottom: 12 }}>{pkg.desc}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {packageCompareRows.filter(r => allIds(pkg).includes(r.id)).map(r => (
                <span key={r.id + pkg.id} style={{
                  fontSize: 11, padding: "2px 8px", borderRadius: 4,
                  background: BRAND.blueL, color: BRAND.blue, fontWeight: 500,
                }}>{r.name}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* 비교표 */}
      <Card>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy, marginBottom: 12 }}>패키지별 포함 지면 비교</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr>
                <th style={{ textAlign: "left", padding: "8px 10px", background: "#F7F9FC", color: "#6B7280", fontWeight: 600, fontSize: 11.5, borderBottom: "1px solid #E8ECF2" }}>노출 위치</th>
                <th style={{ textAlign: "left", padding: "8px 10px", background: "#F7F9FC", color: "#6B7280", fontWeight: 600, fontSize: 11.5, borderBottom: "1px solid #E8ECF2" }}>배너명</th>
                {bannerPackages.map(p => (
                  <th key={p.id} style={{ textAlign: "center", padding: "8px 10px", background: "#F7F9FC", color: BRAND.blue, fontWeight: 700, fontSize: 11.5, borderBottom: "1px solid #E8ECF2", whiteSpace: "nowrap" }}>{p.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {packageCompareRows.map((row, ri) => (
                <tr key={ri} style={{ borderBottom: ri < packageCompareRows.length - 1 ? "1px solid #F0F3F8" : "none" }}>
                  <td style={{ padding: "7px 10px", color: "#9CA3AF", fontSize: 11.5 }}>{row.zone}</td>
                  <td style={{ padding: "7px 10px", color: "#374151", fontWeight: 500 }}>{row.name}</td>
                  {bannerPackages.map(pkg => (
                    <td key={pkg.id} style={{ padding: "7px 10px", textAlign: "center" }}>
                      {pkg.includedIds.includes(row.id)
                        ? <span style={{ color: BRAND.blue, fontSize: 15, fontWeight: 700 }}>●</span>
                        : <span style={{ color: "#E5E7EB", fontSize: 14 }}>—</span>}
                    </td>
                  ))}
                </tr>
              ))}
              <tr style={{ background: "#F7F9FC", borderTop: "1px solid #E8ECF2" }}>
                <td colSpan={2} style={{ padding: "10px 10px", fontWeight: 700, fontSize: 13, color: BRAND.navy }}>금액 (VAT포함 · 1주)</td>
                {bannerPackages.map(p => (
                  <td key={p.id} style={{ padding: "10px 10px", textAlign: "center", fontWeight: 700, fontSize: 14, color: BRAND.blue }}>{won(p.price)}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 8 }}>* 최소 신청기간 1주 이상</p>
      </Card>
    </div>
  );
}

// ── 6. 이력서 열람 ────────────────────────────────────────
function Resume() {
  return (
    <div>
      <Card style={{ marginBottom: 14 }}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: BRAND.navy, marginBottom: 6 }}>{resumeService.title}</h3>
        <p style={{ fontSize: 12.5, color: "#6B7280", lineHeight: 1.7 }}>{resumeService.desc}</p>
      </Card>
      <Card>
        <h3 style={{ fontSize: 13, fontWeight: 700, color: BRAND.navy, marginBottom: 12 }}>가격표 (VAT포함)</h3>
        <PriceTable
          headers={["건수", "기간", "가격", "건당 단가"]}
          rows={resumeService.plans.map(p => [
            `${p.count}건`, `${p.days}일`,
            { value: won(p.price), highlight: true },
            { value: `${Math.round(p.price / p.count).toLocaleString()}원`, muted: true },
          ])}
          note={`* ${resumeService.note}`}
        />
      </Card>
    </div>
  );
}

// ── 7. 지면 위치도 ────────────────────────────────────────
function Position() {
  const [view, setView] = useState("pc-main");
  const views = [
    { id: "pc-main",  label: "PC 메인" },
    { id: "pc-sub",   label: "PC 서브" },
    { id: "mobile",   label: "Mobile" },
  ];

  const ZoneBlock = ({ label, sublabel, color, bg, border, minH = 44, flex }) => (
    <div style={{
      background: bg, border: `1.5px dashed ${border}`,
      borderRadius: 8, padding: "8px 12px", textAlign: "center",
      minHeight: minH, display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 2, flex,
    }}>
      <span style={{ fontSize: 12, fontWeight: 700, color }}>{label}</span>
      {sublabel && <span style={{ fontSize: 10, color, opacity: 0.7 }}>{sublabel}</span>}
    </div>
  );

  const NavBar = () => (
    <div style={{
      background: BRAND.navy, borderRadius: 7, padding: "7px 14px",
      color: "#fff", fontSize: 11, fontWeight: 700, marginBottom: 6, textAlign: "center",
    }}>GAMEJOB 로고 · 채용정보 · 커뮤니티 · 기업정보 · 인재정보</div>
  );

  return (
    <div>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {views.map(v => (
          <button key={v.id} onClick={() => setView(v.id)} style={{
            padding: "5px 16px", fontSize: 12.5, fontWeight: 600,
            borderRadius: 7, cursor: "pointer", transition: "all .15s",
            border: view === v.id ? `1.5px solid ${BRAND.blue}` : "1px solid #E8ECF2",
            background: view === v.id ? BRAND.blueL : "#fff",
            color: view === v.id ? BRAND.blue : "#6B7280",
          }}>{v.label}</button>
        ))}
      </div>

      <div style={{ background: "#F7F9FC", border: "1px solid #E8ECF2", borderRadius: 14, padding: 16 }}>
        <p style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 12, textAlign: "center" }}>
          {view === "pc-main" && "게임잡 PC 메인 페이지 — 지면 위치도"}
          {view === "pc-sub"  && "게임잡 PC 서브(채용정보/커뮤니티) 페이지 — 지면 위치도"}
          {view === "mobile"  && "게임잡 Mobile 페이지 — 지면 위치도"}
        </p>

        {view === "pc-main" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <ZoneBlock label="메인 커튼" sublabel="전면 팝업 오버레이 · 닫기 가능" color={BRAND.blue} bg="#E6F1FB" border="#B5D4F4" minH={36} />
            <NavBar />
            <div style={{ display: "flex", gap: 6 }}>
              <ZoneBlock label="메인 탑" sublabel="2560×1000px · 3구좌" color={BRAND.green} bg={BRAND.greenL} border="#C0DD97" flex={2} minH={56} />
              <ZoneBlock label="메인 우측" sublabel="커튼 패키지 연동" color={BRAND.amber} bg={BRAND.amberL} border="#FAC775" flex={1} minH={56} />
            </div>
            <ZoneBlock label="메인 상단띠" sublabel="1080×70px · 3구좌 롤링 — Emperor 채용관 상단" color={BRAND.purple} bg={BRAND.purpleL} border="#AFA9EC" minH={34} />
            <div style={{ display: "flex", gap: 6 }}>
              <ZoneBlock label="메인 백스킨 (좌)" color={BRAND.amber} bg={BRAND.amberL} border="#FAC775" flex="0 0 80px" minH={100} />
              <ZoneBlock label="Emperor 채용관" sublabel="로고+공고3개 · 20분 순환" color={BRAND.blue} bg={BRAND.blueL} border="#B5D4F4" flex={1} minH={100} />
              <ZoneBlock label="Emperor Edge" sublabel="258×532px" color={BRAND.blue} bg={BRAND.blueL} border="#B5D4F4" flex="0 0 80px" minH={100} />
              <ZoneBlock label="메인 백스킨 (우)" color={BRAND.amber} bg={BRAND.amberL} border="#FAC775" flex="0 0 80px" minH={100} />
            </div>
            <ZoneBlock label="메인 미들띠" sublabel="1080×70px · 3구좌 롤링 — Lord 채용관 상단" color={BRAND.purple} bg={BRAND.purpleL} border="#AFA9EC" minH={34} />
            <ZoneBlock label="Lord 채용관" sublabel="로고+공고2개 · 20분 순환" color={BRAND.green} bg={BRAND.greenL} border="#C0DD97" minH={70} />
            <ZoneBlock label="Knight 채용관" sublabel="로고+공고1개 · 20분 순환" color={BRAND.amber} bg={BRAND.amberL} border="#FAC775" minH={55} />
          </div>
        )}

        {view === "pc-sub" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <NavBar />
            <ZoneBlock label="커뮤니티 Pick" sublabel="PC 1780×528px · 4구좌 롤링" color={BRAND.teal} bg={BRAND.tealL} border="#5DCAA5" minH={50} />
            <div style={{ display: "flex", gap: 6, alignItems: "stretch" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, width: 72, flexShrink: 0 }}>
                <ZoneBlock label="서브 날개" sublabel="90×154px" color={BRAND.pink} bg={BRAND.pinkL} border="#F4C0D1" flex={1} minH={60} />
                <ZoneBlock label="서브 날개2" sublabel="90×154px" color={BRAND.pink} bg={BRAND.pinkL} border="#F4C0D1" flex={1} minH={60} />
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
                <ZoneBlock label="Sword 채용관 (상단)" color={BRAND.blue} bg={BRAND.blueL} border="#B5D4F4" minH={44} />
                <ZoneBlock label="Shield 채용관 (중단)" color={BRAND.green} bg={BRAND.greenL} border="#C0DD97" minH={44} />
                <ZoneBlock label="Armor 채용관 (하단)" color={BRAND.amber} bg={BRAND.amberL} border="#FAC775" minH={44} />
                <ZoneBlock label="커뮤니티 미들띠" sublabel="롤링 배너" color={BRAND.teal} bg={BRAND.tealL} border="#5DCAA5" minH={32} />
              </div>
              <div style={{ width: 90, flexShrink: 0 }}>
                <ZoneBlock label="서브 스카이" sublabel="120×600px · 4구좌 스크롤 플로팅" color={BRAND.pink} bg={BRAND.pinkL} border="#F4C0D1" minH={240} />
              </div>
            </div>
            <ZoneBlock label="서브 하단" sublabel="570×110px · 4구좌" color={BRAND.gray} bg={BRAND.grayL} border="#B4B2A9" minH={36} />
          </div>
        )}

        {view === "mobile" && (
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
            {[
              {
                title: "메인",
                zones: [
                  { label: "모바일 메인띠", sub: "624×210px · 3구좌", color: BRAND.teal, bg: BRAND.tealL, border: "#5DCAA5", minH: 56 },
                  { label: "Emperor 채용관", sub: "", color: BRAND.blue, bg: BRAND.blueL, border: "#B5D4F4", minH: 64 },
                  { label: "Lord 채용관", sub: "", color: BRAND.green, bg: BRAND.greenL, border: "#C0DD97", minH: 48 },
                  { label: "Knight 채용관", sub: "", color: BRAND.amber, bg: BRAND.amberL, border: "#FAC775", minH: 40 },
                ],
              },
              {
                title: "커뮤니티 (취업토크)",
                zones: [
                  { label: "커뮤니티 Pick", sub: "640×240px · 4구좌", color: BRAND.teal, bg: BRAND.tealL, border: "#5DCAA5", minH: 70 },
                  { label: "모바일 서브띠", sub: "커뮤니티/서브 하단", color: BRAND.purple, bg: BRAND.purpleL, border: "#AFA9EC", minH: 44 },
                ],
              },
              {
                title: "MY 페이지",
                zones: [
                  { label: "모바일 서브띠", sub: "하단 배너 영역", color: BRAND.purple, bg: BRAND.purpleL, border: "#AFA9EC", minH: 44 },
                ],
              },
            ].map(frame => (
              <div key={frame.title} style={{
                width: 190, background: "#fff", border: "1px solid #E8ECF2",
                borderRadius: 16, padding: 12,
              }}>
                <div style={{
                  fontSize: 11, fontWeight: 700, color: BRAND.navy,
                  marginBottom: 10, textAlign: "center",
                  padding: "4px 0", borderBottom: "1px solid #F0F3F8",
                }}>{frame.title}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {frame.zones.map((z, i) => (
                    <ZoneBlock key={i} label={z.label} sublabel={z.sub}
                      color={z.color} bg={z.bg} border={z.border} minH={z.minH} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════
//  메인 앱
// ══════════════════════════════════════════════════════════
export default function AdCenter() {
  const [activeTab, setActiveTab] = useState("overview");

  const sectionMap = {
    overview: <Overview />,
    main:     <MainBooth />,
    recruit:  <RecruitBooth />,
    banner:   <BannerAds />,
    package:  <BannerPackage />,
    resume:   <Resume />,
    position: <Position />,
  };

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFD", fontFamily: "'Pretendard','Noto Sans KR',sans-serif" }}>
      {/* 헤더 */}
      <header style={{
        background: BRAND.navy, color: "#fff",
        padding: "0 clamp(16px,4vw,48px)",
      }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "18px 0 0",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                fontWeight: 900, fontSize: 20, letterSpacing: "-0.03em",
                color: "#fff", borderRight: "1.5px solid rgba(255,255,255,0.2)",
                paddingRight: 14, marginRight: 2,
              }}>GAMEJOB</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>광고센터</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 1 }}>채용 마케팅 상품 안내</div>
              </div>
            </div>
            <a href="mailto:ad@gamejob.co.kr" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 8, padding: "7px 15px", color: "#fff",
              fontSize: 12.5, fontWeight: 600, textDecoration: "none",
              transition: "background .15s",
            }}>
              📧 광고 문의
            </a>
          </div>

          {/* 탭 */}
          <nav style={{ display: "flex", gap: 2, marginTop: 16, overflowX: "auto" }}>
            {TABS.map(tab => (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                padding: "10px 16px", fontSize: 13, fontWeight: 600,
                background: "transparent", border: "none", cursor: "pointer",
                color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.5)",
                borderBottom: activeTab === tab.id ? "2.5px solid #4A9FE8" : "2.5px solid transparent",
                transition: "all .15s", whiteSpace: "nowrap", borderRadius: 0,
              }}>{tab.label}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px clamp(16px,4vw,48px) 60px" }}>
        {/* 탭 제목 */}
        <div style={{ marginBottom: 20 }}>
          <h2 style={{ fontSize: 20, fontWeight: 800, color: BRAND.navy, letterSpacing: "-0.03em" }}>
            {TABS.find(t => t.id === activeTab)?.label}
          </h2>
          <div style={{ width: 32, height: 3, background: BRAND.blue, borderRadius: 2, marginTop: 6 }} />
        </div>

        {sectionMap[activeTab]}
      </main>

      {/* 푸터 */}
      <footer style={{
        borderTop: "1px solid #E8ECF2", background: "#fff",
        padding: "20px clamp(16px,4vw,48px)",
        textAlign: "center", fontSize: 12, color: "#9CA3AF",
      }}>
        <p>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ marginTop: 4 }}>* 모든 가격은 VAT포함 / 최소 신청기간: 채용관 1주일, 배너 1주 이상</p>
      </footer>
    </div>
  );
}
