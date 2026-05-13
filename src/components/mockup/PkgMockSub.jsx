import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";
import SkeletonRow from "../ui/SkeletonRow";
import ZoneMulti from "./ZoneMulti";

const PkgMockSub = ({ includedIds, color }) => (
  <div style={{ background:"#FAFAFA", borderRadius:6, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"3px 3px 4px", display:"flex", gap:2, alignItems:"stretch", justifyContent:"center" }}>
      <div style={{ width:36, flexShrink:0 }}>
        <ZoneMulti label="서브 날개" id="subwing" includedIds={includedIds} color={color}
          style={{ height:88, boxSizing:"border-box" }} />
      </div>
      <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
        <ZoneMulti label="커뮤니티 Pick" id="commPick" includedIds={includedIds} color={color} style={{ minHeight:38 }} />
        <div style={{ background:"#F1F5F9", borderRadius:4, padding:"4px 6px", flex:1 }}>
          <SkeletonRow w="60%" h={4} mb={2} /><SkeletonRow w="80%" h={3} mb={0} />
        </div>
        <div style={{ display:"flex", justifyContent:"center" }}>
          <div style={{ width:"55%" }}>
            <ZoneMulti label="서브 하단" id="subbottom" includedIds={includedIds} color={color} />
          </div>
        </div>
      </div>
      <div style={{ width:36, flexShrink:0 }}>
        <ZoneMulti label="서브 스카이" id="subsky" includedIds={includedIds} color={color}
          style={{ height:150, boxSizing:"border-box" }} />
      </div>
    </div>
  </div>
);

export default PkgMockSub;
