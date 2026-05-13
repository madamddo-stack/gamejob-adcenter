import { C } from "../../tokens";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockMobile = ({ hl, ads=[] }) => {
  const ad = (id) => ads.find(a => a.id === id) ?? {};
  const lbl = (id) => ad(id).mockupDesc || ad(id).name || "";
  const prv = (id) => ad(id).previewUrl || null;
  return (
    <div style={{ width:"100%", background:"#FAFAFA", borderRadius:14, overflow:"hidden", border:"2px solid #DDE1E7", height:278 }}>
      <div style={{ background:"#212936", padding:"6px 10px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ color:C.white, fontWeight:900, fontSize:C.mock.lg }}>GAMEJOB</span>
        <div style={{ display:"flex", gap:6 }}>
          {["채용정보","커뮤니티"].map(m => <span key={m} style={{ color:"rgba(255,255,255,0.4)", fontSize:C.mock.sm }}>{m}</span>)}
        </div>
      </div>
      <div style={{ padding:"5px" }}>
        {/* 모바일 메인띠 — commPick일 때 스켈레톤으로 대체 */}
        {hl === "commPick" ? (
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px", marginBottom:3 }}>
            <SkeletonRow w="80%" h={6} mb={2} />
            <SkeletonRow w="55%" h={4} mb={0} />
          </div>
        ) : (
          <Zone label={lbl("mobMain")} color={C.blue} active={hl==="mobMain"} previewImg={prv("mobMain")} style={{ marginBottom:3 }} />
        )}
        {/* 채용관 스켈레톤 */}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:3 }}>
          <SkeletonRow w="70%" h={6} mb={2} />
          <SkeletonRow w="50%" h={5} mb={0} />
        </div>
        {/* 커뮤니티 Pick — mobMain일 때 스켈레톤으로 대체 */}
        {hl === "mobMain" ? (
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px", marginBottom:3, marginTop:2 }}>
            <SkeletonRow w="75%" h={5} mb={2} />
            <SkeletonRow w="50%" h={4} mb={0} />
          </div>
        ) : (
          <Zone label={lbl("commPick")} color={C.blue} active={hl==="commPick"} previewImg={prv("commPick")} style={{ marginBottom:3, marginTop:2 }} />
        )}
        {/* 커뮤니티Pick ~ 모바일서브띠 사이 콘텐츠 스켈레톤 */}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:2 }}>
          <SkeletonRow w="80%" h={4} mb={2} />
          <SkeletonRow w="60%" h={4} mb={2} />
          <SkeletonRow w="70%" h={4} mb={0} />
        </div>
        {/* 모바일 서브띠 — mobMain일 때 스켈레톤으로 대체 */}
        {hl === "mobMain" ? (
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:2 }}>
            <SkeletonRow w="65%" h={5} mb={0} />
          </div>
        ) : (
          <Zone label={lbl("mobSub")} color={C.blue} active={hl==="mobSub"} previewImg={prv("mobSub")} style={{ marginBottom:2 }} />
        )}
        {/* 모바일 서브띠 하단 스켈레톤 */}
        <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px", marginBottom:2 }}>
          <SkeletonRow w="75%" h={4} mb={2} />
          <SkeletonRow w="50%" h={4} mb={0} />
        </div>
      </div>
    </div>
  );
};

export default MockMobile;
