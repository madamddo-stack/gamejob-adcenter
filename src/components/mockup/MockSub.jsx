import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockSub = ({ hl, ads=[] }) => {
  const ad = (id) => ads.find(a => a.id === id) ?? {};
  const lbl = (id) => ad(id).mockupDesc || ad(id).name || "";
  const prv = (id) => ad(id).previewUrl || null;
  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7", height:314 }}>
      <BrowserBar />
      <GNB />

      {/* 3열 레이아웃: [서브날개] [중앙] [서브스카이] */}
      <div style={{ padding:"3px 4px 5px", display:"flex", gap:3, alignItems:"stretch", justifyContent:"center" }}>

        {/* 좌: 서브 날개 */}
        <div style={{ width:50, flexShrink:0 }}>
          <Zone label={lbl("subwing")} color={C.blue} active={hl==="subwing"}
            previewImg={prv("subwing")}
            style={{ padding:"6px 2px", height:120, boxSizing:"border-box" }} />
        </div>

        {/* 중앙: 커뮤니티Pick + 스켈레톤 + 서브하단 */}
        <div style={{ width:356, flexShrink:0, display:"flex", flexDirection:"column", gap:2 }}>

          <Zone label={lbl("commPick")} color={C.blue}
            active={hl==="commPick"} previewImg={prv("commPick")}
            style={{ minHeight:56 }} />

          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"6px 8px", flex:1 }}>
            <SkeletonRow w="60%" h={5} mb={3} />
            <SkeletonRow w="85%" h={4} mb={2} />
            <SkeletonRow w="70%" h={4} mb={2} />
            <SkeletonRow w="55%" h={4} mb={0} />
          </div>

          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ width:"50%" }}>
              <Zone label={lbl("subbottom")} color={C.blue}
                active={hl==="subbottom"} previewImg={prv("subbottom")} />
            </div>
          </div>

        </div>

        {/* 우: 서브 스카이 */}
        <div style={{ width:50, flexShrink:0 }}>
          <Zone label={lbl("subsky")} color={C.blue} active={hl==="subsky"}
            previewImg={prv("subsky")}
            style={{ height:200, padding:"4px 2px", boxSizing:"border-box" }} />
        </div>

      </div>
    </div>
  );
};

export default MockSub;
