import { C } from "../../tokens";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockBoothMobile = ({ hl, tiers, isTopfix }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const preview = (id) => {
    const tier = tiers?.find(t => t.id === id);
    return (isTopfix ? tier?.previewUrlTopfix : tier?.previewUrl) ?? null;
  };
  return (
    <div style={{ width:"100%", background:"#FAFAFA", borderRadius:14, overflow:"hidden", border:"2px solid #DDE1E7" }}>
      <div style={{ background:"#212936", padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ color:C.white, fontWeight:900, fontSize:C.mock.lg }}>GAMEJOB</span>
        <div style={{ display:"flex", gap:6 }}>
          {["채용정보","커뮤니티"].map(m => <span key={m} style={{ color:"rgba(255,255,255,0.4)", fontSize:C.mock.sm }}>{m}</span>)}
        </div>
      </div>
      <div style={{ padding:"5px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px", marginBottom:3 }}>
          <SkeletonRow w="70%" h={7} mb={3} />
          <SkeletonRow w="50%" h={5} mb={0} />
        </div>
        {["emperor","lord","knight"].map(id => (
          <div key={id} style={{ marginBottom:3 }}>
            <Zone label={tiers?.find(t=>t.id===id)?.name ?? id} sub={m(id).sub}
              color={C.blue} active={hl===id}
              slots={hl===id ? (isTopfix ? (m(id).topfixMobSlots ?? m(id).mobSlots) : m(id).mobSlots) : null}
              rolling={hl===id ? m(id).badge : null}
              topfix={hl===id ? isTopfix : false}
              layout={id==="knight" ? "horizontal" : "vertical"}
              previewImg={preview(id)} />
          </div>
        ))}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginTop:2 }}>
          <SkeletonRow w="90%" h={5} mb={2} />
          <SkeletonRow w="60%" h={5} mb={0} />
        </div>
      </div>
    </div>
  );
};

export default MockBoothMobile;
