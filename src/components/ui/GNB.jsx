import { C } from "../../tokens";

const GNB = () => (
  <div style={{ background:"#212936", padding:"7px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
    <span style={{ color:C.white, fontWeight:900, fontSize:C.fs.xs, letterSpacing:"-0.02em" }}>GAMEJOB</span>
    <div style={{ display:"flex", gap:10 }}>
      {["채용정보","커뮤니티","기업정보","인재정보"].map(m => (
        <span key={m} style={{ color:"rgba(255,255,255,0.45)", fontSize:C.mock.sm }}>{m}</span>
      ))}
    </div>
  </div>
);

export default GNB;
