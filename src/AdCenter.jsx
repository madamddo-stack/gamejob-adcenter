import { useState, useEffect, useRef } from "react";
import {
  mainBooth, recruitBooth, bannerAds, bannerPackages,
  packageCompareRows, resumeService,
} from "./data/products";

// ─── 토큰 ────────────────────────────────────────────────
const C = {
  navy:    "#17253D",
  navyD:   "#0F1A2E",
  blue:    "#1C6BCC",
  blueL:   "#EBF3FF",
  green:   "#1E6B3C",
  greenL:  "#E8F5EE",
  amber:   "#7A4400",
  amberL:  "#FFF4E6",
  purple:  "#3D2FA0",
  purpleL: "#EFEDFC",
  pink:    "#8B1A4A",
  pinkL:   "#FCEEF4",
  teal:    "#0B6657",
  tealL:   "#E4F4F1",
  gray:    "#6B7280",
  grayL:   "#F3F4F6",
  border:  "#E5E9F0",
  white:   "#FFFFFF",
  bg:      "#F0F2F7",
  text:    "#17253D",
};

const fw = (n) => n?.toLocaleString("ko-KR") + "원";

// ─── LNB 데이터 ───────────────────────────────────────────
const LNB_ALL = [
  {
    group: "메인 채용관",
    icon: "□",
    items: mainBooth.tiers.map(t => ({ id: t.id, label: t.name.replace(" 채용관","") })),
  },
  {
    group: "채용정보 채용관",
    icon: "≡",
    items: recruitBooth.tiers.map(t => ({ id: t.id, label: t.name.replace(" 채용관","") })),
  },
  {
    group: "배너 광고",
    icon: "◻",
    items: bannerAds.filter(b => b.price).map(b => ({ id: b.id, label: b.name })),
  },
  {
    group: "이력서 열람",
    icon: "□",
    items: [{ id: "resume", label: "이력서 열람 서비스" }],
  },
];

const LNB_PKG = [
  {
    group: "배너 패키지",
    icon: "◈",
    items: bannerPackages.map(p => ({ id: p.id, label: p.name })),
  },
];

// ─── 공통 UI ─────────────────────────────────────────────
const Tag = ({ label, color = C.blue, bg = C.blueL }) => (
  <span style={{ display:"inline-block", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:4, color, background:bg, letterSpacing:"0.04em" }}>{label}</span>
);

const Chip = ({ children, color = C.blue, bg = C.blueL }) => (
  <span style={{ display:"inline-block", fontSize:11, padding:"2px 9px", borderRadius:20, background:bg, color, fontWeight:600 }}>{children}</span>
);

// ─── 목업 공통 ───────────────────────────────────────────
const BrowserBar = () => (
  <div style={{ background:"#E8EAED", padding:"7px 12px", display:"flex", alignItems:"center", gap:8, borderBottom:"1px solid #D1D5DB" }}>
    <div style={{ display:"flex", gap:5 }}>
      {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <div key={i} style={{ width:10, height:10, borderRadius:"50%", background:c }} />)}
    </div>
    <div style={{ flex:1, background:"#fff", borderRadius:4, padding:"3px 10px", fontSize:10, color:"#6B7280", textAlign:"center", border:"1px solid #E5E7EB" }}>
      gamejob.co.kr
    </div>
  </div>
);

const GNB = () => (
  <div style={{ background:C.navy, padding:"8px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
    <span style={{ color:"#fff", fontWeight:900, fontSize:12, letterSpacing:"-0.02em" }}>GAMEJOB</span>
    <div style={{ display:"flex", gap:12 }}>
      {["채용정보","커뮤니티","기업정보","인재정보"].map(m => (
        <span key={m} style={{ color:"rgba(255,255,255,0.5)", fontSize:9 }}>{m}</span>
      ))}
    </div>
  </div>
);

// 지면 블록
const Zone = ({ label, sub, color, active, style={}, slots }) => (
  <div style={{
    borderRadius:6, padding:"8px 10px",
    background: active ? `${color}15` : "#F0F2F5",
    border: active ? `2px solid ${color}` : "1.5px solid #E5E7EB",
    transition:"all .2s", ...style,
  }}>
    <div style={{ fontSize:9.5, fontWeight: active ? 800 : 400, color: active ? color : "#9CA3AF", marginBottom: slots ? 6 : 0 }}>
      {active ? `▶ ${label}` : label}
      {sub && <span style={{ fontSize:8.5, fontWeight:400, marginLeft:5, opacity:0.75 }}>{sub}</span>}
    </div>
    {/* 슬롯 (로고+공고 카드) */}
    {slots && active && (
      <div style={{ display:"flex", gap:4 }}>
        {Array.from({ length: slots }).map((_,i) => (
          <div key={i} style={{ flex:1, background:`${color}20`, border:`1px dashed ${color}`, borderRadius:4, padding:"5px 4px" }}>
            <div style={{ width:"100%", height:8, background:`${color}40`, borderRadius:2, marginBottom:3 }} />
            <div style={{ width:"80%", height:5, background:`${color}25`, borderRadius:2, marginBottom:2 }} />
            <div style={{ width:"60%", height:5, background:`${color}25`, borderRadius:2 }} />
          </div>
        ))}
      </div>
    )}
    {/* 띠 배너 */}
    {active && !slots && sub?.includes("px") && (
      <div style={{ height:8, background:`${color}30`, borderRadius:2, marginTop:4, border:`1px dashed ${color}` }} />
    )}
  </div>
);

// ─── PC 메인 목업 ─────────────────────────────────────────
const MockMain = ({ hl }) => (
  <div style={{ background:"#F8F9FA", borderRadius:10, overflow:"hidden", border:"1px solid #E0E4EC" }}>
    <BrowserBar />
    {hl === "curtain" && (
      <div style={{ background:"rgba(23,37,61,0.85)", padding:"8px", textAlign:"center" }}>
        <div style={{ background:C.blue, borderRadius:5, padding:"6px 0", fontSize:9, fontWeight:700, color:"#fff", width:"85%", margin:"0 auto" }}>
          ▶ 메인 커튼 — 전면 팝업 배너 (1구좌)
        </div>
      </div>
    )}
    <GNB />
    <div style={{ padding:"6px 6px 3px", display:"flex", gap:4 }}>
      <Zone label="메인 탑" sub="2560×1000px · 3구좌" color={C.green} active={hl==="maintop"} style={{ flex:2 }}
        slots={hl==="maintop" ? null : null} />
      <Zone label="메인 우측" sub="" color={C.amber} active={hl==="mainright"} style={{ flex:1 }} />
    </div>
    <div style={{ padding:"0 6px 3px" }}>
      <Zone label="메인 상단띠" sub="1080×70px · 3구좌" color={C.purple} active={hl==="topstrip"} />
    </div>
    <div style={{ padding:"0 6px 3px", display:"flex", gap:4 }}>
      <Zone label="백스킨(좌)" sub="" color={C.amber} active={hl==="backskin"} style={{ width:28, flexShrink:0, padding:"12px 3px" }} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        <Zone label="Emperor 채용관" sub="로고+공고3개 · 20분순환" color={C.blue} active={hl==="emperor"} slots={hl==="emperor" ? 4 : null} />
        <Zone label="Emperor Edge" sub="258×532px" color={C.blue} active={hl==="emperiredge"} />
      </div>
      <Zone label="백스킨(우)" sub="" color={C.amber} active={hl==="backskin"} style={{ width:28, flexShrink:0, padding:"12px 3px" }} />
    </div>
    <div style={{ padding:"0 6px 3px" }}>
      <Zone label="메인 미들띠" sub="1080×70px · 3구좌" color={C.purple} active={hl==="midstrip"} />
    </div>
    <div style={{ padding:"0 6px 3px" }}>
      <Zone label="Lord 채용관" sub="로고+공고2개 · 20분순환" color={C.green} active={hl==="lord"} slots={hl==="lord" ? 3 : null} />
    </div>
    <div style={{ padding:"0 6px 6px" }}>
      <Zone label="Knight 채용관" sub="로고+공고1개 · 20분순환" color={C.amber} active={hl==="knight"} slots={hl==="knight" ? 2 : null} />
    </div>
  </div>
);

// ─── PC 서브 목업 ─────────────────────────────────────────
const MockSub = ({ hl }) => (
  <div style={{ background:"#F8F9FA", borderRadius:10, overflow:"hidden", border:"1px solid #E0E4EC" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"6px 6px 3px" }}>
      <Zone label="커뮤니티 Pick" sub="PC 1780×528px · 4구좌" color={C.teal} active={hl==="commPick"} />
    </div>
    <div style={{ padding:"0 6px 3px", display:"flex", gap:4 }}>
      <div style={{ width:28, flexShrink:0, display:"flex", flexDirection:"column", gap:3 }}>
        <Zone label="날개" sub="90×154" color={C.pink} active={hl==="subwing"} style={{ padding:"8px 2px" }} />
        <Zone label="날개2" color={C.pink} active={hl==="subwing2"} style={{ padding:"8px 2px" }} />
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        <Zone label="Sword 채용관" sub="상단" color={C.blue} active={hl==="sword"} slots={hl==="sword" ? 3 : null} />
        <Zone label="Shield 채용관" sub="중단" color={C.green} active={hl==="shield"} slots={hl==="shield" ? 3 : null} />
        <Zone label="Armor 채용관" sub="하단" color={C.amber} active={hl==="armor"} slots={hl==="armor" ? 3 : null} />
        <Zone label="커뮤니티 미들띠" color={C.teal} active={hl==="commMid"} />
      </div>
      <div style={{ width:32, flexShrink:0 }}>
        <Zone label="서브 스카이 120×600" color={C.pink} active={hl==="subsky"} style={{ height:"100%", minHeight:100, padding:"5px 2px" }} />
      </div>
    </div>
    <div style={{ padding:"0 6px 6px" }}>
      <Zone label="서브 하단" sub="570×110px · 4구좌" color={C.gray} active={hl==="subbottom"} />
    </div>
  </div>
);

// ─── 모바일 목업 ──────────────────────────────────────────
const MockMobile = ({ hl }) => (
  <div style={{ width:160, margin:"0 auto", background:"#F8F9FA", borderRadius:18, overflow:"hidden", border:"3px solid #E0E4EC" }}>
    <div style={{ background:C.navy, padding:"7px", textAlign:"center" }}>
      <span style={{ color:"#fff", fontWeight:900, fontSize:11 }}>GAMEJOB</span>
    </div>
    <div style={{ padding:"5px" }}>
      <Zone label="모바일 메인띠" sub="624×210px · 3구좌" color={C.teal} active={hl==="mobMain"} style={{ marginBottom:3 }} />
      {["emperor","lord","knight"].map((n,i) => (
        <div key={n} style={{ background:[C.blueL,C.greenL,C.amberL][i], borderRadius:4, padding:"5px 7px", marginBottom:3, border:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9, color:[C.blue,C.green,C.amber][i], fontWeight:700 }}>{["Emperor","Lord","Knight"][i]} 채용관</span>
        </div>
      ))}
      <Zone label="커뮤니티 Pick" sub="640×240px · 4구좌" color={C.teal} active={hl==="commPick"} style={{ marginBottom:3 }} />
      <Zone label="모바일 서브띠" color={C.purple} active={hl==="mobSub"} style={{ marginBottom:3 }} />
    </div>
  </div>
);

// ─── 이력서 목업 ──────────────────────────────────────────
const MockResume = () => (
  <div style={{ background:"#F8F9FA", borderRadius:10, overflow:"hidden", border:"1px solid #E0E4EC" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"12px" }}>
      <div style={{ background:"#fff", borderRadius:8, padding:"12px", border:`2px solid ${C.pink}` }}>
        <div style={{ fontSize:10, color:C.pink, fontWeight:800, marginBottom:8 }}>▶ 이력서 열람 서비스</div>
        {["이력서 / 자기소개서","포트폴리오","이메일 / 연락처"].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:6, padding:"5px 7px", background:C.pinkL, borderRadius:5 }}>
            <div style={{ width:14, height:14, borderRadius:"50%", background:C.pink, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:9, color:"#fff", fontWeight:800 }}>✓</span>
            </div>
            <span style={{ fontSize:9.5, color:C.navy, fontWeight:500 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop:8, padding:"7px", background:C.pink, borderRadius:5, textAlign:"center" }}>
          <span style={{ fontSize:9.5, color:"#fff", fontWeight:700 }}>입사제의 보내기</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── 상품 상세 콘텐츠 ─────────────────────────────────────
function ProductDetail({ item }) {
  const [tabIdx, setTabIdx] = useState(0);
  if (!item) return null;
  const tab = item.priceTabs[Math.min(tabIdx, item.priceTabs.length-1)];

  return (
    <div>
      {/* 브레드크럼 */}
      <div style={{ fontSize:12, color:C.gray, marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>
        <span>{item.section}</span>
        <span style={{ color:C.border }}>›</span>
        <span style={{ color:C.navy, fontWeight:600 }}>{item.category}</span>
      </div>

      {/* 타이틀 */}
      <h2 style={{ fontSize:28, fontWeight:800, color:C.navy, margin:"0 0 8px", letterSpacing:"-0.03em" }}>
        {item.category} · {item.title}
      </h2>
      <p style={{ fontSize:13, color:C.gray, margin:"0 0 28px", lineHeight:1.7 }}>{item.desc}</p>

      {/* 지면 + 상세 */}
      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        background:C.white, borderRadius:16,
        border:`1px solid ${C.border}`,
        overflow:"hidden",
        boxShadow:"0 2px 12px rgba(23,37,61,0.06)",
        marginBottom:24,
      }}>
        {/* 좌 — 목업 */}
        <div style={{ background:"#F0F4FF", padding:"36px 32px", display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <Tag label={item.tag} color={item.tagColor} bg={item.tagBg || `${item.tagColor}18`} />
            <p style={{ fontSize:11, color:C.gray, marginTop:6, marginBottom:0 }}>지면 위치 {item.zoneLabel && `— ${item.zoneLabel}`}</p>
          </div>
          {item.mockup}
        </div>

        {/* 우 — 설명+가격 */}
        <div style={{ padding:"36px 36px", display:"flex", flexDirection:"column", gap:22 }}>
          <div>
            <Tag label={item.category} color={C.gray} bg={C.grayL} />
            <h3 style={{ fontSize:24, fontWeight:800, color:C.navy, margin:"10px 0 0", letterSpacing:"-0.03em" }}>{item.title}</h3>
          </div>

          {/* 특징 */}
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:"0.08em", marginBottom:10, textTransform:"uppercase" }}>상품 특징</p>
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {item.features.map((f,i) => (
                <div key={i} style={{ display:"flex", gap:9, alignItems:"flex-start" }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:item.tagBg||C.blueL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                    <span style={{ fontSize:9, fontWeight:800, color:item.tagColor||C.blue }}>✓</span>
                  </div>
                  <span style={{ fontSize:13.5, color:C.text, lineHeight:1.55 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 가격 탭 */}
          <div style={{ flex:1 }}>
            {item.priceTabs.length > 1 && (
              <div style={{ display:"flex", gap:6, marginBottom:12, flexWrap:"wrap" }}>
                {item.priceTabs.map((t,i) => (
                  <button key={i} onClick={() => setTabIdx(i)} style={{
                    padding:"5px 13px", fontSize:12, fontWeight:600, borderRadius:7, cursor:"pointer",
                    border: tabIdx===i ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                    background: tabIdx===i ? C.blueL : C.white,
                    color: tabIdx===i ? C.blue : C.gray,
                  }}>{t.label}</button>
                ))}
              </div>
            )}
            <div>
              {tab.rows.map((r,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:13, color: i===0 ? C.navy : C.gray }}>{r.label}</span>
                  <div style={{ textAlign:"right" }}>
                    {r.sub && <div style={{ fontSize:11, color:"#9CA3AF", textDecoration:"line-through" }}>{r.sub}</div>}
                    <span style={{ fontSize: i===0 ? 16 : 14, fontWeight: i===0 ? 700 : 500, color: i===0 ? C.blue : C.navy }}>{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
            {tab.note && <p style={{ fontSize:11, color:"#9CA3AF", marginTop:7 }}>{tab.note}</p>}
          </div>

          {/* 시작가 */}
          <div style={{ background:C.navyD, borderRadius:12, padding:"15px 20px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.5)" }}>{item.startLabel}</span>
            <span style={{ fontSize:22, fontWeight:800, color:"#fff" }}>{item.startPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 패키지 상세 ──────────────────────────────────────────
function PackageDetail({ pkg }) {
  if (!pkg) return null;
  const included = packageCompareRows.filter(r => pkg.includedIds.includes(r.id));
  const byZone = included.reduce((acc,r) => { if(!acc[r.zone]) acc[r.zone]=[]; acc[r.zone].push(r.name); return acc; }, {});

  return (
    <div>
      <div style={{ fontSize:12, color:C.gray, marginBottom:16 }}>
        <span>배너 패키지 상품</span>
        <span style={{ color:C.border, margin:"0 6px" }}>›</span>
        <span style={{ color:C.navy, fontWeight:600 }}>{pkg.name}</span>
      </div>
      <h2 style={{ fontSize:28, fontWeight:800, color:C.navy, margin:"0 0 8px", letterSpacing:"-0.03em" }}>{pkg.name}</h2>
      <p style={{ fontSize:13, color:C.gray, margin:"0 0 28px" }}>{pkg.tagline}</p>

      <div style={{
        display:"grid", gridTemplateColumns:"1fr 1fr",
        background:C.white, borderRadius:16,
        border: pkg.highlight ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
        overflow:"hidden", boxShadow:"0 2px 12px rgba(23,37,61,0.06)",
        marginBottom:24,
      }}>
        <div style={{ background:C.navyD, padding:"36px 36px", display:"flex", flexDirection:"column", gap:18 }}>
          {pkg.highlight && (
            <span style={{ display:"inline-block", alignSelf:"flex-start", background:C.blue, borderRadius:5, padding:"3px 12px", fontSize:11, fontWeight:800, color:"#fff", letterSpacing:"0.08em" }}>BEST</span>
          )}
          <div>
            <p style={{ fontSize:32, fontWeight:900, color:"#fff", margin:0 }}>{fw(pkg.price)}</p>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:5 }}>1주 · VAT포함</p>
          </div>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.75, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:18, margin:0 }}>{pkg.desc}</p>
        </div>
        <div style={{ padding:"36px 36px", display:"flex", flexDirection:"column", gap:18 }}>
          <p style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:"0.08em", margin:0, textTransform:"uppercase" }}>포함 지면</p>
          {Object.entries(byZone).map(([zone,items]) => (
            <div key={zone}>
              <p style={{ fontSize:12, color:C.gray, marginBottom:7, fontWeight:600 }}>{zone}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {items.map(item => <Chip key={item} color={C.blue} bg={C.blueL}>{item}</Chip>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// 패키지 비교표
function PackageCompare() {
  return (
    <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 2px 12px rgba(23,37,61,0.06)", marginBottom:24 }}>
      <div style={{ padding:"20px 28px", borderBottom:`1px solid ${C.border}` }}>
        <h3 style={{ fontSize:16, fontWeight:800, color:C.navy, margin:0 }}>패키지 포함 지면 비교</h3>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr>
              <th style={{ padding:"10px 16px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:12, borderBottom:`1px solid ${C.border}`, textAlign:"left", whiteSpace:"nowrap" }}>노출 위치</th>
              <th style={{ padding:"10px 16px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:12, borderBottom:`1px solid ${C.border}`, textAlign:"left" }}>배너명</th>
              {bannerPackages.map(p => (
                <th key={p.id} style={{ padding:"10px 16px", background:C.grayL, color:C.blue, fontWeight:700, fontSize:12, borderBottom:`1px solid ${C.border}`, textAlign:"center", whiteSpace:"nowrap" }}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packageCompareRows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:"8px 16px", color:C.gray, fontSize:12, whiteSpace:"nowrap" }}>{row.zone}</td>
                <td style={{ padding:"8px 16px", color:C.navy, fontWeight:500 }}>{row.name}</td>
                {bannerPackages.map(pkg => (
                  <td key={pkg.id} style={{ padding:"8px 16px", textAlign:"center" }}>
                    {pkg.includedIds.includes(row.id)
                      ? <span style={{ color:C.blue, fontSize:15, fontWeight:700 }}>●</span>
                      : <span style={{ color:C.border }}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background:C.navyD }}>
              <td colSpan={2} style={{ padding:"12px 16px", fontWeight:700, fontSize:14, color:"#fff" }}>금액 (VAT포함 · 1주)</td>
              {bannerPackages.map(p => (
                <td key={p.id} style={{ padding:"12px 16px", textAlign:"center", fontWeight:800, fontSize:15, color:"#fff" }}>{fw(p.price)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize:11, color:"#9CA3AF", padding:"8px 16px", margin:0 }}>* 최소 신청기간 1주 이상</p>
    </div>
  );
}

// ─── 상품 데이터 빌드 ─────────────────────────────────────
const buildAllItems = () => {
  const items = [];

  // 메인 채용관
  mainBooth.tiers.forEach((tier, ti) => {
    const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
    items.push({
      id: tier.id,
      section: "전체 상품 안내",
      category: "메인 채용관",
      title: tier.name,
      tag: tier.position + " 노출",
      tagColor: colors[ti][0], tagBg: colors[ti][1],
      desc: `게임잡 메인화면 최상단 ${tier.position}에 노출되는 프리미엄 채용관 상품입니다.`,
      zoneLabel: "메인",
      mockup: <MockMain hl={tier.id} />,
      features: tier.features,
      priceTabs: [
        { label:"결합 (PC+M)", rows: tier.combined.map(r => ({ label:r.period, value:fw(r.price), sub:fw(r.original) })), note:"* 개별 합산 대비 35% 할인 / 최소 1주" },
        { label:"개별 (PC/M)", rows: tier.individual.map(r => ({ label:r.period, value:fw(r.price) })), note:"* 최소 신청기간 1주" },
        ...(tier.combined[0].topfix ? [{ label:"상단고정 옵션", rows: tier.combined.filter(r=>r.topfix).map(r => ({ label:r.period, value:fw(r.topfixTotal), sub:fw(r.topfix)+" (옵션만)" })), note:"* 결합 기준 상단고정 포함가" }] : []),
      ],
      startPrice: fw(tier.individual[0].price),
      startLabel: "개별 1주 시작가",
    });
  });

  // 채용정보 채용관
  recruitBooth.tiers.forEach((tier, ti) => {
    const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
    items.push({
      id: tier.id,
      section: "전체 상품 안내",
      category: "채용정보 채용관",
      title: tier.name,
      tag: tier.position + " 노출",
      tagColor: colors[ti][0], tagBg: colors[ti][1],
      desc: `채용정보 탭 ${tier.position}에 고정 노출되는 효율형 채용관 상품입니다.`,
      zoneLabel: "채용정보",
      mockup: <MockSub hl={tier.id} />,
      features: ["채용정보 탭 "+tier.position+" 고정 노출","기업로고 + 기업명 + 채용제목 노출","최근 수정공고 순 상단 배치","메인채용관 구매 시 자동 포함"],
      priceTabs: [{ label:"일 단가", rows: [{ label:"결합 (PC+M)", value:tier.combined.toLocaleString()+"원/일" },{ label:"개별 (PC/M)", value:tier.individual.toLocaleString()+"원/일" }], note:"* 최소 신청기간 1주 / 메인채용관 구매 시 자동 포함" }],
      startPrice: tier.individual.toLocaleString()+"원",
      startLabel: "개별 일 단가",
    });
  });

  // 배너 광고
  bannerAds.filter(b => b.price).forEach(b => {
    const dColor = { "PC":[C.blue,C.blueL], "PC+M":[C.purple,C.purpleL], "Mobile":[C.teal,C.tealL] };
    const dc = dColor[b.device] || dColor["PC"];
    const isSub = ["subwing","subwing2","subsky","subbottom","commPick","commMid"].includes(b.id);
    const mockup = b.device === "Mobile" ? <MockMobile hl={b.id} /> : isSub ? <MockSub hl={b.id} /> : <MockMain hl={b.id} />;
    items.push({
      id: b.id,
      section: "전체 상품 안내",
      category: "배너 광고",
      title: b.name,
      tag: b.device + " · " + b.zone,
      tagColor: dc[0], tagBg: dc[1],
      desc: `${b.zone} 영역에 노출되는 ${b.device} 배너 광고 상품입니다. (${b.size} · ${b.rolling})`,
      zoneLabel: b.zone,
      mockup,
      features: ["노출 사이즈: "+b.size,"노출 방식: "+b.rolling, b.device==="Mobile" ? "모바일 전용 지면" : b.device==="PC+M" ? "PC·모바일 동시 노출" : "PC 전용 지면","최소 신청: 1주 이상"],
      priceTabs: [{ label:"1주 단가", rows: [{ label:"1주 (7일)", value:fw(b.price) }], note:"* VAT 포함 / 최소 1주 이상" }],
      startPrice: fw(b.price),
      startLabel: "1주 기준",
    });
  });

  // 이력서
  items.push({
    id: "resume",
    section: "전체 상품 안내",
    category: "이력서 열람",
    title: "이력서 열람 서비스",
    tag: "인재 DB",
    tagColor: C.pink, tagBg: C.pinkL,
    desc: "게임잡 회원의 이력서·포트폴리오·연락처를 열람하고 직접 입사제의할 수 있는 서비스입니다.",
    zoneLabel: "",
    mockup: <MockResume />,
    features: ["이력서·자기소개서·포트폴리오 열람","이메일·연락처 확인 가능","게임잡 회원에게 직접 입사제의","메인채용관 구매 시 기본 건수 제공"],
    priceTabs: [{ label:"건수별 가격", rows: resumeService.plans.map(p => ({ label:p.count+"건 · "+p.days+"일", value:fw(p.price), sub:Math.round(p.price/p.count).toLocaleString()+"원/건" })), note:"* VAT 포함 / 이력서 원본 열람 시 건수 차감" }],
    startPrice: fw(resumeService.plans[0].price),
    startLabel: "10건 · 3일 시작가",
  });

  return items;
};

const ALL_ITEMS = buildAllItems();

// ─── LNB 컴포넌트 ────────────────────────────────────────
function LNB({ groups, activeId, onSelect }) {
  return (
    <nav style={{ width:180, flexShrink:0, display:"flex", flexDirection:"column", gap:4 }}>
      {groups.map(g => (
        <div key={g.group} style={{ marginBottom:8 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, padding:"6px 10px", marginBottom:2 }}>
            <span style={{ fontSize:12, color:C.gray }}>{g.icon}</span>
            <span style={{ fontSize:12, fontWeight:700, color:C.navy }}>{g.group}</span>
          </div>
          {g.items.map(item => (
            <button key={item.id} onClick={() => onSelect(item.id)} style={{
              display:"block", width:"100%", textAlign:"left",
              padding:"6px 10px 6px 26px", fontSize:13, fontWeight: activeId===item.id ? 700 : 400,
              color: activeId===item.id ? C.blue : C.gray,
              background: activeId===item.id ? C.blueL : "transparent",
              border:"none", borderRadius:6, cursor:"pointer",
              borderLeft: activeId===item.id ? `3px solid ${C.blue}` : "3px solid transparent",
              transition:"all .12s",
            }}>{item.label}</button>
          ))}
        </div>
      ))}
    </nav>
  );
}

// ─── 앱 ──────────────────────────────────────────────────
export default function AdCenter() {
  const [tab, setTab] = useState("all");
  const [activeId, setActiveId] = useState(ALL_ITEMS[0].id);

  const currentItem = ALL_ITEMS.find(i => i.id === activeId);
  const currentPkg = bannerPackages.find(p => p.id === activeId);

  const handleSelect = (id) => {
    setActiveId(id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabChange = (v) => {
    setTab(v);
    if (v === "all") setActiveId(ALL_ITEMS[0].id);
    else setActiveId(bannerPackages[0].id);
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif" }}>
      {/* 헤더 */}
      <header style={{ background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontWeight:900, fontSize:20, color:C.navy, letterSpacing:"-0.03em" }}>GAMEJOB</span>
              <span style={{ fontSize:14, color:C.gray, fontWeight:500 }}>채용 마케팅 상품안내</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {[["all","전체상품 소개서"],["package","패키지 상품 소개서"]].map(([v,l]) => (
                <button key={v} onClick={() => handleTabChange(v)} style={{
                  padding:"7px 16px", fontSize:12.5, fontWeight:600, borderRadius:7, cursor:"pointer",
                  border: tab===v ? `1.5px solid ${C.navy}` : `1px solid ${C.border}`,
                  background: tab===v ? C.navy : C.white,
                  color: tab===v ? "#fff" : C.gray,
                  display:"flex", alignItems:"center", gap:6,
                }}>
                  <span style={{ fontSize:11 }}>{v==="all" ? "□" : "◈"}</span>{l}
                </button>
              ))}
              <a href="mailto:ad@gamejob.co.kr" style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:C.navy, border:"none",
                borderRadius:8, padding:"8px 16px", color:"#fff",
                fontSize:12.5, fontWeight:700, textDecoration:"none", marginLeft:4,
              }}>☎ 광고문의</a>
            </div>
          </div>
        </div>
      </header>

      {/* 바디 */}
      <div style={{ maxWidth:1240, margin:"0 auto", padding:"28px clamp(20px,4vw,48px) 80px", display:"flex", gap:32, alignItems:"flex-start" }}>
        {/* LNB */}
        <div style={{ width:192, flexShrink:0, position:"sticky", top:80 }}>
          <LNB
            groups={tab === "all" ? LNB_ALL : LNB_PKG}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>

        {/* 메인 콘텐츠 */}
        <div style={{ flex:1, minWidth:0 }}>
          {tab === "all" && currentItem && <ProductDetail item={currentItem} />}
          {tab === "package" && (
            <div>
              {currentPkg && <PackageDetail pkg={currentPkg} />}
              <PackageCompare />
            </div>
          )}
        </div>
      </div>

      {/* 푸터 */}
      <footer style={{ borderTop:`1px solid ${C.border}`, background:C.white, padding:"18px clamp(20px,4vw,48px)", textAlign:"center" }}>
        <p style={{ fontSize:12.5, color:C.gray, margin:0 }}>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ fontSize:11.5, color:"#9CA3AF", margin:"4px 0 0" }}>* 모든 가격 VAT포함 / 최소 신청기간: 채용관 1주, 배너 1주 이상</p>
      </footer>
    </div>
  );
}
