import { C } from "../../tokens";
import TH from "../ui/TH";
import TD from "../ui/TD";

const parsePeriod = (p) => {
  const m = p.match(/(\d+)(주|개월)\((\d+)일\)/);
  if (!m) return { label: p, days: "" };
  return { label: `${m[1]} ${m[2]==="주"?"주일":"개월"}`, days: `${m[3]} 일` };
};

function MainBoothPriceTable({ tiers }) {
  return (
    <div style={{ marginBottom:32, overflowX:"auto" }}>
      <p style={{ fontSize:C.fs.lg, fontWeight:700, color:C.text, margin:"0 0 12px" }}>메인 채용관 상품 가격 안내</p>
      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:700 }}>
        <thead>
          <tr>
            <TH rowSpan={2}>상품명</TH>
            <TH rowSpan={2}>노출기간</TH>
            <TH rowSpan={2}>노출일</TH>
            <TH colSpan={3} style={{ background:"#000" }}>상품가격 (VAT포함)</TH>
          </tr>
          <tr>
            <TH>결합상품(PC+M)</TH>
            <TH>개별상품(PC/M 별도)</TH>
            <TH>상단고정 옵션</TH>
          </tr>
        </thead>
        <tbody>
          {tiers.map(tier =>
            tier.combined.map((row, i) => {
              const { label, days } = parsePeriod(row.period);
              const indiv = tier.individual[i];
              const pct = row.original ? Math.round((1 - row.price / row.original) * 100) : null;
              return (
                <tr key={`${tier.id}-${i}`} style={{ background: i%2===0 ? C.white : C.grayL }}>
                  {i === 0 && (
                    <TD rowSpan={tier.combined.length} style={{ fontWeight:700, background:C.grayL, minWidth:120 }}>
                      <span style={{ fontWeight:800 }}>{tier.name.replace(" 채용관","")}</span>
                      <span style={{ fontWeight:400, color:C.gray, fontSize:C.fs.sm }}> 채용관</span>
                    </TD>
                  )}
                  <TD>{label}</TD>
                  <TD>{days}</TD>
                  <TD>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, flexWrap:"nowrap" }}>
                      {row.original && <span style={{ fontSize:C.fs.xs, color:C.mock.textMuted, textDecoration:"line-through", whiteSpace:"nowrap" }}>{row.original.toLocaleString("ko-KR")}원</span>}
                      {pct && <span style={{ fontSize:C.fs.xs, color:C.pink, fontWeight:700, whiteSpace:"nowrap" }}>{pct}%↓</span>}
                      <span style={{ fontWeight:700, whiteSpace:"nowrap" }}>{row.price.toLocaleString("ko-KR")} 원</span>
                    </div>
                  </TD>
                  <TD>{indiv ? `${indiv.price.toLocaleString("ko-KR")} 원` : "-"}</TD>
                  <TD style={{ color: row.topfix ? C.text : C.gray2 }}>{row.topfix ? `${row.topfix.toLocaleString("ko-KR")} 원` : "-"}</TD>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
      <p style={{ fontSize:C.fs.xs, color:C.gray2, marginTop:6, textAlign:"right" }}>※ 최소 신청기간 : 1주일</p>
    </div>
  );
}

export default MainBoothPriceTable;
