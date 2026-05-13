import { useState } from "react";
import { C, PKG_STYLES } from "../tokens";
import PkgMockMain from "./mockup/PkgMockMain";
import PkgMockSub from "./mockup/PkgMockSub";
import PkgMockMobile from "./mockup/PkgMockMobile";

function PackageMockupViewer({ bannerPackages }) {
  const [tab, setTab] = useState("main");
  const tabs = [
    { id:"main",   label:"PC 메인" },
    { id:"sub",    label:"PC 서브" },
    { id:"mobile", label:"모바일"  },
  ];
  return (
    <div id="sec-pkg-compare" style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(15,23,42,0.05)", scrollMarginTop:110 }}>
      <div style={{ padding:"12px 20px", borderBottom:`1px solid ${C.border}`, background:C.grayL, display:"flex", alignItems:"center", gap:24 }}>
        <span style={{ fontSize:C.fs.base, fontWeight:700, color:C.text, whiteSpace:"nowrap" }}>패키지별 노출 지면</span>
        <div style={{ display:"flex", gap:0 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              border:"none", background:"transparent", cursor:"pointer",
              padding:"6px 14px", fontSize:C.fs.sm,
              fontWeight: tab===t.id ? 700 : 500,
              color: tab===t.id ? C.blue : C.gray,
              borderBottom: tab===t.id ? `2px solid ${C.blue}` : "2px solid transparent",
              transition:"all .15s",
            }}>
              {tab===t.id ? `▶ ${t.label}` : t.label}
            </button>
          ))}
        </div>
      </div>
      <div style={{ padding:"20px", display:"flex", gap:14, alignItems:"flex-start" }}>
        {bannerPackages.map(p => {
          const { color } = PKG_STYLES[p.id] ?? { color: C.blue };
          return (
            <div key={p.id} style={{ flex:1, display:"flex", flexDirection:"column", gap:8 }}>
              <div style={{ textAlign:"center" }}>
                <span style={{ fontSize:C.fs.sm, fontWeight:700, color }}>{p.name}</span>
              </div>
              {tab === "main"   && <PkgMockMain   includedIds={p.includedIds} color={color} />}
              {tab === "sub"    && <PkgMockSub    includedIds={p.includedIds} color={color} />}
              {tab === "mobile" && <PkgMockMobile includedIds={p.includedIds} color={color} />}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PackageMockupViewer;
