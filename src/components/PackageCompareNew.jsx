import { C, PKG_STYLES, anchorId } from "../tokens";
import { packageCompareRows } from "../data/products";

function PackageCompareNew({ bannerPackages }) {
  return (
    <div id={anchorId("allinone")} style={{ background:C.white, borderRadius:12, border:`1px solid ${C.border}`, overflow:"hidden", boxShadow:"0 1px 6px rgba(15,23,42,0.05)", scrollMarginTop:110 }}>
      <table style={{ width:"100%", borderCollapse:"collapse", tableLayout:"fixed" }}>
        <colgroup>
          <col style={{ width:96 }} />
          {bannerPackages.map(p => <col key={p.id} />)}
        </colgroup>
        <thead>
          <tr>
            <th style={{ padding:"16px 14px", background:C.grayL, borderBottom:`1px solid ${C.border}`, textAlign:"left", fontSize:C.fs.xs, color:C.gray, fontWeight:600, verticalAlign:"middle" }}>구분</th>
            {bannerPackages.map(p => {
              const { color } = PKG_STYLES[p.id] ?? {};
              return (
                <th key={p.id} id={anchorId(p.id)} style={{ padding:"16px", background:C.grayL, borderBottom:`1px solid ${C.border}`, borderLeft:`1px solid ${C.border}`, textAlign:"center", verticalAlign:"middle", scrollMarginTop:110 }}>
                  <div style={{ color, fontWeight:800, fontSize:C.fs.lg2 }}>{p.name}</div>
                  <span style={{ display:"inline-block", marginTop:6, background:color, color:C.white, fontSize:C.mock.lg, fontWeight:700, padding:"2px 10px", borderRadius:20 }}>
                    {p.includedIds.length} 지면
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {/* 해시태그 */}
          <tr style={{ borderBottom:`1px solid ${C.border}` }}>
            <td style={{ background:C.grayL }} />
            {bannerPackages.map(p => {
              const { color, bgLight } = PKG_STYLES[p.id] ?? {};
              return (
                <td key={p.id} style={{ padding:"11px 16px", borderLeft:`1px solid ${C.border}`, background:bgLight, textAlign:"center" }}>
                  <span style={{ fontSize:C.fs.base, fontWeight:700, color }}>{(p.hashtags||[]).join("  ")}</span>
                </td>
              );
            })}
          </tr>
          {/* 핵심특징 */}
          <tr style={{ borderBottom:`1px solid ${C.border}` }}>
            <td style={{ padding:"16px 14px", fontWeight:700, fontSize:C.fs.sm, color:C.text, verticalAlign:"top", whiteSpace:"nowrap" }}>핵심특징</td>
            {bannerPackages.map(p => {
              const { color } = PKG_STYLES[p.id] ?? {};
              return (
                <td key={p.id} style={{ padding:"16px", borderLeft:`1px solid ${C.border}`, verticalAlign:"top" }}>
                  {(p.features||[]).map((f,i) => (
                    <div key={i} style={{ display:"flex", gap:8, alignItems:"flex-start", marginBottom:i < (p.features.length-1) ? 10 : 0 }}>
                      <span style={{ color, fontWeight:700, fontSize:C.fs.base, flexShrink:0 }}>{["①","②","③"][i]}</span>
                      <span style={{ fontSize:C.fs.base, color:C.sub, lineHeight:1.6 }}>{f}</span>
                    </div>
                  ))}
                </td>
              );
            })}
          </tr>
          {/* 포함지면 */}
          <tr style={{ borderBottom:`1px solid ${C.border}` }}>
            <td style={{ padding:"16px 14px", fontWeight:700, fontSize:C.fs.sm, color:C.text, verticalAlign:"top", whiteSpace:"nowrap" }}>포함지면</td>
            {bannerPackages.map(p => (
              <td key={p.id} style={{ padding:"16px", borderLeft:`1px solid ${C.border}`, verticalAlign:"top" }}>
                {(() => {
                  const seen = new Set();
                  const byZone = {};
                  packageCompareRows.forEach(r => {
                    if (!p.includedIds.includes(r.id) || seen.has(r.name)) return;
                    seen.add(r.name);
                    const z = r.zone.replace(" 페이지","");
                    if (!byZone[z]) byZone[z] = [];
                    byZone[z].push(r.name);
                  });
                  return Object.entries(byZone).map(([zone, names]) => (
                    <div key={zone} style={{ marginBottom:5 }}>
                      <span style={{ fontSize:C.fs.xs, color:C.gray2, fontWeight:600 }}>{zone} : </span>
                      <span style={{ fontSize:C.fs.sm, color:C.sub }}>{names.join(" · ")}</span>
                    </div>
                  ));
                })()}
              </td>
            ))}
          </tr>
          {/* 가격 */}
          <tr style={{ background:C.navy }}>
            <td style={{ padding:"14px", fontWeight:700, fontSize:C.fs.sm, color:C.white, whiteSpace:"nowrap" }}>가격</td>
            {bannerPackages.map(p => (
              <td key={p.id} style={{ padding:"14px 16px", borderLeft:"1px solid rgba(255,255,255,0.1)", textAlign:"center" }}>
                <div style={{ fontWeight:800, fontSize:C.fs.xl, color:C.white }}>{p.price?.toLocaleString("ko-KR")}원</div>
                <div style={{ fontSize:C.fs.xs, color:"rgba(255,255,255,0.5)", marginTop:3 }}>1주일 · VAT포함</div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PackageCompareNew;
