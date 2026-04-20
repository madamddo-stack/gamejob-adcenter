import { useState } from "react";
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

// ─── 공통 ────────────────────────────────────────────────
const Tag = ({ label, color = C.blue, bg = C.blueL }) => (
  <span style={{ display:"inline-block", fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:4, color, background:bg, letterSpacing:"0.04em" }}>{label}</span>
);

const Chip = ({ children, color = C.blue, bg = C.blueL }) => (
  <span style={{ display:"inline-block", fontSize:11, padding:"2px 9px", borderRadius:20, background:bg, color, fontWeight:600 }}>{children}</span>
);

const SectionTitle = ({ label, sub }) => (
  <div style={{ marginBottom:24 }}>
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <div style={{ width:4, height:28, background:C.blue, borderRadius:2 }} />
      <h2 style={{ fontSize:22, fontWeight:800, color:C.navy, margin:0, letterSpacing:"-0.03em" }}>{label}</h2>
    </div>
    {sub && <p style={{ fontSize:13, color:C.gray, marginTop:6, marginLeft:16 }}>{sub}</p>}
  </div>
);

// ─── 목업 공통 ───────────────────────────────────────────
const BrowserBar = () => (
  <div style={{ background:"#E8EAED", padding:"8px 14px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid #D1D5DB" }}>
    <div style={{ display:"flex", gap:6 }}>
      {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <div key={i} style={{ width:11, height:11, borderRadius:"50%", background:c }} />)}
    </div>
    <div style={{ flex:1, background:"#fff", borderRadius:5, padding:"4px 12px", fontSize:11, color:"#6B7280", textAlign:"center", border:"1px solid #E5E7EB" }}>
      gamejob.co.kr
    </div>
  </div>
);

const GNB = () => (
  <div style={{ background:C.navy, padding:"9px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
    <span style={{ color:"#fff", fontWeight:900, fontSize:13, letterSpacing:"-0.02em" }}>GAMEJOB</span>
    <div style={{ display:"flex", gap:14 }}>
      {["채용정보","커뮤니티","기업정보","인재정보"].map(m => (
        <span key={m} style={{ color:"rgba(255,255,255,0.55)", fontSize:10 }}>{m}</span>
      ))}
    </div>
  </div>
);

const HlZone = ({ label, sub, color, active, style={} }) => (
  <div style={{
    borderRadius:7, padding:"9px 12px", textAlign:"center",
    background: active ? `${color}18` : "#F0F2F5",
    border: active ? `2px solid ${color}` : "1.5px solid #E5E7EB",
    transition:"all .2s", ...style,
  }}>
    <div style={{ fontSize:10, fontWeight: active ? 800 : 400, color: active ? color : "#9CA3AF" }}>
      {active ? `▶ ${label}` : label}
    </div>
    {sub && <div style={{ fontSize:9, color: active ? color : "#C4C9D4", marginTop:2, opacity: active ? 0.8 : 1 }}>{sub}</div>}
  </div>
);

// ─── PC 메인 목업 ─────────────────────────────────────────
const MockMain = ({ hl }) => (
  <div style={{ background:"#F8F9FA", borderRadius:12, overflow:"hidden", border:"1px solid #E0E4EC" }}>
    <BrowserBar />
    {hl === "curtain" && (
      <div style={{ background:"rgba(23,37,61,0.8)", padding:"10px", textAlign:"center" }}>
        <div style={{ background:C.blue, borderRadius:6, padding:"7px 0", fontSize:10, fontWeight:700, color:"#fff", width:"85%", margin:"0 auto" }}>
          ▶ 메인 커튼 — 전면 팝업 배너
        </div>
      </div>
    )}
    <GNB />
    <div style={{ padding:"8px 8px 4px", display:"flex", gap:5 }}>
      <HlZone label="메인 탑" sub="2560×1000px · 3구좌" color={C.green} active={hl==="maintop"} style={{ flex:2 }} />
      <HlZone label="메인 우측" color={C.amber} active={hl==="mainright"} style={{ flex:1 }} />
    </div>
    <div style={{ padding:"0 8px 4px" }}>
      <HlZone label="메인 상단띠" sub="1080×70px · 3구좌" color={C.purple} active={hl==="topstrip"} />
    </div>
    <div style={{ padding:"0 8px 4px", display:"flex", gap:5 }}>
      <HlZone label="백스킨(좌)" color={C.amber} active={hl==="backskin"} style={{ width:36, flexShrink:0, padding:"14px 4px" }} />
      <div style={{ flex:1 }}>
        <HlZone label="Emperor 채용관" sub="로고+공고3개 · 20분순환" color={C.blue} active={hl==="emperor"} />
        {hl==="emperor" && (
          <div style={{ display:"flex", gap:4, marginTop:4 }}>
            {[1,2,3].map(i => <div key={i} style={{ flex:1, height:18, background:`${C.blue}25`, borderRadius:4 }} />)}
          </div>
        )}
      </div>
      <HlZone label="백스킨(우)" color={C.amber} active={hl==="backskin"} style={{ width:36, flexShrink:0, padding:"14px 4px" }} />
    </div>
    <div style={{ padding:"0 8px 4px" }}>
      <HlZone label="메인 미들띠" sub="1080×70px · 3구좌" color={C.purple} active={hl==="midstrip"} />
    </div>
    <div style={{ padding:"0 8px 4px" }}>
      <HlZone label="Lord 채용관" sub="로고+공고2개 · 20분순환" color={C.green} active={hl==="lord"} />
    </div>
    <div style={{ padding:"0 8px 8px" }}>
      <HlZone label="Knight 채용관" sub="로고+공고1개 · 20분순환" color={C.amber} active={hl==="knight"} />
    </div>
  </div>
);

// ─── PC 서브 목업 ─────────────────────────────────────────
const MockSub = ({ hl }) => (
  <div style={{ background:"#F8F9FA", borderRadius:12, overflow:"hidden", border:"1px solid #E0E4EC" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"8px 8px 4px" }}>
      <HlZone label="커뮤니티 Pick" sub="PC 1780×528px · 4구좌" color={C.teal} active={hl==="commPick"} />
    </div>
    <div style={{ padding:"0 8px 4px", display:"flex", gap:5 }}>
      <div style={{ width:34, flexShrink:0, display:"flex", flexDirection:"column", gap:4 }}>
        <HlZone label="날개" sub="90×154" color={C.pink} active={hl==="subwing"} style={{ padding:"10px 3px" }} />
        <HlZone label="날개2" color={C.pink} active={hl==="subwing2"} style={{ padding:"10px 3px" }} />
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
        <HlZone label="Sword 채용관" sub="상단" color={C.blue} active={hl==="sword"} />
        <HlZone label="Shield 채용관" sub="중단" color={C.green} active={hl==="shield"} />
        <HlZone label="Armor 채용관" sub="하단" color={C.amber} active={hl==="armor"} />
        <HlZone label="커뮤니티 미들띠" color={C.teal} active={hl==="commMid"} />
      </div>
      <div style={{ width:34, flexShrink:0 }}>
        <HlZone label="서브 스카이 120×600" color={C.pink} active={hl==="subsky"} style={{ height:"100%", minHeight:110, padding:"6px 3px" }} />
      </div>
    </div>
    <div style={{ padding:"0 8px 8px" }}>
      <HlZone label="서브 하단" sub="570×110px · 4구좌" color={C.gray} active={hl==="subbottom"} />
    </div>
  </div>
);

// ─── 모바일 목업 ──────────────────────────────────────────
const MockMobile = ({ hl }) => (
  <div style={{ width:180, margin:"0 auto", background:"#F8F9FA", borderRadius:20, overflow:"hidden", border:"3px solid #E0E4EC" }}>
    <div style={{ background:C.navy, padding:"8px", textAlign:"center" }}>
      <span style={{ color:"#fff", fontWeight:900, fontSize:12 }}>GAMEJOB</span>
    </div>
    <div style={{ padding:"6px" }}>
      <HlZone label="모바일 메인띠" sub="624×210px · 3구좌" color={C.teal} active={hl==="mobMain"} style={{ marginBottom:4 }} />
      {["Emperor","Lord","Knight"].map((n,i) => (
        <div key={n} style={{ background:[C.blueL,C.greenL,C.amberL][i], borderRadius:5, padding:"6px 8px", marginBottom:4, border:`1px solid ${C.border}` }}>
          <span style={{ fontSize:9, color:[C.blue,C.green,C.amber][i], fontWeight:700 }}>{n} 채용관</span>
        </div>
      ))}
      <HlZone label="커뮤니티 Pick" sub="640×240px · 4구좌" color={C.teal} active={hl==="commPick"} style={{ marginBottom:4 }} />
      <HlZone label="모바일 서브띠" color={C.purple} active={hl==="mobSub"} style={{ marginBottom:2 }} />
    </div>
  </div>
);

// ─── 이력서 목업 ──────────────────────────────────────────
const MockResume = () => (
  <div style={{ background:"#F8F9FA", borderRadius:12, overflow:"hidden", border:"1px solid #E0E4EC" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"14px" }}>
      <div style={{ background:"#fff", borderRadius:10, padding:"14px", border:`2px solid ${C.pink}` }}>
        <div style={{ fontSize:11, color:C.pink, fontWeight:800, marginBottom:10 }}>▶ 이력서 열람 서비스</div>
        {["이력서 / 자기소개서","포트폴리오","이메일 / 연락처"].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7, padding:"6px 8px", background:C.pinkL, borderRadius:6 }}>
            <div style={{ width:16, height:16, borderRadius:"50%", background:C.pink, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:9, color:"#fff", fontWeight:800 }}>✓</span>
            </div>
            <span style={{ fontSize:10, color:C.navy, fontWeight:500 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop:10, padding:"8px", background:C.pink, borderRadius:6, textAlign:"center" }}>
          <span style={{ fontSize:10, color:"#fff", fontWeight:700 }}>입사제의 보내기</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── 상품 카드 (좌목업 + 우설명) ─────────────────────────
function ProductCard({ mockup, tag, tagColor, tagBg, category, title, features, priceTabs, startPrice, startLabel, reverse=false }) {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = priceTabs[Math.min(tabIdx, priceTabs.length-1)];

  return (
    <div style={{
      display:"grid",
      gridTemplateColumns: reverse ? "1fr 1fr" : "1fr 1fr",
      background:C.white, borderRadius:20,
      border:`1px solid ${C.border}`,
      overflow:"hidden",
      boxShadow:"0 2px 12px rgba(23,37,61,0.06)",
    }}>
      {/* 목업 패널 */}
      <div style={{
        background:"#F0F4FF",
        padding:"40px 36px",
        display:"flex", flexDirection:"column",
        justifyContent:"center", gap:16,
        order: reverse ? 2 : 1,
      }}>
        <div>
          <Tag label={tag} color={tagColor} bg={tagBg || `${tagColor}18`} />
          <p style={{ fontSize:12, color:C.gray, marginTop:7, marginBottom:0 }}>{category} — 지면 위치</p>
        </div>
        {mockup}
      </div>

      {/* 설명 패널 */}
      <div style={{
        padding:"40px 40px",
        display:"flex", flexDirection:"column", gap:24,
        order: reverse ? 1 : 2,
      }}>
        <div>
          <Tag label={category} color={C.gray} bg={C.grayL} />
          <h3 style={{ fontSize:26, fontWeight:800, color:C.navy, margin:"10px 0 0", letterSpacing:"-0.03em" }}>{title}</h3>
        </div>

        {/* 특징 */}
        <div>
          <p style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:"0.08em", marginBottom:12, textTransform:"uppercase" }}>상품 특징</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {features.map((f,i) => (
              <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:20, height:20, borderRadius:"50%", background:tagBg||C.blueL, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                  <span style={{ fontSize:10, fontWeight:800, color:tagColor||C.blue }}>✓</span>
                </div>
                <span style={{ fontSize:14, color:C.text, lineHeight:1.55 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 가격 탭 */}
        <div style={{ flex:1 }}>
          {priceTabs.length > 1 && (
            <div style={{ display:"flex", gap:6, marginBottom:14, flexWrap:"wrap" }}>
              {priceTabs.map((t,i) => (
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
              <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"baseline", padding:"9px 0", borderBottom:`1px solid ${C.border}` }}>
                <span style={{ fontSize:13, color: i===0 ? C.navy : C.gray }}>{r.label}</span>
                <div style={{ textAlign:"right" }}>
                  {r.sub && <div style={{ fontSize:11, color:"#9CA3AF", textDecoration:"line-through" }}>{r.sub}</div>}
                  <span style={{ fontSize: i===0 ? 16 : 14, fontWeight: i===0 ? 700 : 500, color: i===0 ? C.blue : C.navy }}>{r.value}</span>
                </div>
              </div>
            ))}
          </div>
          {tab.note && <p style={{ fontSize:11, color:"#9CA3AF", marginTop:8 }}>{tab.note}</p>}
        </div>

        {/* 시작가 */}
        <div style={{ background:C.navyD, borderRadius:12, padding:"16px 22px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:13, color:"rgba(255,255,255,0.55)" }}>{startLabel}</span>
          <span style={{ fontSize:22, fontWeight:800, color:"#fff" }}>{startPrice}</span>
        </div>
      </div>
    </div>
  );
}

// ─── 카테고리 섹션 ────────────────────────────────────────
function CategorySection({ title, sub, children }) {
  return (
    <section style={{ marginBottom:72 }}>
      <SectionTitle label={title} sub={sub} />
      <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
        {children}
      </div>
    </section>
  );
}

// ─── 전체 상품 페이지 ─────────────────────────────────────
function AllProducts() {
  return (
    <div>
      {/* 메인 채용관 */}
      <CategorySection
        title="메인 채용관"
        sub="게임잡 메인화면 최상단 — 기업 로고 + 대표공고를 직접 게재. Emperor · Lord · Knight 3단계 선택."
      >
        {mainBooth.tiers.map((tier, ti) => {
          const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
          return (
            <ProductCard
              key={tier.id}
              reverse={ti % 2 === 1}
              mockup={<MockMain hl={tier.id} />}
              tag={tier.position + " 노출"}
              tagColor={colors[ti][0]}
              tagBg={colors[ti][1]}
              category="메인 채용관"
              title={tier.name}
              features={tier.features}
              priceTabs={[
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
              ]}
              startPrice={fw(tier.individual[0].price)}
              startLabel="개별 1주 시작가"
            />
          );
        })}
      </CategorySection>

      {/* 채용정보 채용관 */}
      <CategorySection
        title="채용정보 채용관"
        sub="채용정보 탭 내 직종·지역·경력 조건 기반 타깃 노출. 메인채용관 구매 시 자동 포함."
      >
        {recruitBooth.tiers.map((tier, ti) => {
          const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
          return (
            <ProductCard
              key={tier.id}
              reverse={ti % 2 === 1}
              mockup={<MockSub hl={tier.id} />}
              tag={tier.position + " 노출"}
              tagColor={colors[ti][0]}
              tagBg={colors[ti][1]}
              category="채용정보 채용관"
              title={tier.name}
              features={[
                "채용정보 탭 " + tier.position + " 고정 노출",
                "기업로고 + 기업명 + 채용제목 노출",
                "최근 수정공고 순 상단 배치",
                "메인채용관 구매 시 자동 포함",
              ]}
              priceTabs={[{
                label: "일 단가",
                rows: [
                  { label:"결합 (PC+M)", value:tier.combined.toLocaleString()+"원/일" },
                  { label:"개별 (PC/M)", value:tier.individual.toLocaleString()+"원/일" },
                ],
                note: "* 최소 신청기간 1주 / 메인채용관 구매 시 자동 포함",
              }]}
              startPrice={tier.individual.toLocaleString()+"원"}
              startLabel="개별 일 단가"
            />
          );
        })}
      </CategorySection>

      {/* 배너 광고 */}
      <CategorySection
        title="배너 광고"
        sub="메인·서브·모바일·커뮤니티 전 지면 배너. 목적에 맞는 지면을 개별 선택."
      >
        {bannerAds.filter(b => b.price).map((b, bi) => {
          const dColor = { "PC":[C.blue,C.blueL], "PC+M":[C.purple,C.purpleL], "Mobile":[C.teal,C.tealL] };
          const dc = dColor[b.device] || dColor["PC"];
          const isSub = ["subwing","subwing2","subsky","subbottom","commPick","commMid"].includes(b.id);
          const mockup = b.device === "Mobile" ? <MockMobile hl={b.id} /> : isSub ? <MockSub hl={b.id} /> : <MockMain hl={b.id} />;
          return (
            <ProductCard
              key={b.id}
              reverse={bi % 2 === 1}
              mockup={mockup}
              tag={b.device + " · " + b.zone}
              tagColor={dc[0]}
              tagBg={dc[1]}
              category="배너 광고"
              title={b.name}
              features={[
                "노출 사이즈: " + b.size,
                "노출 방식: " + b.rolling,
                b.device === "Mobile" ? "모바일 전용 지면" : b.device === "PC+M" ? "PC·모바일 동시 노출" : "PC 전용 지면",
                "최소 신청: 1주 이상",
              ]}
              priceTabs={[{
                label: "1주 단가",
                rows: [{ label:"1주 (7일)", value:fw(b.price) }],
                note: "* VAT 포함 / 최소 1주 이상",
              }]}
              startPrice={fw(b.price)}
              startLabel="1주 기준"
            />
          );
        })}
      </CategorySection>

      {/* 이력서 열람 */}
      <CategorySection
        title="이력서 열람 서비스"
        sub="게임잡 회원의 이력서·포트폴리오·연락처를 열람하고 직접 입사제의."
      >
        <ProductCard
          mockup={<MockResume />}
          tag="인재 DB"
          tagColor={C.pink}
          tagBg={C.pinkL}
          category="이력서 열람"
          title="이력서 열람 서비스"
          features={[
            "이력서 · 자기소개서 · 포트폴리오 열람",
            "이메일 · 연락처 확인 가능",
            "게임잡 회원에게 직접 입사제의",
            "메인채용관 구매 시 기본 건수 제공",
          ]}
          priceTabs={[{
            label: "건수별 가격",
            rows: resumeService.plans.map(p => ({
              label: p.count+"건 · "+p.days+"일",
              value: fw(p.price),
              sub: Math.round(p.price/p.count).toLocaleString()+"원/건",
            })),
            note: "* VAT 포함 / 이력서 원본 열람 시 건수 차감",
          }]}
          startPrice={fw(resumeService.plans[0].price)}
          startLabel="10건 · 3일 시작가"
        />
      </CategorySection>
    </div>
  );
}

// ─── 패키지 페이지 ────────────────────────────────────────
function PackageCard({ pkg }) {
  const included = packageCompareRows.filter(r => pkg.includedIds.includes(r.id));
  const byZone = included.reduce((acc,r) => { if(!acc[r.zone]) acc[r.zone]=[]; acc[r.zone].push(r.name); return acc; }, {});

  return (
    <div style={{
      display:"grid", gridTemplateColumns:"1fr 1fr",
      background:C.white, borderRadius:20,
      border: pkg.highlight ? `2px solid ${C.blue}` : `1px solid ${C.border}`,
      overflow:"hidden", boxShadow:"0 2px 12px rgba(23,37,61,0.06)",
    }}>
      <div style={{ background:C.navyD, padding:"40px 40px", display:"flex", flexDirection:"column", gap:20 }}>
        {pkg.highlight && (
          <span style={{ display:"inline-block", alignSelf:"flex-start", background:C.blue, borderRadius:5, padding:"4px 12px", fontSize:11, fontWeight:800, color:"#fff", letterSpacing:"0.08em" }}>BEST</span>
        )}
        <div>
          <h3 style={{ fontSize:26, fontWeight:900, color:"#fff", margin:"0 0 8px", letterSpacing:"-0.03em" }}>{pkg.name}</h3>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.6, margin:0 }}>{pkg.tagline}</p>
        </div>
        <div>
          <p style={{ fontSize:34, fontWeight:900, color:"#fff", margin:0 }}>{fw(pkg.price)}</p>
          <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:5 }}>1주 · VAT포함 · 최소 신청기간 1주</p>
        </div>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.75, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:20, margin:0 }}>
          {pkg.desc}
        </p>
      </div>
      <div style={{ padding:"40px 40px", display:"flex", flexDirection:"column", gap:20 }}>
        <p style={{ fontSize:11, fontWeight:700, color:C.gray, letterSpacing:"0.08em", margin:0, textTransform:"uppercase" }}>포함 지면</p>
        {Object.entries(byZone).map(([zone,items]) => (
          <div key={zone}>
            <p style={{ fontSize:12, color:C.gray, marginBottom:8, fontWeight:600 }}>{zone}</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
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
    <div style={{ background:C.white, borderRadius:20, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 2px 12px rgba(23,37,61,0.06)" }}>
      <div style={{ padding:"24px 32px", borderBottom:`1px solid ${C.border}` }}>
        <h3 style={{ fontSize:18, fontWeight:800, color:C.navy, margin:0 }}>패키지 포함 지면 비교</h3>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13 }}>
          <thead>
            <tr>
              <th style={{ padding:"11px 18px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:12, borderBottom:`1px solid ${C.border}`, textAlign:"left", whiteSpace:"nowrap" }}>노출 위치</th>
              <th style={{ padding:"11px 18px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:12, borderBottom:`1px solid ${C.border}`, textAlign:"left" }}>배너명</th>
              {bannerPackages.map(p => (
                <th key={p.id} style={{ padding:"11px 18px", background:C.grayL, color:C.blue, fontWeight:700, fontSize:12, borderBottom:`1px solid ${C.border}`, textAlign:"center", whiteSpace:"nowrap" }}>{p.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {packageCompareRows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:"9px 18px", color:C.gray, fontSize:12, whiteSpace:"nowrap" }}>{row.zone}</td>
                <td style={{ padding:"9px 18px", color:C.navy, fontWeight:500 }}>{row.name}</td>
                {bannerPackages.map(pkg => (
                  <td key={pkg.id} style={{ padding:"9px 18px", textAlign:"center" }}>
                    {pkg.includedIds.includes(row.id)
                      ? <span style={{ color:C.blue, fontSize:16, fontWeight:700 }}>●</span>
                      : <span style={{ color:C.border }}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background:C.navyD }}>
              <td colSpan={2} style={{ padding:"14px 18px", fontWeight:700, fontSize:14, color:"#fff" }}>금액 (VAT포함 · 1주)</td>
              {bannerPackages.map(p => (
                <td key={p.id} style={{ padding:"14px 18px", textAlign:"center", fontWeight:800, fontSize:16, color:"#fff" }}>{fw(p.price)}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize:12, color:"#9CA3AF", padding:"10px 18px", margin:0 }}>* 최소 신청기간 1주 이상</p>
    </div>
  );
}

function PackageProducts() {
  return (
    <div>
      <CategorySection title="배너 패키지" sub="여러 지면을 묶어 할인 혜택을 받을 수 있는 패키지 상품.">
        {bannerPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
      </CategorySection>
      <PackageCompare />
    </div>
  );
}

// ─── 앱 ──────────────────────────────────────────────────
export default function AdCenter() {
  const [tab, setTab] = useState("all");

  // 앵커 스크롤
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif" }}>
      {/* 헤더 */}
      <header style={{ background:C.navyD, borderBottom:"1px solid rgba(255,255,255,0.07)", position:"sticky", top:0, zIndex:100 }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:16 }}>
              <span style={{ fontWeight:900, fontSize:20, color:"#fff", letterSpacing:"-0.03em" }}>GAMEJOB</span>
              <div style={{ width:1, height:22, background:"rgba(255,255,255,0.18)" }} />
              <div>
                <div style={{ fontSize:15, fontWeight:700, color:"#fff" }}>광고센터</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,0.38)" }}>채용 마케팅 상품 안내</div>
              </div>
            </div>
            <a href="mailto:ad@gamejob.co.kr" style={{
              display:"inline-flex", alignItems:"center", gap:6,
              background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)",
              borderRadius:8, padding:"8px 16px", color:"#fff",
              fontSize:13, fontWeight:600, textDecoration:"none",
            }}>✉ 광고 문의</a>
          </div>

          {/* 탭 */}
          <nav style={{ display:"flex", marginTop:16 }}>
            {[["all","전체 상품 소개"],["package","패키지 상품 소개"]].map(([v,l]) => (
              <button key={v} onClick={() => setTab(v)} style={{
                padding:"13px 22px", fontSize:14, fontWeight:700,
                background:"transparent", border:"none", cursor:"pointer",
                color: tab===v ? "#fff" : "rgba(255,255,255,0.4)",
                borderBottom: tab===v ? "2.5px solid #4A90D9" : "2.5px solid transparent",
                transition:"all .15s", whiteSpace:"nowrap",
              }}>{l}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* 서브 네비 (전체 상품일 때) */}
      {tab === "all" && (
        <div style={{ background:"#fff", borderBottom:`1px solid ${C.border}`, position:"sticky", top:73, zIndex:99 }}>
          <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 clamp(20px,4vw,48px)", display:"flex", gap:0, overflowX:"auto" }}>
            {[
              ["main","메인 채용관"],
              ["recruit","채용정보 채용관"],
              ["banner","배너 광고"],
              ["resume","이력서 열람"],
            ].map(([id,label]) => (
              <button key={id} onClick={() => scrollTo(id)} style={{
                padding:"12px 18px", fontSize:13, fontWeight:600,
                background:"transparent", border:"none", borderBottom:`2px solid transparent`,
                cursor:"pointer", color:C.gray, whiteSpace:"nowrap",
                transition:"all .15s",
              }}
              onMouseEnter={e => { e.target.style.color = C.blue; e.target.style.borderBottomColor = C.blue; }}
              onMouseLeave={e => { e.target.style.color = C.gray; e.target.style.borderBottomColor = "transparent"; }}
              >{label}</button>
            ))}
          </div>
        </div>
      )}

      {/* 콘텐츠 */}
      <main style={{ maxWidth:1200, margin:"0 auto", padding:"48px clamp(20px,4vw,48px) 100px" }}>
        {tab === "all" && (
          <div>
            <div id="main"><AllProducts /></div>
          </div>
        )}
        {tab === "package" && <PackageProducts />}
      </main>

      {/* 푸터 */}
      <footer style={{ borderTop:`1px solid ${C.border}`, background:"#fff", padding:"22px clamp(20px,4vw,48px)", textAlign:"center" }}>
        <p style={{ fontSize:13, color:C.gray, margin:0 }}>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ fontSize:12, color:"#9CA3AF", margin:"5px 0 0" }}>* 모든 가격 VAT포함 / 최소 신청기간: 채용관 1주, 배너 1주 이상</p>
      </footer>
    </div>
  );
}
