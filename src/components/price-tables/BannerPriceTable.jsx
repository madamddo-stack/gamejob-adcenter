import { C } from "../../tokens";
import TH from "../ui/TH";
import TD from "../ui/TD";

function BannerPriceTable({ bannerAds }) {
  const priced = bannerAds.filter(b => b.price != null);

  const ZONE_LABEL = { "서브": "서브 (커뮤니티 등)" };
  const zoneLabel = (z) => ZONE_LABEL[z] || z;

  const rows = priced.map((item, idx) => {
    const prev = idx > 0 ? priced[idx - 1] : null;
    const showDevice = !prev || prev.device !== item.device;
    const showZone   = !prev || prev.device !== item.device || prev.zone !== item.zone;
    const deviceRowSpan = showDevice ? priced.filter(b => b.device === item.device).length : 0;
    const zoneRowSpan   = showZone   ? priced.filter(b => b.device === item.device && b.zone === item.zone).length : 0;
    return { item, showDevice, deviceRowSpan, showZone, zoneRowSpan };
  });

  return (
    <div style={{ marginBottom:32, overflowX:"auto" }}>
      <p style={{ fontSize:C.fs.lg, fontWeight:700, color:C.text, margin:"0 0 12px" }}>배너 광고 상품 가격 안내</p>
      <table style={{ width:"100%", borderCollapse:"collapse", minWidth:660 }}>
        <thead>
          <tr>
            <TH>노출 디바이스</TH>
            <TH>노출 지면</TH>
            <TH>상품명</TH>
            <TH>노출 기간 (노출일)</TH>
            <TH>노출 방식</TH>
            <TH style={{ background:"#000" }}>가격(VAT 포함)</TH>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ item, showDevice, deviceRowSpan, showZone, zoneRowSpan }) => (
            <tr key={item.id}>
              {showDevice && <TD rowSpan={deviceRowSpan} style={{ fontWeight:600 }}>{item.device}</TD>}
              {showZone   && <TD rowSpan={zoneRowSpan}>{zoneLabel(item.zone)}</TD>}
              <TD style={{ fontWeight:700 }}>{item.name}</TD>
              <TD>1주일 (7일)</TD>
              <TD style={{ fontSize:C.fs.sm, color:C.gray }}>{item.rolling}</TD>
              <TD style={{ fontWeight:700 }}>{item.price?.toLocaleString("ko-KR")}원</TD>
            </tr>
          ))}
        </tbody>
      </table>
      <p style={{ fontSize:C.fs.xs, color:C.gray2, marginTop:6, textAlign:"right" }}>※ 최소 신청기간 : 1주일 이상</p>
    </div>
  );
}

export default BannerPriceTable;
