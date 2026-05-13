import { C } from "../../tokens";
import TH from "../ui/TH";
import TD from "../ui/TD";

function ResumePriceTable({ plans }) {
  return (
    <div style={{ marginBottom:32, overflowX:"auto" }}>
      <p style={{ fontSize:C.fs.lg, fontWeight:700, color:C.text, margin:"0 0 12px" }}>이력서 열람 서비스 가격 안내</p>
      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:360 }}>
        <thead>
          <tr>
            <TH>열람 건수</TH>
            <TH>이용기간</TH>
            <TH style={{ background:"#000" }}>가격 (VAT포함)</TH>
          </tr>
        </thead>
        <tbody>
          {plans.map((p, i) => (
            <tr key={p.count} style={{ background: i%2===0 ? C.white : C.grayL }}>
              <TD style={{ fontWeight:700 }}>{p.count} 건</TD>
              <TD>{p.days} 일</TD>
              <TD style={{ fontWeight:700 }}>{p.price?.toLocaleString("ko-KR")} 원</TD>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ResumePriceTable;
