import { useState } from "react";
import {
  mainBooth, recruitBooth, bannerAds, bannerPackages,
  packageCompareRows, resumeService,
} from "./data/products";

// ─── 토큰 ────────────────────────────────────────────────
const C = {
  navy:    "#1B2B4B",
  blue:    "#2563EB",
  blueL:   "#EFF6FF",
  blueMd:  "#3B82F6",
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
  gray:    "#64748B",
  gray2:   "#94A3B8",
  grayL:   "#F8FAFC",
  border:  "#E2E8F0",
  border2: "#CBD5E1",
  white:   "#FFFFFF",
  bg:      "#F1F5F9",
  text:    "#1E293B",
  sub:     "#475569",
};

const fw = (n) => n?.toLocaleString("ko-KR") + "원";

// ─── LNB 데이터 ───────────────────────────────────────────
const LNB_ALL = [
  {
    group: "메인 채용관",
    items: mainBooth.tiers.map(t => ({ id: t.id, label: t.name.replace(" 채용관","") })),
  },
  {
    group: "채용정보 채용관",
    items: recruitBooth.tiers.map(t => ({ id: t.id, label: t.name.replace(" 채용관","") })),
  },
  {
    group: "배너 광고",
    items: bannerAds.filter(b => b.price).map(b => ({ id: b.id, label: b.name })),
  },
  {
    group: "이력서 열람",
    items: [{ id: "resume", label: "이력서 열람 서비스" }],
  },
];

const LNB_PKG = [
  {
    group: "배너 패키지",
    items: bannerPackages.map(p => ({ id: p.id, label: p.name })),
  },
];

// ─── 목업 공통 ───────────────────────────────────────────
const BrowserBar = () => (
  <div style={{ background:"#F1F3F4", padding:"6px 10px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid #DDE1E7" }}>
    <div style={{ display:"flex", gap:4 }}>
      {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <div key={i} style={{ width:9, height:9, borderRadius:"50%", background:c }} />)}
    </div>
    <div style={{ flex:1, background:"#fff", borderRadius:4, padding:"2px 8px", fontSize:9.5, color:"#94A3B8", textAlign:"center", border:"1px solid #E2E8F0" }}>
      gamejob.co.kr
    </div>
  </div>
);

const GNB = () => (
  <div style={{ background:C.navy, padding:"7px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
    <span style={{ color:"#fff", fontWeight:900, fontSize:11, letterSpacing:"-0.02em" }}>GAMEJOB</span>
    <div style={{ display:"flex", gap:10 }}>
      {["채용정보","커뮤니티","기업정보","인재정보"].map(m => (
        <span key={m} style={{ color:"rgba(255,255,255,0.45)", fontSize:8.5 }}>{m}</span>
      ))}
    </div>
  </div>
);

// 지면 존 블록
const Zone = ({ label, sub, color, active, style={}, slots, rolling }) => (
  <div style={{
    borderRadius:5, padding:"7px 9px",
    background: active ? `${color}12` : "#F1F5F9",
    border: active ? `1.5px solid ${color}` : "1px solid #E2E8F0",
    transition:"all .18s", ...style,
  }}>
    <div style={{ fontSize:9, fontWeight: active ? 700 : 400, color: active ? color : "#94A3B8", marginBottom: (active && slots) ? 6 : 0 }}>
      {active ? `▶ ${label}` : label}
      {sub && <span style={{ fontSize:8, fontWeight:400, marginLeft:4, opacity:0.75 }}>{sub}</span>}
      {active && rolling && <span style={{ fontSize:8, fontWeight:500, marginLeft:4, background:`${color}20`, padding:"1px 5px", borderRadius:3, color }}>{rolling}</span>}
    </div>
    {active && slots && (
      <div style={{ display:"flex", gap:3 }}>
        {Array.from({ length: slots }).map((_,i) => (
          <div key={i} style={{ flex:1, background:`${color}18`, border:`1px dashed ${color}66`, borderRadius:4, padding:"5px 3px" }}>
            <div style={{ background:`${color}35`, borderRadius:2, height:8, marginBottom:3, width:"50%", margin:"0 auto 3px" }} />
            <div style={{ background:`${color}22`, borderRadius:2, height:5, marginBottom:2 }} />
            <div style={{ background:`${color}22`, borderRadius:2, height:4, width:"75%" }} />
          </div>
        ))}
      </div>
    )}
  </div>
);

// ─── PC 메인 목업 (채용관 전용) ───────────────────────────
const MockMainBooth = ({ hl }) => (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    <GNB />
    {/* 상단띠 */}
    <div style={{ padding:"5px 5px 2px" }}>
      <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 6px", fontSize:8, color:"#CBD5E1", textAlign:"center" }}>메인 상단띠</div>
    </div>
    {/* Emperor */}
    <div style={{ padding:"2px 5px" }}>
      <Zone
        label="Emperor 채용관"
        sub="상단 · 로고+공고3개"
        color={C.blue}
        active={hl==="emperor"}
        slots={hl==="emperor" ? 4 : null}
        rolling={hl==="emperor" ? "20분순환" : null}
      />
    </div>
    {/* 미들띠 */}
    <div style={{ padding:"2px 5px" }}>
      <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 6px", fontSize:8, color:"#CBD5E1", textAlign:"center" }}>메인 미들띠</div>
    </div>
    {/* Lord */}
    <div style={{ padding:"2px 5px" }}>
      <Zone
        label="Lord 채용관"
        sub="중단 · 로고+공고2개"
        color={C.green}
        active={hl==="lord"}
        slots={hl==="lord" ? 3 : null}
        rolling={hl==="lord" ? "20분순환" : null}
      />
    </div>
    {/* Knight */}
    <div style={{ padding:"2px 5px 5px" }}>
      <Zone
        label="Knight 채용관"
        sub="하단 · 로고+공고1개"
        color={C.amber}
        active={hl==="knight"}
        slots={hl==="knight" ? 2 : null}
        rolling={hl==="knight" ? "20분순환" : null}
      />
    </div>
  </div>
);

// ─── 모바일 메인 목업 (채용관 전용) ──────────────────────
const MockMainBoothMobile = ({ hl }) => (
  <div style={{ width:160, margin:"0 auto", background:"#FAFAFA", borderRadius:16, overflow:"hidden", border:"2.5px solid #DDE1E7" }}>
    <div style={{ background:C.navy, padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ color:"#fff", fontWeight:900, fontSize:10, letterSpacing:"-0.02em" }}>GAMEJOB</span>
      <div style={{ display:"flex", gap:6 }}>
        {["채용정보","커뮤니티"].map(m => <span key={m} style={{ color:"rgba(255,255,255,0.45)", fontSize:7 }}>{m}</span>)}
      </div>
    </div>
    <div style={{ padding:"5px" }}>
      {/* 모바일 메인띠 */}
      <div style={{ background:"#F1F5F9", borderRadius:4, padding:"4px 6px", textAlign:"center", marginBottom:3 }}>
        <span style={{ fontSize:8, color:"#CBD5E1" }}>모바일 메인띠</span>
      </div>
      {/* Emperor */}
      <div style={{ marginBottom:3 }}>
        <Zone
          label="Emperor 채용관"
          sub="상단 · 공고3개"
          color={C.blue}
          active={hl==="emperor"}
          slots={hl==="emperor" ? 2 : null}
          rolling={hl==="emperor" ? "20분순환" : null}
        />
      </div>
      {/* Lord */}
      <div style={{ marginBottom:3 }}>
        <Zone
          label="Lord 채용관"
          sub="중단 · 공고2개"
          color={C.green}
          active={hl==="lord"}
          slots={hl==="lord" ? 2 : null}
          rolling={hl==="lord" ? "20분순환" : null}
        />
      </div>
      {/* Knight */}
      <div style={{ marginBottom:3 }}>
        <Zone
          label="Knight 채용관"
          sub="하단 · 공고1개"
          color={C.amber}
          active={hl==="knight"}
          slots={hl==="knight" ? 1 : null}
          rolling={hl==="knight" ? "20분순환" : null}
        />
      </div>
    </div>
  </div>
);

// ─── PC 메인 목업 (배너 전용) ─────────────────────────────
const MockMain = ({ hl }) => (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    {hl === "curtain" && (
      <div style={{ background:"rgba(15,26,46,0.82)", padding:"7px", textAlign:"center" }}>
        <div style={{ background:C.blue, borderRadius:4, padding:"5px 0", fontSize:8.5, fontWeight:700, color:"#fff", width:"80%", margin:"0 auto" }}>
          ▶ 메인 커튼 — 전면 팝업 (1구좌)
        </div>
      </div>
    )}
    <GNB />
    <div style={{ padding:"5px 5px 2px", display:"flex", gap:3 }}>
      <Zone label="메인 탑" sub="2560×1000" color={C.teal} active={hl==="maintop"} rolling={hl==="maintop"?"3구좌":null} style={{ flex:2 }} />
      <Zone label="메인 우측" color={C.amber} active={hl==="mainright"} style={{ flex:1 }} />
    </div>
    <div style={{ padding:"0 5px 2px" }}>
      <Zone label="메인 상단띠" sub="1080×70" color={C.purple} active={hl==="topstrip"} rolling={hl==="topstrip"?"3구좌":null} />
    </div>
    <div style={{ padding:"0 5px 2px", display:"flex", gap:3 }}>
      <Zone label="백스킨(좌)" color={C.amber} active={hl==="backskin"} style={{ width:24, flexShrink:0, padding:"10px 2px" }} />
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
        <Zone label="Emperor 채용관" sub="상단" color={C.blue} active={false} />
        <Zone label="Emperor Edge" sub="258×532" color={C.blue} active={hl==="emperiredge"} />
      </div>
      <Zone label="백스킨(우)" color={C.amber} active={hl==="backskin"} style={{ width:24, flexShrink:0, padding:"10px 2px" }} />
    </div>
    <div style={{ padding:"0 5px 2px" }}>
      <Zone label="메인 미들띠" sub="1080×70" color={C.purple} active={hl==="midstrip"} rolling={hl==="midstrip"?"3구좌":null} />
    </div>
    <div style={{ padding:"0 5px 2px" }}>
      <Zone label="Lord 채용관" sub="중단" color={C.green} active={false} />
    </div>
    <div style={{ padding:"0 5px 5px" }}>
      <Zone label="Knight 채용관" sub="하단" color={C.amber} active={false} />
    </div>
  </div>
);

// ─── PC 서브 목업 ─────────────────────────────────────────
const MockSub = ({ hl }) => (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"5px 5px 2px" }}>
      <Zone label="커뮤니티 Pick" sub="PC 1780×528" color={C.teal} active={hl==="commPick"} rolling={hl==="commPick"?"4구좌":null} />
    </div>
    <div style={{ padding:"0 5px 2px", display:"flex", gap:3 }}>
      <div style={{ width:24, flexShrink:0, display:"flex", flexDirection:"column", gap:2 }}>
        <Zone label="날개" sub="90×154" color={C.pink} active={hl==="subwing"} style={{ padding:"7px 2px" }} />
        <Zone label="날개2" color={C.pink} active={hl==="subwing2"} style={{ padding:"7px 2px" }} />
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
        <Zone label="Sword 채용관" sub="상단" color={C.blue} active={hl==="sword"} slots={hl==="sword"?3:null} />
        <Zone label="Shield 채용관" sub="중단" color={C.green} active={hl==="shield"} slots={hl==="shield"?3:null} />
        <Zone label="Armor 채용관" sub="하단" color={C.amber} active={hl==="armor"} slots={hl==="armor"?3:null} />
        <Zone label="커뮤니티 미들띠" color={C.teal} active={hl==="commMid"} />
      </div>
      <div style={{ width:28, flexShrink:0 }}>
        <Zone label="서브스카이 120×600" color={C.pink} active={hl==="subsky"} rolling={hl==="subsky"?"4구좌":null} style={{ height:"100%", minHeight:90, padding:"4px 2px", fontSize:7 }} />
      </div>
    </div>
    <div style={{ padding:"0 5px 5px" }}>
      <Zone label="서브 하단" sub="570×110" color={C.gray} active={hl==="subbottom"} rolling={hl==="subbottom"?"4구좌":null} />
    </div>
  </div>
);

// ─── 모바일 목업 ──────────────────────────────────────────
const MockMobile = ({ hl }) => (
  <div style={{ width:150, margin:"0 auto", background:"#FAFAFA", borderRadius:16, overflow:"hidden", border:"2.5px solid #DDE1E7" }}>
    <div style={{ background:C.navy, padding:"6px", textAlign:"center" }}>
      <span style={{ color:"#fff", fontWeight:900, fontSize:10 }}>GAMEJOB</span>
    </div>
    <div style={{ padding:"4px" }}>
      <Zone label="모바일 메인띠" sub="624×210" color={C.teal} active={hl==="mobMain"} rolling={hl==="mobMain"?"3구좌":null} style={{ marginBottom:2 }} />
      {["emperor","lord","knight"].map((n,i) => (
        <div key={n} style={{ background:[C.blueL,C.greenL,C.amberL][i], borderRadius:4, padding:"4px 6px", marginBottom:2, border:`1px solid ${C.border}` }}>
          <span style={{ fontSize:8.5, color:[C.blue,C.green,C.amber][i], fontWeight:700 }}>{["Emperor","Lord","Knight"][i]} 채용관</span>
        </div>
      ))}
      <Zone label="커뮤니티 Pick" sub="640×240" color={C.teal} active={hl==="commPick"} rolling={hl==="commPick"?"4구좌":null} style={{ marginBottom:2, marginTop:2 }} />
      <Zone label="모바일 서브띠" color={C.purple} active={hl==="mobSub"} style={{ marginBottom:2 }} />
    </div>
  </div>
);

// ─── 이력서 목업 ──────────────────────────────────────────
const MockResume = () => (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"10px" }}>
      <div style={{ background:"#fff", borderRadius:7, padding:"11px", border:`1.5px solid ${C.pink}` }}>
        <div style={{ fontSize:9.5, color:C.pink, fontWeight:700, marginBottom:7 }}>▶ 이력서 열람 서비스</div>
        {["이력서 / 자기소개서","포트폴리오","이메일 / 연락처"].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5, padding:"4px 7px", background:C.pinkL, borderRadius:4 }}>
            <div style={{ width:13, height:13, borderRadius:"50%", background:C.pink, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:8, color:"#fff", fontWeight:800 }}>✓</span>
            </div>
            <span style={{ fontSize:9, color:C.text, fontWeight:500 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop:7, padding:"6px", background:C.pink, borderRadius:4, textAlign:"center" }}>
          <span style={{ fontSize:9, color:"#fff", fontWeight:700 }}>입사제의 보내기</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── 상품 데이터 빌드 ─────────────────────────────────────
const buildAllItems = () => {
  const items = [];

  mainBooth.tiers.forEach((tier, ti) => {
    const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
    const boothMockup = (
      <div style={{ display:"flex", gap:12, alignItems:"flex-start" }}>
        <div style={{ flex:1 }}>
          <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:5, textAlign:"center" }}>PC</p>
          <MockMainBooth hl={tier.id} />
        </div>
        <div style={{ width:160, flexShrink:0 }}>
          <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:5, textAlign:"center" }}>Mobile</p>
          <MockMainBoothMobile hl={tier.id} />
        </div>
      </div>
    );
    items.push({
      id: tier.id, section:"전체 상품 안내", category:"메인 채용관",
      title: tier.name, tag: tier.position+" 노출",
      tagColor: colors[ti][0], tagBg: colors[ti][1],
      desc: `게임잡 메인화면 최상단 — 기업 로고 + 대표공고를 직접게재.\nEmperor · Lord · Knight 3단계 중 ${["최상위","중단","하단"][ti]} 노출.`,
      zoneLabel:"메인",
      mockup: boothMockup,
      features: tier.features,
      priceTabs: [
        { label:"결합 (PC+M)", rows: tier.combined.map(r => ({ label:r.period, value:fw(r.price), sub:fw(r.original) })), note:"* 개별 합산 대비 35% 할인 / 최소 1주" },
        { label:"개별 (PC/M)", rows: tier.individual.map(r => ({ label:r.period, value:fw(r.price) })), note:"* 최소 신청기간 1주" },
        ...(tier.combined[0].topfix ? [{ label:"상단고정 옵션", rows: tier.combined.filter(r=>r.topfix).map(r => ({ label:r.period, value:fw(r.topfixTotal), sub:fw(r.topfix)+" (옵션)" })), note:"* 결합 기준 상단고정 포함가" }] : []),
      ],
      startPrice: fw(tier.individual[0].price), startLabel:"개별 1주 시작가",
    });
  });

  recruitBooth.tiers.forEach((tier, ti) => {
    const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
    items.push({
      id: tier.id, section:"전체 상품 안내", category:"채용정보 채용관",
      title: tier.name, tag: tier.position+" 노출",
      tagColor: colors[ti][0], tagBg: colors[ti][1],
      desc: `채용정보 탭 ${tier.position}에 고정 노출되는 효율형 채용관.\n메인채용관 구매 시 자동 포함됩니다.`,
      zoneLabel:"채용정보",
      mockup: <MockSub hl={tier.id} />,
      features: ["채용정보 탭 "+tier.position+" 고정 노출","기업로고 + 기업명 + 채용제목 노출","최근 수정공고 순 상단 배치","메인채용관 구매 시 자동 포함"],
      priceTabs: [{ label:"일 단가", rows: [{ label:"결합 (PC+M)", value:tier.combined.toLocaleString()+"원/일" },{ label:"개별 (PC/M)", value:tier.individual.toLocaleString()+"원/일" }], note:"* 최소 신청기간 1주 / 메인채용관 구매 시 자동 포함" }],
      startPrice: tier.individual.toLocaleString()+"원", startLabel:"개별 일 단가",
    });
  });

  bannerAds.filter(b => b.price).forEach(b => {
    const dColor = { "PC":[C.blue,C.blueL], "PC+M":[C.purple,C.purpleL], "Mobile":[C.teal,C.tealL] };
    const dc = dColor[b.device] || dColor["PC"];
    const isSub = ["subwing","subwing2","subsky","subbottom","commPick","commMid"].includes(b.id);
    const mockup = b.device==="Mobile" ? <MockMobile hl={b.id} /> : isSub ? <MockSub hl={b.id} /> : <MockMain hl={b.id} />;
    items.push({
      id: b.id, section:"전체 상품 안내", category:"배너 광고",
      title: b.name, tag: b.device+" · "+b.zone,
      tagColor: dc[0], tagBg: dc[1],
      desc: `${b.zone} 영역 ${b.device} 배너 광고 상품.\n사이즈 ${b.size} · ${b.rolling}`,
      zoneLabel: b.zone, mockup,
      features: ["노출 사이즈: "+b.size,"노출 방식: "+b.rolling, b.device==="Mobile"?"모바일 전용":b.device==="PC+M"?"PC+모바일 동시":"PC 전용","최소 신청 1주 이상"],
      priceTabs: [{ label:"1주 단가", rows: [{ label:"1주 (7일)", value:fw(b.price) }], note:"* VAT 포함 / 최소 1주 이상" }],
      startPrice: fw(b.price), startLabel:"1주 기준",
    });
  });

  items.push({
    id:"resume", section:"전체 상품 안내", category:"이력서 열람",
    title:"이력서 열람 서비스", tag:"인재 DB",
    tagColor:C.pink, tagBg:C.pinkL,
    desc:"게임잡 회원의 이력서·포트폴리오·연락처를 열람하고\n직접 입사제의할 수 있는 서비스입니다.",
    zoneLabel:"", mockup:<MockResume />,
    features:["이력서·자기소개서·포트폴리오 열람","이메일·연락처 확인 가능","게임잡 회원에게 직접 입사제의","메인채용관 구매 시 기본 건수 제공"],
    priceTabs:[{ label:"건수별 가격", rows: resumeService.plans.map(p=>({ label:p.count+"건 · "+p.days+"일", value:fw(p.price), sub:Math.round(p.price/p.count).toLocaleString()+"원/건" })), note:"* VAT 포함 / 이력서 원본 열람 시 건수 차감" }],
    startPrice: fw(resumeService.plans[0].price), startLabel:"10건·3일 시작가",
  });

  return items;
};

const ALL_ITEMS = buildAllItems();

// ─── LNB ──────────────────────────────────────────────────
function LNB({ groups, activeId, onSelect }) {
  return (
    <nav>
      {groups.map(g => (
        <div key={g.group} style={{ marginBottom:6 }}>
          {/* 그룹 헤더 */}
          <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px 5px" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1" fill={C.gray2} />
              <rect x="8" y="1" width="5" height="5" rx="1" fill={C.gray2} />
              <rect x="1" y="8" width="5" height="5" rx="1" fill={C.gray2} />
              <rect x="8" y="8" width="5" height="5" rx="1" fill={C.gray2} />
            </svg>
            <span style={{ fontSize:12.5, fontWeight:700, color:C.text }}>{g.group}</span>
          </div>
          {/* 아이템 */}
          {g.items.map(item => {
            const active = activeId === item.id;
            return (
              <button key={item.id} onClick={() => onSelect(item.id)} style={{
                display:"block", width:"100%", textAlign:"left",
                padding:"6px 12px 6px 32px",
                fontSize:13, fontWeight: active ? 600 : 400,
                color: active ? C.blue : C.gray,
                background: active ? C.blueL : "transparent",
                border:"none",
                borderLeft: active ? `3px solid ${C.blue}` : "3px solid transparent",
                cursor:"pointer", transition:"all .1s",
              }}>{item.label}</button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

// ─── 상품 상세 ────────────────────────────────────────────
function ProductDetail({ item }) {
  const [tabIdx, setTabIdx] = useState(0);
  if (!item) return null;
  const tab = item.priceTabs[Math.min(tabIdx, item.priceTabs.length-1)];

  return (
    <div>
      {/* 브레드크럼 */}
      <div style={{ fontSize:12, color:C.gray2, marginBottom:14, display:"flex", alignItems:"center", gap:5 }}>
        <span style={{ cursor:"pointer" }}>{item.section}</span>
        <span style={{ color:C.border2 }}>›</span>
        <span style={{ color:C.sub }}>{item.category}</span>
      </div>

      {/* 타이틀 */}
      <h1 style={{ fontSize:26, fontWeight:800, color:C.text, margin:"0 0 8px", letterSpacing:"-0.02em" }}>
        {item.category} · {item.title.replace(item.category+" ","").replace(" 채용관","").replace("채용관","")}
      </h1>
      <p style={{ fontSize:13, color:C.gray, margin:"0 0 24px", lineHeight:1.7, whiteSpace:"pre-line" }}>{item.desc}</p>

      {/* 카드 */}
      <div style={{
        background:C.white, borderRadius:12,
        border:`1px solid ${C.border}`,
        overflow:"hidden",
        boxShadow:"0 1px 6px rgba(15,23,42,0.06)",
        marginBottom:20,
      }}>
        {/* 카드 헤더 */}
        <div style={{ padding:"12px 20px", borderBottom:`1px solid ${C.border}`, background:C.grayL, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:12, color:C.gray, fontWeight:500 }}>지면 위치</span>
          {item.zoneLabel && (
            <span style={{ fontSize:11, color:C.blue, background:C.blueL, padding:"2px 8px", borderRadius:4, fontWeight:600 }}>
              {item.zoneLabel}
            </span>
          )}
        </div>

        <div style={{ display:"grid", gridTemplateColumns: item.category==="메인 채용관" ? "3fr 2fr" : "1fr 1fr" }}>
          {/* 좌 — 목업 */}
          <div style={{ padding:"28px 24px", borderRight:`1px solid ${C.border}`, background:"#FAFCFF" }}>
            {item.mockup}
          </div>

          {/* 우 — 설명+가격 */}
          <div style={{ padding:"28px 28px", display:"flex", flexDirection:"column", gap:20 }}>
            {/* 상품명 + 태그 */}
            <div>
              <span style={{ display:"inline-block", fontSize:11, fontWeight:600, color:C.blue, background:C.blueL, padding:"2px 9px", borderRadius:4, marginBottom:8 }}>
                {item.category}
              </span>
              <h2 style={{ fontSize:22, fontWeight:800, color:C.text, margin:0, letterSpacing:"-0.02em" }}>{item.title}</h2>
            </div>

            {/* 특징 */}
            <div>
              <p style={{ fontSize:11.5, fontWeight:600, color:C.gray, marginBottom:10, letterSpacing:"0.02em" }}>상품 특징</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {item.features.map((f,i) => (
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:C.blueL, border:`1.5px solid ${C.blue}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize:13, color:C.sub, lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 가격 탭 */}
            <div style={{ flex:1 }}>
              {item.priceTabs.length > 1 && (
                <div style={{ display:"flex", gap:0, marginBottom:14, border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden", width:"fit-content" }}>
                  {item.priceTabs.map((t,i) => (
                    <button key={i} onClick={() => setTabIdx(i)} style={{
                      padding:"6px 14px", fontSize:12, fontWeight:600, cursor:"pointer",
                      border:"none",
                      background: tabIdx===i ? C.blue : C.white,
                      color: tabIdx===i ? "#fff" : C.gray,
                      borderRight: i < item.priceTabs.length-1 ? `1px solid ${C.border}` : "none",
                    }}>{t.label}</button>
                  ))}
                </div>
              )}
              <div>
                {tab.rows.map((r,i) => (
                  <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
                    <span style={{ fontSize:13, color: i===0 ? C.text : C.gray }}>{r.label}</span>
                    <div style={{ textAlign:"right" }}>
                      {r.sub && <div style={{ fontSize:11, color:"#CBD5E1", textDecoration:"line-through" }}>{r.sub}</div>}
                      <span style={{ fontSize: i===0 ? 17 : 14, fontWeight: i===0 ? 700 : 500, color: i===0 ? C.blue : C.text }}>{r.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              {tab.note && <p style={{ fontSize:11, color:C.gray2, marginTop:7 }}>{tab.note}</p>}
            </div>
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
    <div style={{ marginBottom:24 }}>
      <div style={{ fontSize:12, color:C.gray2, marginBottom:14, display:"flex", alignItems:"center", gap:5 }}>
        <span>패키지 상품 소개서</span>
        <span style={{ color:C.border2 }}>›</span>
        <span style={{ color:C.sub }}>{pkg.name}</span>
      </div>
      <h1 style={{ fontSize:26, fontWeight:800, color:C.text, margin:"0 0 8px", letterSpacing:"-0.02em" }}>{pkg.name}</h1>
      <p style={{ fontSize:13, color:C.gray, margin:"0 0 24px" }}>{pkg.tagline}</p>

      <div style={{
        background:C.white, borderRadius:12, border: pkg.highlight ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`,
        overflow:"hidden", boxShadow:"0 1px 6px rgba(15,23,42,0.06)",
      }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
          <div style={{ background:C.navy, padding:"32px 32px", display:"flex", flexDirection:"column", gap:16 }}>
            {pkg.highlight && (
              <span style={{ display:"inline-block", alignSelf:"flex-start", background:C.blue, borderRadius:4, padding:"3px 10px", fontSize:11, fontWeight:700, color:"#fff", letterSpacing:"0.06em" }}>BEST</span>
            )}
            <div>
              <p style={{ fontSize:28, fontWeight:900, color:"#fff", margin:0 }}>{fw(pkg.price)}</p>
              <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.35)", marginTop:4 }}>1주 · VAT포함</p>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.75, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:16, margin:0 }}>{pkg.desc}</p>
          </div>
          <div style={{ padding:"28px 28px", display:"flex", flexDirection:"column", gap:16 }}>
            <p style={{ fontSize:11.5, fontWeight:600, color:C.gray, margin:0, letterSpacing:"0.04em" }}>포함 지면</p>
            {Object.entries(byZone).map(([zone,items]) => (
              <div key={zone}>
                <p style={{ fontSize:12, color:C.sub, marginBottom:6, fontWeight:600 }}>{zone}</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                  {items.map(item => (
                    <span key={item} style={{ display:"inline-block", fontSize:11.5, padding:"3px 10px", borderRadius:20, background:C.blueL, color:C.blue, fontWeight:600 }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PackageCompare() {
  return (
    <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(15,23,42,0.06)" }}>
      <div style={{ padding:"16px 24px", borderBottom:`1px solid ${C.border}`, background:C.grayL }}>
        <h3 style={{ fontSize:15, fontWeight:700, color:C.text, margin:0 }}>패키지 포함 지면 비교</h3>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
          <thead>
            <tr>
              <th style={{ padding:"10px 16px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:11.5, borderBottom:`1px solid ${C.border}`, textAlign:"left", whiteSpace:"nowrap" }}>노출 위치</th>
              <th style={{ padding:"10px 16px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:11.5, borderBottom:`1px solid ${C.border}`, textAlign:"left" }}>배너명</th>
              {bannerPackages.map(p => (
                <th key={p.id} style={{ padding:"10px 16px", background:C.grayL, color:C.blue, fontWeight:700, fontSize:11.5, borderBottom:`1px solid ${C.border}`, textAlign:"center", whiteSpace:"nowrap" }}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packageCompareRows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:"8px 16px", color:C.gray2, fontSize:11.5, whiteSpace:"nowrap" }}>{row.zone}</td>
                <td style={{ padding:"8px 16px", color:C.text, fontWeight:500 }}>{row.name}</td>
                {bannerPackages.map(pkg => (
                  <td key={pkg.id} style={{ padding:"8px 16px", textAlign:"center" }}>
                    {pkg.includedIds.includes(row.id)
                      ? <span style={{ color:C.blue, fontSize:14, fontWeight:700 }}>●</span>
                      : <span style={{ color:C.border2, fontSize:13 }}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background:C.navy }}>
              <td colSpan={2} style={{ padding:"12px 16px", fontWeight:700, fontSize:13, color:"#fff" }}>금액 (VAT포함 · 1주)</td>
              {bannerPackages.map(p => (
                <td key={p.id} style={{ padding:"12px 16px", textAlign:"center", fontWeight:800, fontSize:14, color:"#fff" }}>{fw(p.price)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize:11, color:C.gray2, padding:"8px 16px", margin:0 }}>* 최소 신청기간 1주 이상</p>
    </div>
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
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const handleTabChange = (v) => {
    setTab(v);
    setActiveId(v === "all" ? ALL_ITEMS[0].id : bannerPackages[0].id);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  const HEADER_H = 93; // sticky 헤더 높이

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif", color:C.text }}>

      {/* ── 헤더 (풀 너비) ── */}
      <header style={{ background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 3px rgba(15,23,42,0.05)" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 40px" }}>

          {/* 1행: 로고 + 버튼 */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ fontWeight:900, fontSize:20, color:C.blue, letterSpacing:"-0.04em", fontStyle:"italic" }}>GAMEJOB</span>
              <span style={{ fontSize:13.5, color:C.sub, fontWeight:500 }}>채용 마케팅 상품안내</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              {[["all","전체상품 소개서"],["package","패키지 상품 소개서"]].map(([v,l]) => (
                <button key={v} onClick={() => handleTabChange(v)} style={{
                  padding:"6px 14px", fontSize:12, fontWeight:600, borderRadius:6, cursor:"pointer",
                  border: tab===v ? `1.5px solid ${C.navy}` : `1px solid ${C.border}`,
                  background: tab===v ? C.navy : C.white,
                  color: tab===v ? "#fff" : C.gray,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  <span style={{ fontSize:10, opacity:0.7 }}>{v==="all" ? "▤" : "◈"}</span>{l}
                </button>
              ))}
              <a href="mailto:ad@gamejob.co.kr" style={{
                display:"inline-flex", alignItems:"center", gap:5,
                background:C.navy, borderRadius:7, padding:"7px 16px",
                color:"#fff", fontSize:12.5, fontWeight:700, textDecoration:"none", marginLeft:2,
              }}>☎ 광고문의</a>
            </div>
          </div>

          {/* 2행: 탭 */}
          <nav style={{ display:"flex", gap:0, marginTop:10 }}>
            {(tab === "all"
              ? [["포지션 노출","포지션 노출"],["브랜딩 노출","브랜딩 노출"],["인재 확보","인재 확보"]]
              : [["패키지","패키지 상품"]]
            ).map(([v,l],i) => (
              <button key={v} style={{
                padding:"10px 18px", fontSize:13, fontWeight:600,
                background:"transparent", border:"none", cursor:"pointer",
                color: i===0 ? C.text : C.gray2,
                borderBottom: i===0 ? `2px solid ${C.text}` : "2px solid transparent",
                transition:"all .12s",
              }}>{l}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── 바디 (풀 너비, 내용은 1440 제한) ── */}
      <div style={{ display:"flex", minHeight:`calc(100vh - ${HEADER_H}px)` }}>

        {/* LNB — 고정 사이드바 */}
        <div style={{
          width:200, flexShrink:0,
          position:"sticky", top:HEADER_H,
          height:`calc(100vh - ${HEADER_H}px)`,
          overflowY:"auto",
          background:C.white,
          borderRight:`1px solid ${C.border}`,
          paddingTop:20,
        }}>
          {/* LNB 내용을 1440 기준 왼쪽 여백에 맞게 들여쓰기 */}
          <div style={{ paddingLeft: "max(16px, calc((100vw - 1440px) / 2))" }}>
            <LNB
              groups={tab === "all" ? LNB_ALL : LNB_PKG}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div style={{ flex:1, minWidth:0, overflowX:"hidden" }}>
          {/* 내부 최대 너비 1440 - LNB(200) */}
          <div style={{ maxWidth: 1240, padding:"28px 40px 80px" }}>
            {tab === "all" && currentItem && <ProductDetail item={currentItem} />}
            {tab === "package" && (
              <div>
                {currentPkg && <PackageDetail pkg={currentPkg} />}
                <PackageCompare />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 푸터 (풀 너비) ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, background:C.white, padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontSize:12, color:C.gray2, margin:0 }}>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ fontSize:11.5, color:C.gray2, margin:0 }}>* 모든 가격 VAT포함 / 최소 신청기간: 채용관 1주, 배너 1주 이상</p>
      </footer>
    </div>
  );
}
