import { C } from "../../tokens";
import TH from "../ui/TH";
import TD from "../ui/TD";

function RecruitBoothPriceTable({ tiers }) {
  return (
    <div style={{ marginBottom:32, overflowX:"auto" }}>
      <p style={{ fontSize:C.fs.lg, fontWeight:700, color:C.text, margin:"0 0 12px" }}>채용정보 채용관 상품 가격 안내</p>
      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:400 }}>
        <thead>
          <tr>
            <TH>상품명</TH>
            <TH>노출 위치</TH>
            <TH style={{ background:"#000" }}>결합 단가 (일/VAT포함)</TH>
            <TH style={{ background:"#000" }}>개별 단가 (일/VAT포함)</TH>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, i) => (
            <tr key={tier.id} style={{ background: i%2===0 ? C.white : C.grayL }}>
              <TD style={{ fontWeight:700 }}>{tier.name}</TD>
              <TD>{tier.position}</TD>
              <TD style={{ fontWeight:600 }}>{tier.combined?.toLocaleString("ko-KR")} 원</TD>
              <TD>{tier.individual?.toLocaleString("ko-KR")} 원</TD>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize:C.fs.xs, color:C.gray2, marginTop:6, textAlign:"right" }}>※ 메인채용관 구매 시 자동 포함 — Emperor→Sword / Lord→Shield / Knight→Armor</p>
    </div>
  );
}

export default RecruitBoothPriceTable;
