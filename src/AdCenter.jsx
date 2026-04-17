import { useState } from "react";
import {
  mainBooth, recruitBooth, bannerAds, bannerPackages,
  packageCompareRows, resumeService, won,
} from "./data/products";

const C = {
  navy:    "#17253D",
  navyD:   "#0F1A2E",
  blue:    "#1C6BCC",
  blueL:   "#EBF3FF",
  blueMid: "#4A90D9",
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
  bg:      "#F5F7FA",
  text:    "#17253D",
};

const fw = (n) => n?.toLocaleString("ko-KR") + "원";

// ─── 공통 UI ─────────────────────────────────────────────

const Tag = ({ label, color = C.blue, bg = C.blueL }) => (
  <span style={{ display:"inline-block", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:4, color, background:bg, letterSpacing:"0.05em" }}>{label}</span>
);

const Chip = ({ children, color = C.blue, bg = C.blueL }) => (
  <span style={{ display:"inline-block", fontSize:11, padding:"2px 8px", borderRadius:20, background:bg, color, fontWeight:600 }}>{children}</span>
);

const NavBtn = ({ dir, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} style={{
    width:42, height:42, borderRadius:"50%",
    border:`1.5px solid ${disabled ? C.border : C.navy}`,
    background: disabled ? C.grayL : C.navy,
    color: disabled ? C.gray : C.white,
    cursor: disabled ? "default" : "pointer",
    display:"flex", alignItems:"center", justifyContent:"center",
    fontSize:16, fontWeight:700, flexShrink:0, transition:"all .15s",
  }}>{dir === "prev" ? "←" : "→"}</button>
);

const DotBtn = ({ active, onClick }) => (
  <button onClick={onClick} style={{
    width: active ? 20 : 7, height:7, borderRadius:4,
    background: active ? C.blue : C.border,
    border:"none", cursor:"pointer", padding:0, transition:"all .25s",
  }} />
);

// ─── 목업 공통 ────────────────────────────────────────────

const BrowserChrome = () => (
  <div style={{ background:"#E8EAED", padding:"7px 12px", display:"flex", alignItems:"center", gap:8, borderBottom:"1px solid #D1D5DB" }}>
    <div style={{ display:"flex", gap:5 }}>
      {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => (
        <div key={i} style={{ width:9, height:9, borderRadius:"50%", background:c }} />
      ))}
    </div>
    <div style={{ flex:1, background:"#fff", borderRadius:4, padding:"3px 10px", fontSize:9.5, color:"#6B7280", textAlign:"center", border:"1px solid #E5E7EB" }}>
      gamejob.co.kr
    </div>
  </div>
);

const GNB = () => (
  <div style={{ background:C.navy, padding:"7px 14px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
    <span style={{ color:"#fff", fontWeight:900, fontSize:12, letterSpacing:"-0.02em" }}>GAMEJOB</span>
    <div style={{ display:"flex", gap:10 }}>
      {["채용정보","커뮤니티","기업정보","인재정보"].map(m => (
        <span key={m} style={{ color:"rgba(255,255,255,0.6)", fontSize:8.5 }}>{m}</span>
      ))}
    </div>
  </div>
);

// 하이라이트 블록
const HlBlock = ({ label, sub, color, active, style={} }) => (
  <div style={{
    borderRadius:6, padding:"7px 10px", textAlign:"center",

    border: active ? `1.5px solid ${color}` : "1.5px solid transparent",
    transition:"all .2s", ...style,
  }}>
    <div style={{ fontSize:9, fontWeight: active ? 800 : 400, color: active ? color : "#8892A4" }}>
      {active ? `★ ${label}` : label}
    </div>
    {sub && <div style={{ fontSize:8, color: active ? `${color}bb` : "#5A6478", marginTop:1 }}>{sub}</div>}
  </div>
);

// ─── PC 메인 목업 ─────────────────────────────────────────
const MockupPCMain = ({ hl }) => (
  <div style={{ background:"#F8F9FA", borderRadius:10, overflow:"hidden", border:"1px solid #E5E9F0" }}>
    <BrowserChrome />
    {hl === "curtain" && (
      <div style={{ background:"rgba(0,0,0,0.75)", padding:"8px", textAlign:"center" }}>
        <div style={{ background:C.blue, borderRadius:5, padding:"5px 0", fontSize:9, fontWeight:700, color:"#fff", width:"80%", margin:"0 auto" }}>
          ★ 메인 커튼 — 전면 팝업 배너
        </div>
      </div>
    )}
    <GNB />
    {/* 탑 + 우측 */}
    <div style={{ display:"flex", gap:0 }}>
      <HlBlock label="메인 탑" sub="2560×1000px · 3구좌" color={C.green} active={hl==="maintop"} style={{ flex:1, margin:"5px 0 5px 5px", borderRadius:6 }} />
      <HlBlock label="메인 우측" color={C.amber} active={hl==="mainright"} style={{ width:52, margin:"5px 5px 5px 4px", borderRadius:6 }} />
    </div>
    {/* 상단띠 */}
    <HlBlock label="메인 상단띠" sub="1080×70px" color={C.purple} active={hl==="topstrip"} style={{ margin:"0 5px 4px", borderRadius:5 }} />
    {/* Emperor */}
    <div style={{ display:"flex", margin:"0 5px 4px", gap:3 }}>
      <HlBlock label="백스킨(좌)" color={C.amber} active={hl==="backskin"} style={{ width:26, borderRadius:5, padding:"10px 2px" }} />
      <div style={{ flex:1 }}>
        <HlBlock label="Emperor 채용관" sub="로고+공고3개 · 20분순환" color={C.blue} active={hl==="emperor"} style={{ marginBottom:3 }} />
        {hl==="emperor" && (
          <div style={{ display:"flex", gap:3 }}>
            {[1,2,3].map(i => <div key={i} style={{ flex:1, height:14, background:`${C.blue}33`, borderRadius:3 }} />)}
          </div>
        )}
      </div>
      <HlBlock label="백스킨(우)" color={C.amber} active={hl==="backskin"} style={{ width:26, borderRadius:5, padding:"10px 2px" }} />
    </div>
    {/* 미들띠 */}
    <HlBlock label="메인 미들띠" sub="1080×70px" color={C.purple} active={hl==="midstrip"} style={{ margin:"0 5px 4px", borderRadius:5 }} />
    {/* Lord */}
    <HlBlock label="Lord 채용관" sub="로고+공고2개 · 20분순환" color={C.green} active={hl==="lord"} style={{ margin:"0 5px 4px", borderRadius:5 }} />
    {/* Knight */}
    <HlBlock label="Knight 채용관" sub="로고+공고1개" color={C.amber} active={hl==="knight"} style={{ margin:"0 5px 8px", borderRadius:5 }} />
  </div>
);

// ─── PC 서브 목업 ─────────────────────────────────────────
const MockupPCSub = ({ hl }) => (
  <div style={{ background:"#F8F9FA", borderRadius:10, overflow:"hidden" }}>
    <BrowserChrome />
    <GNB />
    <HlBlock label="커뮤니티 Pick" sub="1780×528px · 4구좌" color={C.teal} active={hl==="commPick"} style={{ margin:"5px 5px 4px", borderRadius:6 }} />
    <div style={{ display:"flex", gap:3, margin:"0 5px 4px" }}>
      <div style={{ width:26 }}>
        <HlBlock label="날개" sub="90×154" color={C.pink} active={hl==="subwing"} style={{ borderRadius:4, marginBottom:3, padding:"8px 2px" }} />
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
        <HlBlock label="Sword 채용관" sub="상단" color={C.blue} active={hl==="sword"} />
        <HlBlock label="Shield 채용관" sub="중단" color={C.green} active={hl==="shield"} />
        <HlBlock label="Armor 채용관" sub="하단" color={C.amber} active={hl==="armor"} />
        <HlBlock label="커뮤니티 미들띠" color={C.teal} active={hl==="commMid"} />
      </div>
      <div style={{ width:30 }}>
        <HlBlock label="서브스카이 120×600" color={C.pink} active={hl==="subsky"} style={{ height:"100%", minHeight:90, padding:"4px 2px", writingMode:"vertical-rl" }} />
      </div>
    </div>
    <HlBlock label="서브 하단" sub="570×110px · 4구좌" color={C.gray} active={hl==="subbottom"} style={{ margin:"0 5px 8px", borderRadius:5 }} />
  </div>
);

// ─── 모바일 목업 ──────────────────────────────────────────
const MockupMobile = ({ hl }) => (
  <div style={{ width:150, margin:"0 auto", background:"#F8F9FA", borderRadius:16, overflow:"hidden", border:"3px solid #E5E7EB" }}>
    <div style={{ background:C.navy, padding:"6px", textAlign:"center" }}>
      <span style={{ color:"#fff", fontWeight:900, fontSize:10 }}>GAMEJOB</span>
    </div>
    <div style={{ padding:"4px 5px", display:"flex", flexDirection:"column", gap:3 }}>
      <HlBlock label="모바일 메인띠" sub="624×210px" color={C.teal} active={hl==="mobMain"} />
      {["Emperor","Lord","Knight"].map((n,i) => (
        <div key={n} style={{ background:[C.blueL,C.greenL,C.amberL][i], borderRadius:4, padding:"5px 6px", border:`1px solid ${[C.border,C.border,C.border][i]}` }}>
          <span style={{ fontSize:8, color:[C.blue,C.green,C.amber][i], fontWeight:600 }}>{n} 채용관</span>
        </div>
      ))}
      <HlBlock label="커뮤니티 Pick" sub="640×240px" color={C.teal} active={hl==="commPick"} />
      <HlBlock label="모바일 서브띠" color={C.purple} active={hl==="mobSub"} style={{ marginBottom:4 }} />
    </div>
  </div>
);

// ─── 이력서 목업 ──────────────────────────────────────────
const MockupResume = () => (
  <div style={{ background:"#F8F9FA", borderRadius:10, overflow:"hidden" }}>
    <BrowserChrome />
    <GNB />
    <div style={{ padding:"10px" }}>
      <div style={{ background:"#F0F2F5", borderRadius:8, padding:"10px", border:`1.5px solid ${C.pink}` }}>
        <div style={{ fontSize:9, color:"#F48FB1", fontWeight:700, marginBottom:8 }}>★ 이력서 열람 서비스</div>
        {["이력서 / 자기소개서","포트폴리오","이메일 / 연락처"].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5, padding:"4px 6px", background:"#E5E7EB", borderRadius:4 }}>
            <div style={{ width:14, height:14, borderRadius:"50%", background:`${C.pink}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:8, color:"#F48FB1" }}>✓</span>
            </div>
            <span style={{ fontSize:8, color:"#B0BEC5" }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop:8, padding:"5px", background:C.pink, borderRadius:4, textAlign:"center" }}>
          <span style={{ fontSize:8.5, color:"#fff", fontWeight:700 }}>입사제의 보내기</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── 슬라이드 데이터 빌드 ─────────────────────────────────

const buildSlides = () => {
  const slides = [];

  // 메인 채용관
  mainBooth.tiers.forEach((tier, ti) => {
    const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
    slides.push({
      category: "메인 채용관",
      id: tier.id,
      mockup: <MockupPCMain hl={tier.id} />,
      tag: tier.position + " 노출",
      tagColor: colors[ti][0], tagBg: colors[ti][1],
      title: tier.name,
      features: tier.features,
      priceTabs: [
        {
          label: "결합 (PC+M)",
          rows: tier.combined.map(r => ({ label:r.period, value:fw(r.price), sub:fw(r.original) })),
          note: "* 개별 합산 대비 35% 할인 / 최소 1주",
        },
        {
          label: "개별 (PC/M)",
          rows: tier.individual.map(r => ({ label:r.period, value:fw(r.price) })),
          note: "* 최소 신청기간 1주",
        },
        ...(tier.combined[0].topfix ? [{
          label: "상단고정 옵션",
          rows: tier.combined.filter(r=>r.topfix).map(r => ({ label:r.period, value:fw(r.topfixTotal), sub:fw(r.topfix)+" (옵션만)" })),
          note: "* 결합 기준 상단고정 포함가",
        }] : []),
      ],
      startPrice: fw(tier.individual[0].price),
      startLabel: "개별 1주 시작가",
    });
  });

  // 채용정보 채용관
  recruitBooth.tiers.forEach((tier, ti) => {
    const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
    slides.push({
      category: "채용정보 채용관",
      id: tier.id,
      mockup: <MockupPCSub hl={tier.id} />,
      tag: tier.position + " 노출",
      tagColor: colors[ti][0], tagBg: colors[ti][1],
      title: tier.name,
      features: [
        "채용정보 탭 " + tier.position + " 고정 노출",
        "기업로고 + 기업명 + 채용제목 노출",
        "최근 수정공고 순 상단 배치",
        "메인채용관 구매 시 자동 포함",
      ],
      priceTabs: [{
        label: "일 단가",
        rows: [
          { label: "결합 (PC+M)", value: tier.combined.toLocaleString() + "원/일" },
          { label: "개별 (PC/M)", value: tier.individual.toLocaleString() + "원/일" },
        ],
        note: "* 최소 신청기간 1주 / 메인채용관 구매 시 자동 포함",
      }],
      startPrice: tier.individual.toLocaleString() + "원",
      startLabel: "개별 일 단가",
    });
  });

  // 배너 광고
  bannerAds.filter(b => b.price).forEach(b => {
    const dColor = { "PC":[C.blue,C.blueL], "PC+M":[C.purple,C.purpleL], "Mobile":[C.teal,C.tealL] };
    const dc = dColor[b.device] || dColor["PC"];
    const mockupMap = {
      "Mobile": <MockupMobile hl={b.id} />,
      "sub":    <MockupPCSub hl={b.id} />,
      "main":   <MockupPCMain hl={b.id} />,
    };
    const isSub = ["subwing","subwing2","subsky","subbottom","commPick","commMid"].includes(b.id);
    const mockup = b.device === "Mobile" ? mockupMap["Mobile"] : isSub ? mockupMap["sub"] : mockupMap["main"];
    slides.push({
      category: "배너 광고",
      id: b.id,
      mockup,
      tag: b.device + " · " + b.zone,
      tagColor: dc[0], tagBg: dc[1],
      title: b.name,
      features: [
        "노출 사이즈: " + b.size,
        "노출 방식: " + b.rolling,
        b.device === "Mobile" ? "모바일 전용 지면" : b.device === "PC+M" ? "PC·모바일 동시 노출" : "PC 전용 지면",
        "최소 신청: 1주 이상",
      ],
      priceTabs: [{
        label: "1주 단가",
        rows: [{ label:"1주 (7일)", value:fw(b.price) }],
        note: "* VAT 포함 / 최소 1주 이상",
      }],
      startPrice: fw(b.price),
      startLabel: "1주 기준",
    });
  });

  // 이력서 열람
  slides.push({
    category: "이력서 열람",
    id: "resume",
    mockup: <MockupResume />,
    tag: "인재 DB",
    tagColor: C.pink, tagBg: C.pinkL,
    title: "이력서 열람 서비스",
    features: resumeService.desc.split(". ").filter(Boolean).map(s => s + (s.endsWith(".") ? "" : ".")),
    priceTabs: [{
      label: "건수별 가격",
      rows: resumeService.plans.map(p => ({
        label: p.count + "건 · " + p.days + "일",
        value: fw(p.price),
        sub: Math.round(p.price/p.count).toLocaleString() + "원/건",
      })),
      note: "* " + resumeService.note,
    }],
    startPrice: fw(resumeService.plans[0].price),
    startLabel: "10건 · 3일 시작가",
  });

  return slides;
};

// ─── 슬라이드 카드 ────────────────────────────────────────

function SlideCard({ slide }) {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = slide.priceTabs[tabIdx] || slide.priceTabs[0];

  return (
    <div style={{
      display:"grid", gridTemplateColumns:"1fr 1fr", gap:0,
      background:C.white, borderRadius:16, border:`1px solid ${C.border}`,
      overflow:"hidden", minHeight:460,
    }}>
      {/* 좌 — 목업 */}
      <div style={{ background:"#F0F4FF", padding:"28px 22px", display:"flex", flexDirection:"column", justifyContent:"center", gap:14 }}>
        <div>
          <Tag label={slide.tag} color={slide.tagColor} bg={`${slide.tagColor}30`} />
          <p style={{ fontSize:10.5, color:C.gray, marginTop:5, marginBottom:0 }}>
            {slide.category} — 지면 위치
          </p>
        </div>
        {slide.mockup}
      </div>

      {/* 우 — 설명+가격 */}
      <div style={{ padding:"28px 28px", display:"flex", flexDirection:"column", gap:18 }}>
        {/* 제목 */}
        <div>
          <Tag label={slide.category} color={C.gray} bg={C.grayL} />
          <h2 style={{ fontSize:21, fontWeight:800, color:C.navy, margin:"8px 0 0", letterSpacing:"-0.03em" }}>
            {slide.title}
          </h2>
        </div>

        {/* 특징 */}
        <div>
          <p style={{ fontSize:10.5, fontWeight:700, color:C.gray, letterSpacing:"0.08em", marginBottom:8, textTransform:"uppercase" }}>상품 특징</p>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {slide.features.map((f,i) => (
              <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                <div style={{ width:17, height:17, borderRadius:"50%", background:slide.tagBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                  <span style={{ fontSize:9, fontWeight:800, color:slide.tagColor }}>✓</span>
                </div>
                <span style={{ fontSize:12.5, color:C.text, lineHeight:1.55 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 가격 탭 */}
        <div style={{ flex:1 }}>
          {slide.priceTabs.length > 1 && (
            <div style={{ display:"flex", gap:5, marginBottom:10 }}>
              {slide.priceTabs.map((t,i) => (
                <button key={i} onClick={() => setTabIdx(i)} style={{
                  padding:"4px 11px", fontSize:11, fontWeight:600, borderRadius:6, cursor:"pointer",
                  border: tabIdx===i ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                  background: tabIdx===i ? C.blueL : C.white,
                  color: tabIdx===i ? C.blue : C.gray,
                }}>{t.label}</button>
              ))}
            </div>
          )}
          <div>
            {tab.rows.map((r,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"7px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:12, color:i===0?C.text:C.gray }}>{r.label}</span>
                <div style={{ textAlign:"right" }}>
                  {r.sub && <div style={{ fontSize:10, color:C.gray, textDecoration:"line-through" }}>{r.sub}</div>}
                  <span style={{ fontSize:i===0?14:12.5, fontWeight:i===0?700:500, color:i===0?C.blue:C.text }}>{r.value}</span>
                </div>
              </div>
            ))}
          </div>
          {tab.note && <p style={{ fontSize:10.5, color:"#9CA3AF", marginTop:6 }}>{tab.note}</p>}
        </div>

        {/* 시작가 */}
        <div style={{ background:C.navyD, borderRadius:10, padding:"13px 18px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:11.5, color:"rgba(255,255,255,0.55)" }}>{slide.startLabel}</span>
          <span style={{ fontSize:20, fontWeight:800, color:C.white }}>{slide.startPrice}</span>
        </div>
      </div>
    </div>
  );
}

// ─── 패키지 카드 ──────────────────────────────────────────

function PackageCard({ pkg }) {
  const included = packageCompareRows.filter(r => pkg.includedIds.includes(r.id));
  const byZone = included.reduce((acc,r) => { if(!acc[r.zone]) acc[r.zone]=[]; acc[r.zone].push(r.name); return acc; }, {});

  return (
    <div style={{
      display:"grid", gridTemplateColumns:"1fr 1fr", gap:0,
      background:C.white, borderRadius:16, overflow:"hidden",
      border: pkg.highlight ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
      minHeight:400,
    }}>
      <div style={{ background:C.navy, padding:"32px 28px", display:"flex", flexDirection:"column", gap:18 }}>
        {pkg.highlight && (
          <span style={{ display:"inline-block", alignSelf:"flex-start", background:C.blue, borderRadius:4, padding:"3px 10px", fontSize:10, fontWeight:800, color:"#fff", letterSpacing:"0.08em" }}>BEST</span>
        )}
        <div>
          <h2 style={{ fontSize:24, fontWeight:900, color:C.white, margin:"0 0 6px", letterSpacing:"-0.03em" }}>{pkg.name}</h2>
          <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.45)", lineHeight:1.6, margin:0 }}>{pkg.tagline}</p>
        </div>
        <div>
          <p style={{ fontSize:30, fontWeight:900, color:C.white, margin:0 }}>{fw(pkg.price)}</p>
          <p style={{ fontSize:11, color:C.gray, marginTop:4 }}>1주 · VAT포함</p>
        </div>
        <p style={{ fontSize:12.5, color:"rgba(255,255,255,0.55)", lineHeight:1.7, borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16, margin:0 }}>
          {pkg.desc}
        </p>
      </div>
      <div style={{ padding:"28px", display:"flex", flexDirection:"column", gap:16 }}>
        <p style={{ fontSize:10.5, fontWeight:700, color:C.gray, letterSpacing:"0.08em", margin:0, textTransform:"uppercase" }}>포함 지면</p>
        {Object.entries(byZone).map(([zone,items]) => (
          <div key={zone}>
            <p style={{ fontSize:11, color:C.gray, marginBottom:6, fontWeight:600 }}>{zone}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {items.map(item => <Chip key={item} color={C.blue} bg={C.blueL}>{item}</Chip>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PackageCompare() {
  return (
    <div style={{ background:C.white, borderRadius:16, border:`1px solid ${C.border}`, overflow:"hidden" }}>
      <div style={{ padding:"18px 24px", borderBottom:`1px solid ${C.border}` }}>
        <h3 style={{ fontSize:15, fontWeight:800, color:C.navy, margin:0 }}>패키지 포함 지면 비교</h3>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12 }}>
          <thead>
            <tr>
              <th style={{ padding:"9px 14px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:11, borderBottom:`1px solid ${C.border}`, textAlign:"left", whiteSpace:"nowrap" }}>위치</th>
              <th style={{ padding:"9px 14px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:11, borderBottom:`1px solid ${C.border}`, textAlign:"left" }}>배너명</th>
              {bannerPackages.map(p => (
                <th key={p.id} style={{ padding:"9px 14px", background:C.grayL, color:C.blue, fontWeight:700, fontSize:11, borderBottom:`1px solid ${C.border}`, textAlign:"center", whiteSpace:"nowrap" }}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packageCompareRows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:"7px 14px", color:C.gray, fontSize:11, whiteSpace:"nowrap" }}>{row.zone}</td>
                <td style={{ padding:"7px 14px", color:C.navy, fontWeight:500 }}>{row.name}</td>
                {bannerPackages.map(pkg => (
                  <td key={pkg.id} style={{ padding:"7px 14px", textAlign:"center" }}>
                    {pkg.includedIds.includes(row.id)
                      ? <span style={{ color:C.blue, fontSize:15, fontWeight:700 }}>●</span>
                      : <span style={{ color:C.border }}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background:C.navyD }}>
              <td colSpan={2} style={{ padding:"11px 14px", fontWeight:700, fontSize:13, color:C.white }}>금액 (VAT포함 · 1주)</td>
              {bannerPackages.map(p => (
                <td key={p.id} style={{ padding:"11px 14px", textAlign:"center", fontWeight:800, fontSize:14, color:C.white }}>{fw(p.price)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize:11, color:"#9CA3AF", padding:"8px 14px", margin:0 }}>* 최소 신청기간 1주 이상</p>
    </div>
  );
}

// ─── 슬라이더 ─────────────────────────────────────────────

function Slider({ slides, renderSlide }) {
  const [idx, setIdx] = useState(0);
  const categories = [...new Set(slides.map(s => s.category || s.name))];
  const activeCategory = slides[idx]?.category || slides[idx]?.name;

  return (
    <div style={{ padding:"0 28px" }}>
      {/* 카테고리 탭 */}
      <div style={{ display:"flex", gap:7, marginBottom:20, flexWrap:"wrap" }}>
        {categories.map(cat => {
          const active = cat === activeCategory;
          return (
            <button key={cat} onClick={() => setIdx(slides.findIndex(s => (s.category||s.name)===cat))}
              style={{
                padding:"6px 14px", fontSize:12, fontWeight:600, borderRadius:7, cursor:"pointer",
                border: active ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
                background: active ? C.blueL : C.white,
                color: active ? C.blue : C.gray, transition:"all .15s",
              }}>{cat}</button>
          );
        })}
      </div>

      {/* 슬라이드 + 좌우 화살표 */}
      <div style={{ position:"relative" }}>
        {renderSlide(slides[idx])}
        {/* 왼쪽 화살표 */}
        <div style={{
          position:"absolute", left:-22, top:"50%", transform:"translateY(-50%)",
          zIndex:10,
        }}>
          <NavBtn dir="prev" onClick={() => setIdx(i => Math.max(0,i-1))} disabled={idx===0} />
        </div>
        {/* 오른쪽 화살표 */}
        <div style={{
          position:"absolute", right:-22, top:"50%", transform:"translateY(-50%)",
          zIndex:10,
        }}>
          <NavBtn dir="next" onClick={() => setIdx(i => Math.min(slides.length-1,i+1))} disabled={idx===slides.length-1} />
        </div>
      </div>

      {/* 점 네비게이션 */}
      <div style={{ display:"flex", gap:5, alignItems:"center", justifyContent:"center", marginTop:16, flexWrap:"wrap" }}>
        {slides.map((_,i) => <DotBtn key={i} active={i===idx} onClick={() => setIdx(i)} />)}
      </div>
      <p style={{ textAlign:"center", fontSize:12, color:C.gray, marginTop:8 }}>{idx+1} / {slides.length}</p>
    </div>
  );
}

// ─── 앱 ──────────────────────────────────────────────────

const allSlides = buildSlides();
const pkgSlides = bannerPackages.map(p => ({ ...p }));

export default function AdCenter() {
  const [tab, setTab] = useState("all");

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif" }}>
      <header style={{ background:C.navyD, borderBottom:"1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ maxWidth:1060, margin:"0 auto", padding:"0 clamp(16px,4vw,40px)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:14 }}>
              <span style={{ fontWeight:900, fontSize:19, color:C.white, letterSpacing:"-0.03em" }}>GAMEJOB</span>
              <div style={{ width:1, height:20, background:"rgba(255,255,255,0.18)" }} />
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:C.white }}>광고센터</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.38)" }}>채용 마케팅 상품 안내</div>
              </div>
            </div>
            <a href="mailto:ad@gamejob.co.kr" style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)",
              borderRadius:8, padding:"7px 14px", color:C.white,
              fontSize:12, fontWeight:600, textDecoration:"none",
            }}>✉ 광고 문의</a>
          </div>
          <nav style={{ display:"flex", marginTop:16 }}>
            {[["all","전체 상품 소개"],["package","패키지 상품 소개"]].map(([v,l]) => (
              <button key={v} onClick={() => setTab(v)} style={{
                padding:"12px 20px", fontSize:13.5, fontWeight:700,
                background:"transparent", border:"none", cursor:"pointer",
                color: tab===v ? C.white : "rgba(255,255,255,0.4)",
                borderBottom: tab===v ? `2.5px solid ${C.blueMid}` : "2.5px solid transparent",
                transition:"all .15s", whiteSpace:"nowrap",
              }}>{l}</button>
            ))}
          </nav>
        </div>
      </header>

      <main style={{ maxWidth:1060, margin:"0 auto", padding:"32px clamp(16px,4vw,40px) 80px" }}>
        {tab === "all" && (
          <Slider slides={allSlides} renderSlide={s => <SlideCard slide={s} />} />
        )}
        {tab === "package" && (
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            <Slider slides={pkgSlides} renderSlide={p => <PackageCard pkg={p} />} />
            <PackageCompare />
          </div>
        )}
      </main>

      <footer style={{ borderTop:`1px solid ${C.border}`, background:C.white, padding:"18px clamp(16px,4vw,40px)", textAlign:"center" }}>
        <p style={{ fontSize:12, color:C.gray, margin:0 }}>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ fontSize:11, color:"#9CA3AF", margin:"4px 0 0" }}>* 모든 가격 VAT포함 / 최소 신청기간: 채용관 1주, 배너 1주 이상</p>
      </footer>
    </div>
  );
}
