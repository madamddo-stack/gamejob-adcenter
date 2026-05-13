import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";
import SkeletonRow from "../ui/SkeletonRow";
import ZoneMulti from "./ZoneMulti";

const PkgMockMain = ({ includedIds, color }) => {
  const isSkin = includedIds.includes("backskin");
  const isEdge = includedIds.includes("emperiredge");
  const isCurtain = includedIds.includes("curtain");
  const skinStyle = (side) => ({
    width: 36, flexShrink:0,
    background: isSkin ? `${color}12` : "#F1F5F9",
    border: isSkin ? `1.5px solid ${color}` : "1px solid #E8ECF2",
    borderRadius:4,
    margin: side==="left" ? "3px 2px 3px 3px" : "3px 3px 3px 2px",
    display:"flex", alignItems:"center", justifyContent:"center",
  });
  return (
    <div style={{ background:"#FAFAFA", borderRadius:6, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />
      {isCurtain && (
        <div style={{ margin:"3px", background:`${color}15`, border:`1.5px solid ${color}`, borderRadius:4, padding:"4px 8px" }}>
          <span style={{ fontSize:C.mock.sm, fontWeight:700, color }}>▶ 메인 커튼</span>
        </div>
      )}
      <div style={{ display:"flex", alignItems:"stretch" }}>
        <div style={skinStyle("left")}>
          <span style={{ fontSize:C.mock.sm, fontWeight:isSkin?700:400, color:isSkin?color:C.gray2, writingMode:"vertical-rl" }}>
            {isSkin ? "▶ 백스킨(좌)" : "백스킨(좌)"}
          </span>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2, padding:"3px 0" }}>
          <div style={{ display:"flex", gap:2, alignItems:"stretch" }}>
            <ZoneMulti label="메인 탑" id="maintop" includedIds={includedIds} color={color} style={{ flex:2, minHeight:22 }} />
            <div style={{ flex:1, display:"flex", gap:2 }}>
              <div style={{ flex:1, background:"#E9EEF4", borderRadius:4 }} />
              <div style={{ flex:1, background:"#E9EEF4", borderRadius:4 }} />
            </div>
          </div>
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"4px 6px" }}>
            <SkeletonRow w="50%" h={4} mb={2} />
            <SkeletonRow w="80%" h={3} mb={0} />
          </div>
          <ZoneMulti label="메인 상단띠" id="topstrip" includedIds={includedIds} color={color} />
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"4px 5px" }}>
            <SkeletonRow w="40%" h={4} mb={2} />
            <div style={{ display:"flex", gap:2 }}>
              {[0,1,2,3].map(i => {
                const isEdgeSlot = i === 3;
                const edgeActive = isEdgeSlot && isEdge;
                return (
                  <div key={i} style={{
                    flex:1, borderRadius:3, padding:"3px 2px",
                    background: edgeActive ? `${color}12` : "#E9EEF4",
                    border: isEdgeSlot ? `${edgeActive?"1.5px":"1px"} solid ${edgeActive?color:C.border2}` : "none",
                  }}>
                    {isEdgeSlot
                      ? <div style={{ fontSize:C.mock.sm, color:edgeActive?color:C.gray2, fontWeight:edgeActive?700:400, textAlign:"center" }}>{edgeActive?"▶ Emperor Edge":"Emperor Edge"}</div>
                      : <><div style={{ width:"40%", height:6, background:"#D1D9E6", borderRadius:2, margin:"0 auto 2px" }} /><SkeletonRow w="90%" h={2} mb={0} /></>
                    }
                  </div>
                );
              })}
            </div>
          </div>
          <ZoneMulti label="메인 미들띠" id="midstrip" includedIds={includedIds} color={color} />
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 5px" }}>
            <SkeletonRow w="35%" h={4} mb={2} />
            <div style={{ display:"flex", gap:2 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ flex:1, background:"#E9EEF4", borderRadius:3, padding:"3px 2px" }}>
                  <SkeletonRow w="90%" h={2} mb={2} /><SkeletonRow w="70%" h={2} mb={0} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={skinStyle("right")}>
          <span style={{ fontSize:C.mock.sm, fontWeight:isSkin?700:400, color:isSkin?color:C.gray2, writingMode:"vertical-rl" }}>
            {isSkin ? "▶ 백스킨(우)" : "백스킨(우)"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PkgMockMain;
