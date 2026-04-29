import { useState, useEffect, useRef, useMemo } from "react";
import gamejobLogo from "./bi_gamejob.svg";
import {
  mainBooth as _mainBooth, recruitBooth as _recruitBooth,
  bannerAds as _bannerAds, bannerPackages as _bannerPackages,
  packageCompareRows, resumeService as _resumeService,
} from "./data/products";

const C = {
  navy:    "#004F6B",  // Primary/900
  blue:    "#00A6E2",  // Primary/500
  blueL:   "#EBFAFF",  // Primary/50
  green:   "#256533",  // Green/800
  greenL:  "#ECF8EF",  // Green/50
  amber:   "#6B4700",  // Yellow/900
  amberL:  "#FFF7E6",  // Yellow/50
  purple:  "#0085B5",  // Primary/700
  purpleL: "#D6F4FF",  // Primary/100
  pink:    "#EE443F",  // Red/500
  pinkL:   "#FDECEC",  // Red/50
  teal:    "#308242",  // Green/700
  tealL:   "#ECF8EF",  // Green/50
  gray:    "#6D717F",  // Grey/500
  gray2:   "#9EA2AE",  // Grey/400
  grayL:   "#F9FAFB",  // Grey/50
  border:  "#E5E7EA",  // Grey/200
  border2: "#D2D5DB",  // Grey/300
  white:   "#FFFFFF",
  bg:      "#F3F4F6",  // Grey/100
  text:    "#131927",  // Grey/900
  sub:     "#4D5461",  // Grey/600
};

const fw = (n) => n?.toLocaleString("ko-KR") + "원";

// ─── 앵커 ID 생성 ─────────────────────────────────────────
const anchorId = (id) => `product-${id}`;

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
  <div style={{ background:"#212936", padding:"7px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
    <span style={{ color:"#fff", fontWeight:900, fontSize:11, letterSpacing:"-0.02em" }}>GAMEJOB</span>
    <div style={{ display:"flex", gap:10 }}>
      {["채용정보","커뮤니티","기업정보","인재정보"].map(m => (
        <span key={m} style={{ color:"rgba(255,255,255,0.45)", fontSize:8.5 }}>{m}</span>
      ))}
    </div>
  </div>
);

// 스켈레톤 행
const SkeletonRow = ({ w="100%", h=8, mb=4 }) => (
  <div style={{ width:w, height:h, background:"#E9EEF4", borderRadius:3, marginBottom:mb }} />
);

// 지면 존 블록
const Zone = ({ label, sub, color, active, style={}, slots, rolling, topfix, layout="vertical" }) => (
  <div style={{
    borderRadius:5, padding:"7px 9px",
    background: active ? `${color}12` : "#EAECF0",
    border: active ? `1.5px solid ${color}` : `1px solid ${C.border2}`,
    transition:"all .18s", ...style,
  }}>
    <div style={{ fontSize:9, fontWeight:active?700:500, color:active?color:C.gray, marginBottom:(active&&slots)?6:0, wordBreak:"keep-all", overflowWrap:"break-word", whiteSpace:"pre-wrap" }}>
      {active ? `▶ ${label}` : label}
      {sub && <span style={{ fontSize:8, fontWeight:400, marginLeft:4, opacity:0.7 }}>{sub}</span>}
      {active && rolling && (
        <span style={{ fontSize:8, fontWeight:600, marginLeft:4, background:`${color}20`, padding:"1px 5px", borderRadius:3, color }}>{rolling}</span>
      )}
    </div>
    {active && slots && (
      layout === "horizontal" ? (
        /* 가로형: 슬롯은 1줄 가로 배열, 각 슬롯 내부는 로고(좌) + 텍스트(우) */
        <div style={{ display:"flex", gap:3 }}>
          {Array.from({ length:slots }).map((_,i) => (
            <div key={i} style={{ flex:1, background:`${color}18`, border:`1px dashed ${color}55`, borderRadius:4, padding:"5px 6px", display:"flex", alignItems:"center", gap:5 }}>
              <div style={{ width:14, height:14, background:`${color}35`, borderRadius:3, flexShrink:0 }} />
              <div style={{ flex:1 }}>
                <div style={{ background:`${color}30`, borderRadius:2, height:4, marginBottom:3, width:"70%" }} />
                <div style={{ background:`${color}20`, borderRadius:2, height:3, width:"90%" }} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 세로형: 슬롯을 가로로 배열하고, 각 슬롯 내부는 로고(상) + 텍스트(하) */
        <div style={{ display:"flex", gap:3 }}>
          {Array.from({ length:slots }).map((_,i) => (
            <div key={i} style={{ flex:1, background:`${color}18`, border:`1px dashed ${color}55`, borderRadius:4, padding:"5px 3px" }}>
              {topfix && <div style={{ background:`${color}50`, borderRadius:2, height:18, width:"100%", marginBottom:2 }} />}
              <div style={{ background:`${color}35`, borderRadius:2, height:8, width:"50%", margin:"0 auto 3px" }} />
              <div style={{ background:`${color}22`, borderRadius:2, height:5, marginBottom:2 }} />
              <div style={{ background:`${color}22`, borderRadius:2, height:4, width:"75%" }} />
            </div>
          ))}
        </div>
      )
    )}
  </div>
);

// ─── 모바일 채용관 목업 ───────────────────────────────────
const MockBoothMobile = ({ hl, tiers, isTopfix }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  return (
    <div style={{ width:"100%", background:"#FAFAFA", borderRadius:14, overflow:"hidden", border:"2px solid #DDE1E7" }}>
      <div style={{ background:"#212936", padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ color:"#fff", fontWeight:900, fontSize:10 }}>GAMEJOB</span>
        <div style={{ display:"flex", gap:6 }}>
          {["채용정보","커뮤니티"].map(m => <span key={m} style={{ color:"rgba(255,255,255,0.4)", fontSize:7.5 }}>{m}</span>)}
        </div>
      </div>
      <div style={{ padding:"5px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px", marginBottom:3 }}>
          <SkeletonRow w="70%" h={7} mb={3} />
          <SkeletonRow w="50%" h={5} mb={0} />
        </div>
        {["emperor","lord","knight"].map(id => (
          <div key={id} style={{ marginBottom:3 }}>
            <Zone label={tiers?.find(t=>t.id===id)?.name ?? id} sub={m(id).sub}
              color={C.blue} active={hl===id}
              slots={hl===id ? (isTopfix ? (m(id).topfixMobSlots ?? m(id).mobSlots) : m(id).mobSlots) : null}
              rolling={hl===id ? m(id).badge : null}
              topfix={hl===id ? isTopfix : false}
              layout={id==="knight" ? "horizontal" : "vertical"} />
          </div>
        ))}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginTop:2 }}>
          <SkeletonRow w="90%" h={5} mb={2} />
          <SkeletonRow w="60%" h={5} mb={0} />
        </div>
      </div>
    </div>
  );
};

// ─── PC 채용관 목업 ───────────────────────────────────────
const MockBoothPC = ({ hl, tiers, isTopfix }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const name = (id) => tiers?.find(t => t.id === id)?.name ?? id;
  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />
      <div style={{ display:"flex", alignItems:"stretch" }}>
        <div style={{ width:20, flexShrink:0, background:"#F1F5F9", border:"1px solid #E8ECF2", borderRadius:4, margin:"3px 2px 3px 3px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:7, color:"#CBD5E1", writingMode:"vertical-rl", whiteSpace:"nowrap" }}>백스킨(좌)</span>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2, padding:"3px 0" }}>
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px 6px" }}>
            <SkeletonRow w="60%" h={5} mb={2} />
            <SkeletonRow w="40%" h={4} mb={0} />
          </div>
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 6px" }}>
            <SkeletonRow w="50%" h={4} mb={0} />
          </div>
          <Zone label={name("emperor")} sub={m("emperor").sub} color={C.blue}
            active={hl==="emperor"} slots={hl==="emperor" ? (isTopfix ? (m("emperor").topfixPcSlots ?? m("emperor").pcSlots) : m("emperor").pcSlots) : null}
            rolling={hl==="emperor" ? m("emperor").badge : null}
            topfix={hl==="emperor" ? isTopfix : false} />
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 6px" }}>
            <SkeletonRow w="50%" h={4} mb={0} />
          </div>
          <Zone label={name("lord")} sub={m("lord").sub} color={C.blue}
            active={hl==="lord"} slots={hl==="lord" ? (isTopfix ? (m("lord").topfixPcSlots ?? m("lord").pcSlots) : m("lord").pcSlots) : null}
            rolling={hl==="lord" ? m("lord").badge : null}
            topfix={hl==="lord" ? isTopfix : false} />
          <Zone label={name("knight")} sub={m("knight").sub} color={C.blue}
            active={hl==="knight"} slots={hl==="knight" ? m("knight").pcSlots : null}
            rolling={hl==="knight" ? m("knight").badge : null} layout="horizontal" />
        </div>
        <div style={{ width:20, flexShrink:0, background:"#F1F5F9", border:"1px solid #E8ECF2", borderRadius:4, margin:"3px 3px 3px 2px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:7, color:"#CBD5E1", writingMode:"vertical-rl", whiteSpace:"nowrap" }}>백스킨(우)</span>
        </div>
      </div>
    </div>
  );
};

// ─── PC 서브(채용정보) 목업 — 채용관 전용 ────────────────
const MockRecruitPC = ({ hl, tiers }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const name = (id) => tiers?.find(t => t.id === id)?.name ?? id;
  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />
      <div style={{ padding:"5px 5px 3px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"7px 8px", display:"flex", gap:6 }}>
          {["직종","지역","경력","직급"].map(f => (
            <div key={f} style={{ background:"#E2E8F0", borderRadius:3, padding:"3px 8px" }}>
              <span style={{ fontSize:8, color:"#94A3B8" }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
      {["sword","shield","armor"].map(id => (
        <div key={id} style={{ padding:"2px 5px" }}>
          <Zone label={name(id)} sub={m(id).sub} color={C.blue}
            active={hl===id} slots={hl===id ? m(id).pcSlots : null}
            rolling={hl===id ? m(id).badge : null} layout="horizontal" />
        </div>
      ))}
      <div style={{ padding:"3px 5px 5px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px 8px" }}>
          <SkeletonRow w="80%" h={6} mb={3} />
          <SkeletonRow w="55%" h={5} mb={0} />
        </div>
      </div>
    </div>
  );
};

// ─── 모바일 서브(채용정보) 목업 — 채용관 전용 ────────────
const MockRecruitMobile = ({ hl, tiers }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const name = (id) => tiers?.find(t => t.id === id)?.name ?? id;
  return (
    <div style={{ width:"100%", background:"#FAFAFA", borderRadius:14, overflow:"hidden", border:"2px solid #DDE1E7" }}>
      <div style={{ background:"#212936", padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ color:"#fff", fontWeight:900, fontSize:10 }}>GAMEJOB</span>
        <span style={{ color:"rgba(255,255,255,0.6)", fontSize:9, fontWeight:600 }}>채용정보</span>
      </div>
      <div style={{ padding:"5px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:3, display:"flex", gap:3, flexWrap:"wrap" }}>
          {["직종","지역","경력"].map(f => (
            <div key={f} style={{ background:"#E2E8F0", borderRadius:3, padding:"2px 6px" }}>
              <span style={{ fontSize:7.5, color:"#94A3B8" }}>{f}</span>
            </div>
          ))}
        </div>
        {["sword","shield","armor"].map(id => (
          <div key={id} style={{ marginBottom:3 }}>
            <Zone label={name(id)} sub={m(id).sub} color={C.blue}
              active={hl===id} slots={hl===id ? m(id).mobSlots : null}
              rolling={hl===id ? m(id).badge : null} layout="horizontal" />
          </div>
        ))}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"4px", marginTop:2 }}>
          <SkeletonRow w="85%" h={5} mb={2} />
          <SkeletonRow w="60%" h={5} mb={0} />
        </div>
      </div>
    </div>
  );
};

// ─── PC 서브 목업 (배너 전용) ─────────────────────────────
const MockSub = ({ hl, ads=[] }) => {
  const ad = (id) => ads.find(a => a.id === id) ?? {};
  const lbl = (id) => ad(id).mockupDesc || ad(id).name || "";
  const sub = (id) => ad(id).mockupDesc ? null : (ad(id).size?.replace(/px/gi,"").trim() || "");
  return (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7", height:343 }}>
    <BrowserBar />
    <GNB />

    {/* 3열 레이아웃: [서브날개] [중앙] [서브스카이] */}
    <div style={{ padding:"3px 4px 5px", display:"flex", gap:3, alignItems:"stretch", justifyContent:"center" }}>

      {/* 좌: 서브 날개 */}
      <div style={{ width:130, flexShrink:0 }}>
        <Zone label={lbl("subwing")} sub={sub("subwing")} color={C.blue} active={hl==="subwing"}
          rolling={hl==="subwing" ? ad("subwing").rolling||null : null}
          style={{ padding:"6px 2px", height:120, boxSizing:"border-box" }} />
      </div>

      {/* 중앙: 커뮤니티Pick + 스켈레톤 + 서브하단 */}
      <div style={{ width:356, flexShrink:0, display:"flex", flexDirection:"column", gap:2 }}>

        <Zone label={lbl("commPick")} sub={sub("commPick")} color={C.blue}
          active={hl==="commPick"} rolling={hl==="commPick" ? ad("commPick").rolling||null : null}
          style={{ minHeight:56 }} />

        <div style={{ background:"#F1F5F9", borderRadius:4, padding:"6px 8px", flex:1 }}>
          <SkeletonRow w="60%" h={5} mb={3} />
          <SkeletonRow w="85%" h={4} mb={2} />
          <SkeletonRow w="70%" h={4} mb={2} />
          <SkeletonRow w="55%" h={4} mb={0} />
        </div>

        <div style={{ display:"flex", justifyContent:"center" }}>
          <div style={{ width:"50%" }}>
            <Zone label={lbl("subbottom")} sub={sub("subbottom")} color={C.blue}
              active={hl==="subbottom"} rolling={hl==="subbottom" ? ad("subbottom").rolling||null : null} />
          </div>
        </div>

      </div>

      {/* 우: 서브 스카이 */}
      <div style={{ width:130, flexShrink:0 }}>
        <Zone label={lbl("subsky")} sub={sub("subsky")} color={C.blue} active={hl==="subsky"}
          rolling={hl==="subsky" ? ad("subsky").rolling||null : null}
          style={{ height:200, padding:"4px 2px", boxSizing:"border-box" }} />
      </div>

    </div>
  </div>
  );
};

// ─── PC 메인 배너 목업 ────────────────────────────────────
const MockMainBanner = ({ hl, ads=[] }) => {
  const ad = (id) => ads.find(a => a.id === id) ?? {};
  const lbl = (id) => ad(id).mockupDesc || ad(id).name || "";
  const sub = (id) => ad(id).mockupDesc ? null : (ad(id).size?.replace(/px/gi,"").trim() || "");
  const isSkin = hl === "backskin";
  const skinColor = C.blue;
  const skinStyle = (side) => ({
    width: 56, flexShrink:0,
    background: isSkin ? `${skinColor}12` : "#F1F5F9",
    border: isSkin ? `1.5px solid ${skinColor}` : "1px solid #E8ECF2",
    borderRadius:4,
    margin: side === "left" ? "3px 2px 3px 3px" : "3px 3px 3px 2px",
    display:"flex", alignItems:"center", justifyContent:"center",
    transition:"all .2s",
  });
  const skinText = (side) => (
    <span style={{
      fontSize:8, fontWeight:isSkin?700:400,
      color:isSkin?skinColor:C.gray2,
      writingMode:"vertical-rl",
      textAlign:"center",
    }}>
      {isSkin ? `▶ 백스킨(${side==="left"?"좌":"우"})` : `백스킨(${side==="left"?"좌":"우"})`}
    </span>
  );

  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />

      {/* 전체 레이아웃: [백스킨좌] [중앙] [백스킨우] */}
      <div style={{ display:"flex", gap:0, alignItems:"stretch" }}>

        {/* 백스킨 좌 */}
        <div style={skinStyle("left")}>{skinText("left")}</div>

        {/* 중앙 콘텐츠 */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2, padding:"3px 0" }}>

          {/* 메인 탑 + 우측 스켈레톤 */}
          <div style={{ display:"flex", gap:2, alignItems:"stretch" }}>
            <Zone label={lbl("maintop")} sub={sub("maintop")} color={C.blue}
              active={hl==="maintop"} rolling={hl==="maintop" ? ad("maintop").rolling||null : null}
              style={{ flex:2, minHeight:28 }} />
            <div style={{ flex:1, display:"flex", gap:2 }}>
              <div style={{ flex:1, background:"#E9EEF4", borderRadius:5 }} />
              <div style={{ flex:1, background:"#E9EEF4", borderRadius:5 }} />
            </div>
          </div>

          {/* 콘텐츠 스켈레톤 */}
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px 7px" }}>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1 }}>
                <SkeletonRow w="70%" h={5} mb={3} />
                <SkeletonRow w="90%" h={4} mb={2} />
                <SkeletonRow w="80%" h={4} mb={2} />
                <SkeletonRow w="60%" h={4} mb={0} />
              </div>
              <div style={{ flex:1 }}>
                <SkeletonRow w="70%" h={5} mb={3} />
                <SkeletonRow w="90%" h={4} mb={2} />
                <SkeletonRow w="75%" h={4} mb={2} />
                <SkeletonRow w="55%" h={4} mb={0} />
              </div>
            </div>
          </div>

          {/* 메인 상단띠 — Emperor 바로 위 */}
          <Zone label={lbl("topstrip")} sub={sub("topstrip")} color={C.blue}
            active={hl==="topstrip"} rolling={hl==="topstrip" ? ad("topstrip").rolling||null : null} />

          {/* Emperor 채용관 스켈레톤 (4번째 슬롯 = Emperor Edge) */}
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px 6px" }}>
            <SkeletonRow w="45%" h={5} mb={3} />
            <div style={{ display:"flex", gap:2 }}>
              {[0,1,2,3].map(i => {
                const isEdge = i === 3;
                const edgeActive = isEdge && hl === "emperiredge";
                return (
                  <div key={i} style={{
                    flex:1,
                    background: edgeActive ? `${C.blue}18` : "#E9EEF4",
                    border: isEdge ? `1px dashed ${edgeActive ? C.blue+"66" : "#B0B8C9"}` : "none",
                    borderRadius:3, padding:"4px 2px",
                  }}>
                    {isEdge ? (
                      <>
                        <div style={{ fontSize:7, color: edgeActive ? C.blue : C.gray2, fontWeight: edgeActive ? 700 : 400, textAlign:"center", marginBottom:3 }}>
                          {edgeActive ? "▶ Emperor Edge" : "Emperor Edge"}
                        </div>
                        <div style={{ background: edgeActive ? `${C.blue}30` : "#D1D9E6", borderRadius:2, height:20, width:"100%" }} />
                      </>
                    ) : (
                      <>
                        <div style={{ width:"50%", height:8, background:"#D1D9E6", borderRadius:2, margin:"0 auto 3px" }} />
                        <SkeletonRow w="90%" h={3} mb={2} />
                        <SkeletonRow w="70%" h={3} mb={0} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 메인 미들띠 */}
          <Zone label={lbl("midstrip")} sub={sub("midstrip")} color={C.blue}
            active={hl==="midstrip"} rolling={hl==="midstrip" ? ad("midstrip").rolling||null : null} />

          {/* Lord 채용관 스켈레톤 */}
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px 6px" }}>
            <SkeletonRow w="40%" h={5} mb={3} />
            <div style={{ display:"flex", gap:2 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ flex:1, background:"#E9EEF4", borderRadius:3, padding:"4px 2px" }}>
                  <SkeletonRow w="90%" h={3} mb={2} />
                  <SkeletonRow w="70%" h={3} mb={0} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 백스킨 우 */}
        <div style={skinStyle("right")}>{skinText("right")}</div>

      </div>
    </div>
  );
};

// ─── 모바일 배너 목업 ─────────────────────────────────────
const MockMobile = ({ hl, ads=[] }) => {
  const ad = (id) => ads.find(a => a.id === id) ?? {};
  const lbl = (id) => ad(id).mockupDesc || ad(id).name || "";
  const sub = (id) => ad(id).mockupDesc ? null : (ad(id).size?.replace(/px/gi,"").trim() || "");
  return (
  <div style={{ width:"100%", background:"#FAFAFA", borderRadius:14, overflow:"hidden", border:"2px solid #DDE1E7", height:314 }}>
    <div style={{ background:"#212936", padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ color:"#fff", fontWeight:900, fontSize:10 }}>GAMEJOB</span>
      <div style={{ display:"flex", gap:6 }}>
        {["채용정보","커뮤니티"].map(m => <span key={m} style={{ color:"rgba(255,255,255,0.4)", fontSize:7.5 }}>{m}</span>)}
      </div>
    </div>
    <div style={{ padding:"5px" }}>
      {/* 모바일 메인띠 — commPick일 때 스켈레톤으로 대체 */}
      {hl === "commPick" ? (
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px", marginBottom:3 }}>
          <SkeletonRow w="80%" h={6} mb={2} />
          <SkeletonRow w="55%" h={4} mb={0} />
        </div>
      ) : (
        <Zone label={lbl("mobMain")} sub={sub("mobMain")} color={C.blue} active={hl==="mobMain"} rolling={hl==="mobMain" ? ad("mobMain").rolling||null : null} style={{ marginBottom:3 }} />
      )}
      {/* 채용관 스켈레톤 */}
      <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:3 }}>
        <SkeletonRow w="70%" h={6} mb={2} />
        <SkeletonRow w="50%" h={5} mb={0} />
      </div>
      {/* 커뮤니티 Pick — mobMain일 때 스켈레톤으로 대체 */}
      {hl === "mobMain" ? (
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px", marginBottom:3, marginTop:2 }}>
          <SkeletonRow w="75%" h={5} mb={2} />
          <SkeletonRow w="50%" h={4} mb={0} />
        </div>
      ) : (
        <Zone label={lbl("commPick")} sub={sub("commPick")} color={C.blue} active={hl==="commPick"} rolling={hl==="commPick" ? ad("commPick").rolling||null : null} style={{ marginBottom:3, marginTop:2 }} />
      )}
      {/* 커뮤니티Pick ~ 모바일서브띠 사이 콘텐츠 스켈레톤 */}
      <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:2 }}>
        <SkeletonRow w="80%" h={4} mb={2} />
        <SkeletonRow w="60%" h={4} mb={2} />
        <SkeletonRow w="70%" h={4} mb={0} />
      </div>
      {/* 모바일 서브띠 — mobMain일 때 스켈레톤으로 대체 */}
      {hl === "mobMain" ? (
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:2 }}>
          <SkeletonRow w="65%" h={5} mb={0} />
        </div>
      ) : (
        <Zone label={lbl("mobSub")} sub={sub("mobSub")} color={C.blue} active={hl==="mobSub"} rolling={hl==="mobSub" ? ad("mobSub").rolling||null : null} style={{ marginBottom:2 }} />
      )}
      {/* 모바일 서브띠 하단 스켈레톤 */}
      <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:2 }}>
        <SkeletonRow w="75%" h={4} mb={2} />
        <SkeletonRow w="50%" h={4} mb={0} />
      </div>
    </div>
  </div>
  );
};

// ─── 이력서 목업 ──────────────────────────────────────────
const MockResume = () => (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"10px" }}>
      <div style={{ background:"#fff", borderRadius:7, padding:"11px", border:`1.5px solid ${C.blue}` }}>
        <div style={{ fontSize:9.5, color:C.blue, fontWeight:700, marginBottom:7 }}>▶ 이력서 열람 서비스</div>
        {["이력서 / 자기소개서","포트폴리오","이메일 / 연락처"].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5, padding:"4px 7px", background:C.blueL, borderRadius:4 }}>
            <div style={{ width:13, height:13, borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:8, color:"#fff", fontWeight:800 }}>✓</span>
            </div>
            <span style={{ fontSize:9, color:C.text, fontWeight:500 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop:7, padding:"6px", background:C.blue, borderRadius:4, textAlign:"center" }}>
          <span style={{ fontSize:9, color:"#fff", fontWeight:700 }}>입사제의 보내기</span>
        </div>
      </div>
    </div>
  </div>
);

// ─── 상품 카드 ────────────────────────────────────────────
function ProductCard({ item }) {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = item.priceTabs[Math.min(tabIdx, item.priceTabs.length-1)];
  const isBoothType = item.category === "메인 채용관" || item.category === "채용정보 채용관";

  const renderMockup = () => {
    if (item.category === "메인 채용관") {
      const hlId = item.hlId || item.id;
      return (
        <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ width:155, flexShrink:0 }}>
            <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
            <MockBoothMobile hl={hlId} tiers={item.tiers} isTopfix={item.isTopfix} />
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>PC</p>
            <MockBoothPC hl={hlId} tiers={item.tiers} isTopfix={item.isTopfix} />
          </div>
        </div>
      );
    }
    if (item.category === "채용정보 채용관") {
      return (
        <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
          <div style={{ width:155, flexShrink:0 }}>
            <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
            <MockRecruitMobile hl={item.id} tiers={item.tiers} />
          </div>
          <div style={{ flex:1 }}>
            <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>PC</p>
            <MockRecruitPC hl={item.id} tiers={item.tiers} />
          </div>
        </div>
      );
    }
    return item.mockup;
  };

  return (
    <div
      id={anchorId(item.id)}
      style={{
        background:C.white, borderRadius:12,
        border:`1px solid ${C.border}`,
        overflow:"hidden",
        boxShadow:"0 1px 6px rgba(15,23,42,0.05)",
        scrollMarginTop: 110,
      }}
    >
      {/* 카드 헤더 */}
      <div style={{ padding:"11px 20px", borderBottom:`1px solid ${C.border}`, background:C.grayL, display:"flex", alignItems:"center", gap:8 }}>
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <span style={{ fontSize:11.5, color:C.gray, fontWeight:500 }}>지면 위치</span>
          {item.zoneLabel && (
            <span style={{ fontSize:11, color:C.blue, background:C.blueL, padding:"2px 8px", borderRadius:4, fontWeight:600 }}>{item.zoneLabel}</span>
          )}
          {item.tag && (
            <span style={{ fontSize:11, fontWeight:600, color:item.tagColor, background:item.tagBg, padding:"2px 9px", borderRadius:4 }}>{item.tag}</span>
          )}
        </div>
      </div>

      {/* 카드 바디 */}
      <div style={{ display:"grid", gridTemplateColumns:"3fr 2fr" }}>

        {/* 좌 — 목업 */}
        <div style={{ padding:"24px 20px", borderRight:`1px solid ${C.border}`, background:"#FAFCFF", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"100%", maxWidth: (isBoothType || item.id === "commPick") ? "100%" : 480 }}>
            {renderMockup()}
          </div>
        </div>

        {/* 우 — 설명+가격 */}
        <div style={{ padding:"24px 28px", display:"flex", flexDirection:"column", gap:18 }}>
          <div>
            <h3 style={{ fontSize:20, fontWeight:800, color:C.text, margin:0, letterSpacing:"-0.02em" }}>{item.title}</h3>
          </div>

          {/* 특징 / 노출 */}
          {item.exposure ? (
            <>
              <div>
                <p style={{ fontSize:11, fontWeight:600, color:C.gray, marginBottom:8, letterSpacing:"0.02em" }}>노출</p>
                <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden" }}>
                  {item.exposure.map((row,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", borderBottom: i < item.exposure.length-1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize:11.5, color:C.gray, fontWeight:600, width:96, flexShrink:0, padding:"8px 12px", background:C.grayL, whiteSpace:"nowrap" }}>{row.label}</span>
                      <span style={{ fontSize:12.5, color:C.text, padding:"8px 12px" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize:11, fontWeight:600, color:C.gray, marginBottom:8, letterSpacing:"0.02em" }}>제작 가이드</p>
                <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden" }}>
                  {item.guide.map((row,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", borderBottom: i < item.guide.length-1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize:11.5, color:C.gray, fontWeight:600, width:96, flexShrink:0, padding:"8px 12px", background:C.grayL, whiteSpace:"nowrap" }}>{row.label}</span>
                      <span style={{ fontSize:12.5, color:C.text, padding:"8px 12px" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <p style={{ fontSize:11, fontWeight:600, color:C.gray, marginBottom:8, letterSpacing:"0.02em" }}>상품 특징</p>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                {item.features.map((f,i) => (
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:C.blueL, border:`1.5px solid ${C.blue}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize:12.5, color:C.sub, lineHeight:1.55 }}>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 가격 탭 */}
          <div style={{ flex:1 }}>
            {item.priceTabs.length > 1 && (
              <div style={{ display:"flex", gap:0, marginBottom:12, border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden", width:"fit-content" }}>
                {item.priceTabs.map((t,i) => (
                  <button key={i} onClick={() => setTabIdx(i)} style={{
                    padding:"5px 13px", fontSize:11.5, fontWeight:600, cursor:"pointer",
                    border:"none", borderRight: i < item.priceTabs.length-1 ? `1px solid ${C.border}` : "none",
                    background: tabIdx===i ? C.blue : C.white,
                    color: tabIdx===i ? "#fff" : C.gray,
                  }}>{t.label}</button>
                ))}
              </div>
            )}
            <div style={{ minHeight: Math.max(...item.priceTabs.map(t => t.rows.length * (t.rows.some(r => r.sub) ? 46 : 33))) }}>
              {tab.rows.map((r,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:12.5, color:i===0?C.text:C.gray }}>{r.label}</span>
                  <div style={{ textAlign:"right" }}>
                    {r.sub && <div style={{ fontSize:11, color:"#CBD5E1", textDecoration:"line-through" }}>{r.sub}</div>}
                    <span style={{ fontSize:i===0?16:13.5, fontWeight:i===0?700:500, color:i===0?C.blue:C.text }}>{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
            {tab.note && <p style={{ fontSize:11, color:C.gray2, marginTop:6 }}>{tab.note}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── 카테고리 섹션 ────────────────────────────────────────
function CategorySection({ id, title, sub, children }) {
  return (
    <section id={id} style={{ marginBottom:56, scrollMarginTop:110 }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <div style={{ width:4, height:24, background:C.blue, borderRadius:2 }} />
          <h2 style={{ fontSize:20, fontWeight:800, color:C.text, margin:0, letterSpacing:"-0.02em" }}>{title}</h2>
        </div>
        {sub && <p style={{ fontSize:13, color:C.gray, margin:"0 0 0 14px", lineHeight:1.6 }}>{sub}</p>}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {children}
      </div>
    </section>
  );
}

// ─── 패키지 카드 ──────────────────────────────────────────
function PackageCard({ pkg }) {
  const included = packageCompareRows.filter(r => pkg.includedIds.includes(r.id));
  const byZone = included.reduce((acc,r) => { if(!acc[r.zone]) acc[r.zone]=[]; acc[r.zone].push(r.name); return acc; }, {});
  return (
    <div id={anchorId(pkg.id)} style={{ background:C.white, borderRadius:12, border: pkg.highlight?`1.5px solid ${C.blue}`:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(15,23,42,0.05)", scrollMarginTop:110 }}>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr" }}>
        <div style={{ background:C.navy, padding:"32px 32px", display:"flex", flexDirection:"column", gap:14 }}>
          {pkg.highlight && <span style={{ display:"inline-block", alignSelf:"flex-start", background:C.blue, borderRadius:4, padding:"3px 10px", fontSize:11, fontWeight:700, color:"#fff" }}>BEST</span>}
          <div>
            <p style={{ fontSize:26, fontWeight:900, color:"#fff", margin:0 }}>{fw(pkg.price)}</p>
            <p style={{ fontSize:11.5, color:"rgba(255,255,255,0.35)", marginTop:4 }}>1주일 · VAT포함</p>
          </div>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.55)", lineHeight:1.75, borderTop:"1px solid rgba(255,255,255,0.1)", paddingTop:16, margin:0 }}>{pkg.desc}</p>
        </div>
        <div style={{ padding:"28px 28px", display:"flex", flexDirection:"column", gap:14 }}>
          <p style={{ fontSize:11, fontWeight:600, color:C.gray, margin:0, letterSpacing:"0.04em" }}>포함 지면</p>
          {Object.entries(byZone).map(([zone,items]) => (
            <div key={zone}>
              <p style={{ fontSize:12, color:C.sub, marginBottom:6, fontWeight:600 }}>{zone}</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                {items.map(item => <span key={item} style={{ display:"inline-block", fontSize:11.5, padding:"3px 10px", borderRadius:20, background:C.blueL, color:C.blue, fontWeight:600 }}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PackageCompare({ bannerPackages }) {
  return (
    <div style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(15,23,42,0.05)" }}>
      <div style={{ padding:"14px 20px", borderBottom:`1px solid ${C.border}`, background:C.grayL }}>
        <h3 style={{ fontSize:14, fontWeight:700, color:C.text, margin:0 }}>패키지 포함 지면 비교</h3>
      </div>
      <div style={{ overflowX:"auto" }}>
        <table style={{ width:"100%", borderCollapse:"collapse", fontSize:12.5 }}>
          <thead>
            <tr>
              <th style={{ padding:"9px 16px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:11.5, borderBottom:`1px solid ${C.border}`, textAlign:"left", whiteSpace:"nowrap" }}>노출 위치</th>
              <th style={{ padding:"9px 16px", background:C.grayL, color:C.gray, fontWeight:600, fontSize:11.5, borderBottom:`1px solid ${C.border}`, textAlign:"left" }}>배너명</th>
              {bannerPackages.map(p => <th key={p.id} style={{ padding:"9px 16px", background:C.grayL, color:C.blue, fontWeight:700, fontSize:11.5, borderBottom:`1px solid ${C.border}`, textAlign:"center", whiteSpace:"nowrap" }}>{p.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {packageCompareRows.map((row,ri) => (
              <tr key={ri} style={{ borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:"7px 16px", color:C.gray2, fontSize:11.5, whiteSpace:"nowrap" }}>{row.zone}</td>
                <td style={{ padding:"7px 16px", color:C.text, fontWeight:500 }}>{row.name}</td>
                {bannerPackages.map(pkg => (
                  <td key={pkg.id} style={{ padding:"7px 16px", textAlign:"center" }}>
                    {pkg.includedIds.includes(row.id) ? <span style={{ color:C.blue, fontSize:14, fontWeight:700 }}>●</span> : <span style={{ color:C.border2 }}>—</span>}
                  </td>
                ))}
              </tr>
            ))}
            <tr style={{ background:C.navy }}>
              <td colSpan={2} style={{ padding:"11px 16px", fontWeight:700, fontSize:13, color:"#fff" }}>금액 (VAT포함 · 1주일)</td>
              {bannerPackages.map(p => <td key={p.id} style={{ padding:"11px 16px", textAlign:"center", fontWeight:800, fontSize:14, color:"#fff" }}>{fw(p.price)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
      <p style={{ fontSize:11, color:C.gray2, padding:"7px 16px", margin:0 }}>* 최소 신청기간 1주일 이상</p>
    </div>
  );
}

// ─── 상품 데이터 빌드 ─────────────────────────────────────
// buildAllItems는 AdCenter 컴포넌트 내부에서 useMemo로 사용됨

// ─── LNB 컴포넌트 ────────────────────────────────────────
function LNB({ groups, activeId, onSelect }) {
  return (
    <nav style={{ paddingTop:8 }}>
      {groups.map(g => (
        <div key={g.group} style={{ marginBottom:4 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 16px 4px" }}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="0.5" y="0.5" width="5" height="5" rx="1" fill={C.gray2}/>
              <rect x="7.5" y="0.5" width="5" height="5" rx="1" fill={C.gray2}/>
              <rect x="0.5" y="7.5" width="5" height="5" rx="1" fill={C.gray2}/>
              <rect x="7.5" y="7.5" width="5" height="5" rx="1" fill={C.gray2}/>
            </svg>
            <span style={{ fontSize:12, fontWeight:700, color:C.text }}>{g.group}</span>
          </div>
          {g.items.map(item => {
            const active = activeId === item.id;
            return (
              <button key={item.id} onClick={() => onSelect(item.id, item.isAnchor)} style={{
                display:"block", width:"100%", textAlign:"left",
                padding:"5px 16px 5px 34px",
                fontSize:12.5, fontWeight:active?600:400,
                color:active?C.blue:C.gray,
                background:active?C.blueL:"transparent",
                border:"none",
                borderLeft:active?`3px solid ${C.blue}`:"3px solid transparent",
                cursor:"pointer", transition:"all .1s",
              }}>{item.label}</button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

// ─── 앱 ──────────────────────────────────────────────────
export default function AdCenter() {
  const [tab, setTab] = useState("all");
  const HEADER_H = 93;

  // 상품 데이터: 정적 파일을 기본값으로, Notion API 응답으로 덮어씀
  const [products, setProducts] = useState({
    mainBooth: _mainBooth,
    recruitBooth: _recruitBooth,
    bannerAds: _bannerAds,
    bannerPackages: _bannerPackages,
    resumeService: _resumeService,
  });

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setProducts(data); })
      .catch(() => {});
  }, []);

  const { mainBooth, recruitBooth, bannerAds, bannerPackages, resumeService } = products;

  // ALL_ITEMS: Notion 데이터 기반으로 재계산
  const ALL_ITEMS = useMemo(() => {
    const items = [];
    mainBooth.tiers.forEach((tier, ti) => {
      const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
      items.push({
        id:tier.id, category:"메인 채용관", title:tier.name,
        tag:tier.position+" 노출", tagColor:colors[ti][0], tagBg:colors[ti][1],
        zoneLabel:"메인", mockup:null, tiers:mainBooth.tiers,
        features:tier.features,
        priceTabs:[
          { label:"결합 (PC+M)", rows:tier.combined.map(r=>({ label:r.period, value:fw(r.price), sub:fw(r.original) })), note:"* 개별 합산 대비 35% 할인 / 최소 1주일" },
          { label:"개별 (PC/M)", rows:tier.individual.map(r=>({ label:r.period, value:fw(r.price) })), note:"* 최소 신청기간 1주일" },
        ],
      });
      // Emperor / Lord → 상단고정 별도 상품
      if (tier.id === "emperor" || tier.id === "lord") {
        const announcementCount = tier.id === "emperor" ? 3 : 2;
        const topfixFeatures = tier.features.length > 0
          ? [`상단이미지+기업로고+대표공고 ${announcementCount}개 노출`, ...tier.features.slice(1)]
          : [`상단이미지+기업로고+대표공고 ${announcementCount}개 노출`];
        items.push({
          id:`${tier.id}-topfix`, category:"메인 채용관",
          title:`${tier.name} 상단고정`,
          tag:tier.position+" 노출", tagColor:colors[ti][0], tagBg:colors[ti][1],
          zoneLabel:"메인", mockup:null, tiers:mainBooth.tiers,
          hlId:tier.id, isTopfix:true,
          features:topfixFeatures,
          priceTabs:[
            { label:"결합 (PC+M)", rows:tier.combined.filter(r=>r.topfixTotal).map(r=>({ label:r.period, value:fw(r.topfixTotal) })), note:"* 결합 가격 + 상단고정 옵션 포함가 / 최소 1주일" },
            { label:"개별 (PC/M)", rows:tier.individual.filter(r=>r.topfixTotal).map(r=>({ label:r.period, value:fw(r.topfixTotal) })), note:"* 개별 가격 + 상단고정 옵션 포함가 / 최소 신청기간 1주일" },
          ],
        });
      }
    });
    recruitBooth.tiers.forEach((tier, ti) => {
      const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
      items.push({
        id:tier.id, category:"채용정보 채용관", title:tier.name,
        tag:tier.position+" 노출", tagColor:colors[ti][0], tagBg:colors[ti][1],
        zoneLabel:"채용정보", mockup:<MockSub hl={tier.id} ads={bannerAds} />, tiers:recruitBooth.tiers,
        features:["채용정보 탭 "+tier.position+" 고정 노출","기업로고+기업명+채용제목 노출","최근 수정공고 순 상단 배치","메인채용관 구매 시 자동 포함"],
        priceTabs:[{ label:"일 단가", rows:[{ label:"결합 (PC+M)", value:tier.combined.toLocaleString()+"원/일" },{ label:"개별 (PC/M)", value:tier.individual.toLocaleString()+"원/일" }], note:"* 최소 신청기간 1주일 / 메인채용관 구매 시 자동 포함" }],
      });
    });
    bannerAds.filter(b=>b.price).forEach(b => {
      const dColor = { "PC":[C.blue,C.blueL], "PC+M":[C.purple,C.purpleL], "Mobile":[C.teal,C.tealL] };
      const dc = dColor[b.device]||dColor["PC"];
      const MAIN_IDS = ["backskin","maintop","topstrip","midstrip","emperiredge"];
      const SUB_IDS  = ["subwing","subwing2","subsky","subbottom","commMid"];
      const MOB_IDS  = ["mobMain","mobSub"];
      let mockup = null;
      if (b.id === "commPick") {
        mockup = (
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:155, flexShrink:0 }}>
              <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
              <MockMobile hl="commPick" ads={bannerAds} />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>PC</p>
              <MockSub hl="commPick" ads={bannerAds} />
            </div>
          </div>
        );
      } else if (MAIN_IDS.includes(b.id)) {
        mockup = <MockMainBanner hl={b.id} ads={bannerAds} />;
      } else if (SUB_IDS.includes(b.id)) {
        mockup = <MockSub hl={b.id} ads={bannerAds} />;
      } else if (MOB_IDS.includes(b.id)) {
        mockup = (
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ width:155, flexShrink:0 }}>
              <p style={{ fontSize:10, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
              <MockMobile hl={b.id} ads={bannerAds} />
            </div>
          </div>
        );
      }
      const deviceLabel = b.device==="Mobile"?"모바일 전용":b.device==="PC+M"?"PC+모바일 동시":"PC 전용";
      items.push({
        id:b.id, category:"배너 광고", title:b.name,
        tag:b.device+" · "+b.zone, tagColor:dc[0], tagBg:dc[1],
        zoneLabel:b.zone, mockup,
        exposure:[
          { label:"노출 위치", value:b.location || b.zone+" ("+deviceLabel+")" },
          { label:"노출 방식", value:b.rolling },
        ],
        guide:[
          { label:"이미지 사이즈", value:b.size },
          { label:"이미지 용량",   value:b.capacity },
        ],
        priceTabs:[{ label:"1주일 단가", rows:[{ label:"1주일(7일)", value:fw(b.price) }], note:"* VAT 포함 / 최소 1주일 이상" }],
      });
    });
    items.push({
      id:"resume", category:"이력서 열람", title:"이력서 열람 서비스",
      tag:"인재 DB", tagColor:C.pink, tagBg:C.pinkL,
      zoneLabel:"", mockup:<MockResume />,
      features:["이력서·자기소개서·포트폴리오 열람","이메일·연락처 확인 가능","게임잡 회원에게 직접 입사제의","메인채용관 구매 시 기본 건수 제공"],
      priceTabs:[{ label:"건수별 가격", rows:resumeService.plans.map(p=>({ label:p.count+"건 · "+p.days+"일", value:fw(p.price), sub:Math.round(p.price/p.count).toLocaleString()+"원/건" })), note:"* VAT 포함 / 이력서 원본 열람 시 건수 차감" }],
    });
    return items;
  }, [mainBooth, recruitBooth, bannerAds, resumeService]);

  // LNB 데이터
  const LNB_ALL = useMemo(() => {
    const mainItems = [];
    mainBooth.tiers.forEach(t => {
      mainItems.push({ id:t.id, label:t.name.replace(" 채용관","") });
      if (t.id === "emperor" || t.id === "lord") {
        mainItems.push({ id:`${t.id}-topfix`, label:`${t.name.replace(" 채용관","")} 상단고정` });
      }
    });
    return [
      { group:"메인 채용관",    sectionId:"sec-main",    items:mainItems },
      { group:"채용정보 채용관", sectionId:"sec-recruit", items:recruitBooth.tiers.map(t=>({ id:t.id, label:t.name.replace(" 채용관","") })) },
      { group:"배너 광고",      sectionId:"sec-banner",  items:bannerAds.filter(b=>b.price).map(b=>({ id:b.id, label:b.name })) },
      { group:"이력서 열람",    sectionId:"sec-resume",  items:[{ id:"resume", label:"이력서 열람 서비스" }] },
    ];
  }, [mainBooth, recruitBooth, bannerAds]);

  const LNB_PKG = useMemo(() => [
    {
      group:"배너 패키지", sectionId:"sec-pkg",
      items:[
        ...bannerPackages.map(p=>({ id:p.id, label:p.name })),
        { id:"sec-pkg-compare", label:"패키지 지면 비교", isAnchor:true },
      ],
    },
  ], [bannerPackages]);

  const [activeId, setActiveId] = useState(ALL_ITEMS[0]?.id);

  // LNB 클릭 → 앵커 스크롤
  const handleSelect = (id, isAnchor) => {
    setActiveId(id);
    const el = document.getElementById(isAnchor ? id : anchorId(id));
    if (el) el.scrollIntoView({ behavior:"smooth", block:"start" });
  };

  const handleTabChange = (v) => {
    setTab(v);
    const firstId = v === "all" ? ALL_ITEMS[0].id : bannerPackages[0].id;
    setActiveId(firstId);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  // 스크롤 감지 → 현재 보이는 섹션을 LNB 활성화
  useEffect(() => {
    const allIds = tab === "all"
      ? ALL_ITEMS.map(i => i.id)
      : bannerPackages.map(p => p.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("product-","");
            setActiveId(id);
          }
        });
      },
      { rootMargin:"-30% 0px -60% 0px", threshold:0 }
    );

    allIds.forEach(id => {
      const el = document.getElementById(anchorId(id));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tab]);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif", color:C.text, fontSize:14, fontWeight:400, lineHeight:"20px" }}>

      {/* ── 헤더 ── */}
      <header style={{ background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 3px rgba(15,23,42,0.05)" }}>
        <div style={{ width:"100%", padding:"0 40px", boxSizing:"border-box" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <img src={gamejobLogo} alt="GAMEJOB" style={{ height:28 }} />
              <span style={{ fontSize:13.5, color:C.sub, fontWeight:500 }}>채용 마케팅 상품안내</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              {[["all","전체상품 소개서"],["package","배너패키지 상품 소개서"]].map(([v,l]) => (
                <button key={v} onClick={() => handleTabChange(v)} style={{
                  height:34, padding:"0 14px", fontSize:12, fontWeight:600, borderRadius:7, cursor:"pointer",
                  border:`1px solid ${C.border2}`,
                  background:C.white, color:C.gray,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1.5v7M3.5 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {l}
                </button>
              ))}
              <a href="mailto:ad@gamejob.co.kr" style={{
                display:"inline-flex", alignItems:"center", gap:5,
                height:34, background:C.text, borderRadius:7, padding:"0 16px",
                color:"#fff", fontSize:12, fontWeight:700, textDecoration:"none", marginLeft:2,
              }}>☎ 광고문의</a>
            </div>
          </div>
          {/* 2depth 탭 — 전체상품안내 / 배너패키지 상품 안내 */}
          <nav style={{ display:"flex", gap:0, marginTop:10 }}>
            {[["all","전체 상품안내"],["package","배너패키지 상품 안내"]].map(([v,l]) => (
              <button key={v} onClick={() => handleTabChange(v)} style={{
                padding:"10px 20px", fontSize:13, fontWeight:600,
                background:"transparent", border:"none", cursor:"pointer",
                color: tab===v ? C.text : C.gray2,
                borderBottom: tab===v ? `2px solid ${C.text}` : "2px solid transparent",
                transition:"all .12s", whiteSpace:"nowrap",
              }}>{l}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── 바디 ── */}
      <div style={{ display:"flex", minHeight:`calc(100vh - ${HEADER_H}px)` }}>

        {/* LNB — 왼쪽 고정 (여백 없이) */}
        <div style={{
          width:196, flexShrink:0,
          position:"sticky", top:HEADER_H,
          height:`calc(100vh - ${HEADER_H}px)`,
          overflowY:"auto",
          background:C.white,
          borderRight:`1px solid ${C.border}`,
        }}>
          <LNB
            groups={tab==="all" ? LNB_ALL : LNB_PKG}
            activeId={activeId}
            onSelect={handleSelect}
          />
        </div>

        {/* 콘텐츠 */}
        <div style={{ flex:1, minWidth:0, overflowX:"hidden" }}>
          <div style={{ maxWidth:1244, padding:"28px 36px 80px" }}>

            {tab === "all" && (
              <div>
                <CategorySection id="sec-main" title="메인 채용관" sub="게임잡 메인화면 최상단 — 기업 로고 + 대표공고를 직접 게재. Emperor · Lord · Knight 3단계 선택.">
                  {ALL_ITEMS.filter(i=>i.category==="메인 채용관").map(item => <ProductCard key={item.id} item={item} />)}
                </CategorySection>
                <CategorySection id="sec-recruit" title="채용정보 채용관" sub="채용정보 탭 내 직종·지역·경력 조건 기반 타깃 노출. 메인채용관 구매 시 자동 포함.">
                  {ALL_ITEMS.filter(i=>i.category==="채용정보 채용관").map(item => <ProductCard key={item.id} item={item} />)}
                </CategorySection>
                <CategorySection id="sec-banner" title="배너 광고" sub="메인·서브·모바일·커뮤니티 전 지면 배너. 목적에 맞는 지면을 개별 선택.">
                  {ALL_ITEMS.filter(i=>i.category==="배너 광고").map(item => <ProductCard key={item.id} item={item} />)}
                </CategorySection>
                <CategorySection id="sec-resume" title="이력서 열람 서비스" sub="게임잡 회원의 이력서·포트폴리오·연락처를 열람하고 직접 입사제의.">
                  {ALL_ITEMS.filter(i=>i.category==="이력서 열람").map(item => <ProductCard key={item.id} item={item} />)}
                </CategorySection>
              </div>
            )}

            {tab === "package" && (
              <div>
                <CategorySection id="sec-pkg" title="배너 패키지" sub="여러 지면을 묶어 할인 혜택을 받을 수 있는 패키지 상품.">
                  {bannerPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
                </CategorySection>
                <div id="sec-pkg-compare" style={{ scrollMarginTop:110 }}>
                  <PackageCompare bannerPackages={bannerPackages} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 푸터 ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, background:C.white, padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontSize:12, color:C.gray2, margin:0 }}>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ fontSize:11.5, color:C.gray2, margin:0 }}>* 모든 가격 VAT포함 / 최소 신청기간: 채용관 1주일, 배너 1주일 이상</p>
      </footer>
    </div>
  );
}
