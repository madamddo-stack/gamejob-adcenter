import { C } from "../../tokens";

const BrowserBar = () => (
  <div style={{ background:"#F1F3F4", padding:"6px 10px", display:"flex", alignItems:"center", gap:7, borderBottom:"1px solid #DDE1E7" }}>
    <div style={{ display:"flex", gap:4 }}>
      {["#FF5F57","#FEBC2E","#28C840"].map((c,i) => <div key={i} style={{ width:9, height:9, borderRadius:"50%", background:c }} />)}
    </div>
    <div style={{ flex:1, background:"#fff", borderRadius:4, padding:"2px 8px", fontSize:C.mock.md, color:C.mock.textMuted, textAlign:"center", border:"1px solid #E2E8F0" }}>
      gamejob.co.kr
    </div>
  </div>
);

export default BrowserBar;
