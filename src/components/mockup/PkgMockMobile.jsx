import { C } from "../../tokens";
import SkeletonRow from "../ui/SkeletonRow";
import ZoneMulti from "./ZoneMulti";

const PkgMockMobile = ({ includedIds, color }) => (
  <div style={{ background:"#FAFAFA", borderRadius:10, overflow:"hidden", border:"2px solid #DDE1E7" }}>
    <div style={{ background:"#212936", padding:"5px 8px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
      <span style={{ color:C.white, fontWeight:900, fontSize:C.mock.md }}>GAMEJOB</span>
      <div style={{ display:"flex", gap:5 }}>
        {["채용정보","커뮤니티"].map(m => <span key={m} style={{ color:"rgba(255,255,255,0.4)", fontSize:C.mock.sm }}>{m}</span>)}
      </div>
    </div>
    <div style={{ padding:"4px" }}>
      <ZoneMulti label="모바일 메인띠" id="mobMain" includedIds={includedIds} color={color} style={{ marginBottom:2 }} />
      <div style={{ background:"#F1F5F9", borderRadius:4, padding:"4px", marginBottom:2 }}>
        <SkeletonRow w="70%" h={5} mb={2} /><SkeletonRow w="50%" h={4} mb={0} />
      </div>
      <ZoneMulti label="커뮤니티 Pick" id="commPick" includedIds={includedIds} color={color} style={{ marginBottom:2 }} />
      <div style={{ background:"#F1F5F9", borderRadius:4, padding:"4px", marginBottom:2 }}>
        <SkeletonRow w="80%" h={3} mb={2} /><SkeletonRow w="60%" h={3} mb={0} />
      </div>
      <ZoneMulti label="모바일 서브띠" id="mobSub" includedIds={includedIds} color={color} />
    </div>
  </div>
);

export default PkgMockMobile;
