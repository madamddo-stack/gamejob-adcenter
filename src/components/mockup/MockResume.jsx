import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";

const MockResume = () => (
  <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
    <BrowserBar />
    <GNB />
    <div style={{ padding:"10px" }}>
      <div style={{ background:"#fff", borderRadius:7, padding:"11px", border:`1.5px solid ${C.blue}` }}>
        <div style={{ fontSize:C.mock.md, color:C.blue, fontWeight:700, marginBottom:7 }}>▶ 이력서 열람 서비스</div>
        {["이력서 / 자기소개서","포트폴리오","이메일 / 연락처"].map((item,i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5, padding:"4px 7px", background:C.blueL, borderRadius:4 }}>
            <div style={{ width:13, height:13, borderRadius:"50%", background:C.blue, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <span style={{ fontSize:C.mock.sm, color:C.white, fontWeight:800 }}>✓</span>
            </div>
            <span style={{ fontSize:C.mock.md, color:C.text, fontWeight:500 }}>{item}</span>
          </div>
        ))}
        <div style={{ marginTop:7, padding:"6px", background:C.blue, borderRadius:4, textAlign:"center" }}>
          <span style={{ fontSize:C.mock.md, color:C.white, fontWeight:700 }}>입사제의 보내기</span>
        </div>
      </div>
    </div>
  </div>
);

export default MockResume;
