import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockBoothPC = ({ hl, tiers, isTopfix }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const name = (id) => tiers?.find(t => t.id === id)?.name ?? id;
  const preview = (id) => {
    const tier = tiers?.find(t => t.id === id);
    return (isTopfix ? tier?.previewUrlTopfix : tier?.previewUrl) ?? null;
  };
  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />
      <div style={{ display:"flex", alignItems:"stretch" }}>
        <div style={{ width:20, flexShrink:0, background:"#F1F5F9", border:"1px solid #E8ECF2", borderRadius:4, margin:"3px 2px 3px 3px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:C.mock.sm, color:C.mock.textLight, writingMode:"vertical-rl", whiteSpace:"nowrap" }}>백스킨(좌)</span>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2, padding:"3px 0" }}>
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px 6px" }}>
            <SkeletonRow w="60%" h={5} mb={2} />
            <SkeletonRow w="40%" h={4} mb={0} />
          </div>
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 6px" }}>
            <SkeletonRow w="50%" h={4} mb={0} />
          </div>
          <Zone label={name("emperor")} sub={m("emperor").sub} color={C.blue}
            active={hl==="emperor"} slots={hl==="emperor" ? (isTopfix ? (m("emperor").topfixPcSlots ?? m("emperor").pcSlots) : m("emperor").pcSlots) : null}
            rolling={hl==="emperor" ? m("emperor").badge : null}
            topfix={hl==="emperor" ? isTopfix : false}
            previewImg={preview("emperor")} />
          <div style={{ background:"#F1F5F9", borderRadius:4, padding:"3px 6px" }}>
            <SkeletonRow w="50%" h={4} mb={0} />
          </div>
          <Zone label={name("lord")} sub={m("lord").sub} color={C.blue}
            active={hl==="lord"} slots={hl==="lord" ? (isTopfix ? (m("lord").topfixPcSlots ?? m("lord").pcSlots) : m("lord").pcSlots) : null}
            rolling={hl==="lord" ? m("lord").badge : null}
            topfix={hl==="lord" ? isTopfix : false}
            previewImg={preview("lord")} />
          <Zone label={name("knight")} sub={m("knight").sub} color={C.blue}
            active={hl==="knight"} slots={hl==="knight" ? m("knight").pcSlots : null}
            rolling={hl==="knight" ? m("knight").badge : null} layout="horizontal"
            previewImg={preview("knight")} />
        </div>
        <div style={{ width:20, flexShrink:0, background:"#F1F5F9", border:"1px solid #E8ECF2", borderRadius:4, margin:"3px 3px 3px 2px", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <span style={{ fontSize:C.mock.sm, color:C.mock.textLight, writingMode:"vertical-rl", whiteSpace:"nowrap" }}>백스킨(우)</span>
        </div>
      </div>
    </div>
  );
};

export default MockBoothPC;
