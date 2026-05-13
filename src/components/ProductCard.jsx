import { useState } from "react";
import { C, anchorId } from "../tokens";
import MockBoothMobile from "./mockup/MockBoothMobile";
import MockBoothPC from "./mockup/MockBoothPC";
import MockRecruitPC from "./mockup/MockRecruitPC";
import MockRecruitMobile from "./mockup/MockRecruitMobile";

function ProductCard({ item, isMobile }) {
  const [tabIdx, setTabIdx] = useState(0);
  const tab = item.priceTabs[Math.min(tabIdx, item.priceTabs.length-1)];
  const isBoothType = item.category === "메인 채용관" || item.category === "채용정보 채용관";

  const renderMockup = () => {
    if (item.category === "메인 채용관") {
      const hlId = item.hlId || item.id;
      return (
        <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:14, alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:155, flexShrink:0 }}>
            <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
            <MockBoothMobile hl={hlId} tiers={item.tiers} isTopfix={item.isTopfix} />
          </div>
          <div style={{ width:430, flexShrink:0 }}>
            <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>PC</p>
            <MockBoothPC hl={hlId} tiers={item.tiers} isTopfix={item.isTopfix} />
          </div>
        </div>
      );
    }
    if (item.category === "채용정보 채용관") {
      return (
        <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", gap:14, alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:155, flexShrink:0 }}>
            <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
            <MockRecruitMobile hl={item.id} tiers={item.tiers} />
          </div>
          <div style={{ width:430, flexShrink:0 }}>
            <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>PC</p>
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
          <span style={{ fontSize:C.fs.sm, color:C.gray, fontWeight:500 }}>지면 위치</span>
          {item.zoneLabel && (
            <span style={{ fontSize:C.fs.xs, color:C.blue, background:C.blueL, padding:"2px 8px", borderRadius:4, fontWeight:600 }}>{item.zoneLabel}</span>
          )}
          {item.tag && (
            <span style={{ fontSize:C.fs.xs, fontWeight:600, color:item.tagColor, background:item.tagBg, padding:"2px 9px", borderRadius:4 }}>{item.tag}</span>
          )}
        </div>
      </div>

      {/* 카드 바디 */}
      <div style={{ display:"grid", gridTemplateColumns: isMobile ? "1fr" : "3fr 2fr" }}>

        {/* 좌 — 목업 */}
        <div style={{ padding: isMobile ? "16px" : "24px 20px", borderRight: isMobile ? "none" : `1px solid ${C.border}`, borderBottom: isMobile ? `1px solid ${C.border}` : "none", background:"#FAFCFF", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <div style={{ width:"100%", maxWidth: (isBoothType || item.id === "commPick") ? "100%" : 480 }}>
            {renderMockup()}
          </div>
        </div>

        {/* 우 — 설명+가격 */}
        <div style={{ padding: isMobile ? "16px" : "24px 28px", display:"flex", flexDirection:"column", gap:18 }}>
          <div>
            <h3 style={{ fontSize:C.fs["2xl"], fontWeight:800, color:C.text, margin:0, letterSpacing:"-0.02em" }}>{item.title}</h3>
          </div>

          {/* 특징 / 노출 */}
          {item.exposure ? (
            <>
              <div>
                <p style={{ fontSize:C.fs.xs, fontWeight:600, color:C.gray, marginBottom:8, letterSpacing:"0.02em" }}>노출</p>
                <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden" }}>
                  {item.exposure.map((row,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", borderBottom: i < item.exposure.length-1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize:C.fs.sm, color:C.gray, fontWeight:600, width:96, flexShrink:0, padding:"8px 12px", background:C.grayL, whiteSpace:"nowrap" }}>{row.label}</span>
                      <span style={{ fontSize:C.fs.base, color:C.text, padding:"8px 12px" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize:C.fs.xs, fontWeight:600, color:C.gray, marginBottom:8, letterSpacing:"0.02em" }}>제작 가이드</p>
                <div style={{ display:"flex", flexDirection:"column", gap:0, border:`1px solid ${C.border}`, borderRadius:7, overflow:"hidden" }}>
                  {item.guide.map((row,i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", borderBottom: i < item.guide.length-1 ? `1px solid ${C.border}` : "none" }}>
                      <span style={{ fontSize:C.fs.sm, color:C.gray, fontWeight:600, width:96, flexShrink:0, padding:"8px 12px", background:C.grayL, whiteSpace:"nowrap" }}>{row.label}</span>
                      <span style={{ fontSize:C.fs.base, color:C.text, padding:"8px 12px" }}>{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div>
              <p style={{ fontSize:C.fs.xs, fontWeight:600, color:C.gray, marginBottom:8, letterSpacing:"0.02em" }}>상품 특징</p>
              <div style={{ display:"flex", flexDirection:"column", gap:5 }}>
                {item.features.map((f,i) => (
                  <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <div style={{ width:16, height:16, borderRadius:"50%", background:C.blueL, border:`1.5px solid ${C.blue}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3.2 5.8L6.5 2.2" stroke={C.blue} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontSize:C.fs.base, color:C.sub, lineHeight:1.55 }}>{f}</span>
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
                    padding:"5px 13px", fontSize:C.fs.sm, fontWeight:600, cursor:"pointer",
                    border:"none", borderRight: i < item.priceTabs.length-1 ? `1px solid ${C.border}` : "none",
                    background: tabIdx===i ? C.blue : C.white,
                    color: tabIdx===i ? C.white : C.gray,
                  }}>{t.label}</button>
                ))}
              </div>
            )}
            <div style={{ minHeight: Math.max(...item.priceTabs.map(t => t.rows.length * (t.rows.some(r => r.sub) ? 46 : 33))) }}>
              {tab.rows.map((r,i) => (
                <div key={i} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${C.border}` }}>
                  <span style={{ fontSize:C.fs.base, color:i===0?C.text:C.gray }}>{r.label}</span>
                  <div style={{ textAlign:"right" }}>
                    {r.sub && <div style={{ fontSize:C.fs.xs, color:C.mock.textLight, textDecoration:"line-through" }}>{r.sub}</div>}
                    <span style={{ fontSize:i===0?16:13.5, fontWeight:i===0?700:500, color:i===0?C.blue:C.text }}>{r.value}</span>
                  </div>
                </div>
              ))}
            </div>
            {tab.note && <p style={{ fontSize:C.fs.xs, color:C.gray2, marginTop:6 }}>{tab.note}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
