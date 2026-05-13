import { C } from "../../tokens";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockRecruitMobile = ({ hl, tiers }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const name = (id) => tiers?.find(t => t.id === id)?.name ?? id;
  const preview = (id) => tiers?.find(t => t.id === id)?.previewUrl ?? null;
  return (
    <div style={{ width:"100%", background:"#FAFAFA", borderRadius:14, overflow:"hidden", border:"2px solid #DDE1E7" }}>
      <div style={{ background:"#212936", padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ color:C.white, fontWeight:900, fontSize:C.mock.lg }}>GAMEJOB</span>
        <span style={{ color:"rgba(255,255,255,0.6)", fontSize:C.mock.md, fontWeight:600 }}>채용정보</span>
      </div>
      <div style={{ padding:"5px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:3, display:"flex", gap:3, flexWrap:"wrap" }}>
          {["직종","지역","경력"].map(f => (
            <div key={f} style={{ background:"#E2E8F0", borderRadius:3, padding:"2px 6px" }}>
              <span style={{ fontSize:C.mock.sm, color:C.mock.textMuted }}>{f}</span>
            </div>
          ))}
        </div>
        {["sword","shield","armor"].map(id => (
          <div key={id} style={{ marginBottom:3 }}>
            <Zone label={name(id)} sub={m(id).sub} color={C.blue}
              active={hl===id} slots={hl===id ? m(id).mobSlots : null}
              rolling={hl===id ? m(id).badge : null} layout="horizontal"
              previewImg={preview(id)} />
          </div>
        ))}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"4px", marginTop:2 }}>
          <SkeletonRow w="85%" h={5} mb={2} />
          <SkeletonRow w="60%" h={5} mb={0} />
        </div>
      </div>
    </div>
  );
};

export default MockRecruitMobile;
