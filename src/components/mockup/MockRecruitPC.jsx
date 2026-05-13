import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockRecruitPC = ({ hl, tiers }) => {
  const m = (id) => tiers?.find(t => t.id === id)?.mockup ?? {};
  const name = (id) => tiers?.find(t => t.id === id)?.name ?? id;
  const preview = (id) => tiers?.find(t => t.id === id)?.previewUrl ?? null;
  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />
      <div style={{ padding:"5px 5px 3px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"7px 8px", display:"flex", gap:6 }}>
          {["직종","지역","경력","직급"].map(f => (
            <div key={f} style={{ background:"#E2E8F0", borderRadius:3, padding:"3px 8px" }}>
              <span style={{ fontSize:C.mock.sm, color:C.mock.textMuted }}>{f}</span>
            </div>
          ))}
        </div>
      </div>
      {["sword","shield","armor"].map(id => (
        <div key={id} style={{ padding:"2px 5px" }}>
          <Zone label={name(id)} sub={m(id).sub} color={C.blue}
            active={hl===id} slots={hl===id ? m(id).pcSlots : null}
            rolling={hl===id ? m(id).badge : null} layout="horizontal"
            previewImg={preview(id)} />
        </div>
      ))}
      <div style={{ padding:"3px 5px 5px" }}>
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px 8px" }}>
          <SkeletonRow w="80%" h={6} mb={3} />
          <SkeletonRow w="55%" h={5} mb={0} />
        </div>
      </div>
    </div>
  );
};

export default MockRecruitPC;
