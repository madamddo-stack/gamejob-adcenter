import { useState } from "react";
import { C } from "../tokens";

const PRODUCTS = [
  "메인 채용관 (Emperor)", "메인 채용관 (Lord)", "메인 채용관 (Knight)",
  "채용정보 채용관 (Sword)", "채용정보 채용관 (Shield)", "채용정보 채용관 (Armor)",
  "배너 광고", "배너 패키지", "이력서 열람 서비스", "기타",
];

function InquiryModal({ onClose }) {
  const [form, setForm] = useState({ company:"", contact:"", email:"", phone:"", product:"", message:"" });
  const [status, setStatus] = useState("idle"); // idle | sending | done | error
  const [errMsg, setErrMsg] = useState("");

  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrMsg("");
    try {
      const r = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error || "전송 실패");
      setStatus("done");
    } catch(e) {
      setErrMsg(e.message);
      setStatus("error");
    }
  };

  const inputStyle = {
    width:"100%", boxSizing:"border-box",
    border:`1px solid ${C.border2}`, borderRadius:7,
    padding:"9px 12px", fontSize:C.fs.base, color:C.text,
    outline:"none", background:"#fff",
    fontFamily:"inherit",
  };
  const labelStyle = { fontSize:C.fs.sm, fontWeight:600, color:C.gray, marginBottom:5, display:"block" };

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:9000,
      background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center",
    }} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div style={{
        background:"#fff", borderRadius:14, width:"100%", maxWidth:520,
        maxHeight:"90vh", overflowY:"auto",
        boxShadow:"0 20px 60px rgba(0,0,0,0.2)",
        margin:"0 16px",
      }}>
        {/* 헤더 */}
        <div style={{ padding:"20px 24px 16px", borderBottom:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <h2 style={{ margin:0, fontSize:C.fs.xl, fontWeight:800, color:C.text }}>광고 문의</h2>
            <p style={{ margin:"4px 0 0", fontSize:C.fs.sm, color:C.gray2 }}>문의 내용은 노션으로 전달되며 담당자가 확인 후 연락드립니다.</p>
          </div>
          <button onClick={onClose} style={{ border:"none", background:"transparent", cursor:"pointer", fontSize:C.fs["2xl"], color:C.gray2, lineHeight:1, padding:4 }}>✕</button>
        </div>

        {status === "done" ? (
          /* 완료 화면 */
          <div style={{ padding:"48px 24px", textAlign:"center" }}>
            <div style={{ fontSize:C.fs["4xl2"], marginBottom:16 }}>✅</div>
            <p style={{ fontSize:C.fs.lg2, fontWeight:700, color:C.text, margin:"0 0 8px" }}>문의가 접수되었습니다!</p>
            <p style={{ fontSize:C.fs.base, color:C.gray, margin:"0 0 24px" }}>담당자가 확인 후 이메일로 연락드리겠습니다.</p>
            <button onClick={onClose} style={{
              background:"#000000", color:C.white, border:"none", borderRadius:8,
              padding:"10px 28px", fontSize:C.fs.base, fontWeight:700, cursor:"pointer",
            }}>확인</button>
          </div>
        ) : (
          /* 폼 */
          <form onSubmit={submit} style={{ padding:"20px 24px 24px", display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={labelStyle}>회사명 <span style={{ color:C.pink }}>*</span></label>
                <input style={inputStyle} placeholder="회사명" value={form.company} onChange={set("company")} required />
              </div>
              <div>
                <label style={labelStyle}>담당자명</label>
                <input style={inputStyle} placeholder="담당자명" value={form.contact} onChange={set("contact")} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              <div>
                <label style={labelStyle}>이메일 <span style={{ color:C.pink }}>*</span></label>
                <input style={inputStyle} type="email" placeholder="example@company.com" value={form.email} onChange={set("email")} required />
              </div>
              <div>
                <label style={labelStyle}>연락처</label>
                <input style={inputStyle} placeholder="010-0000-0000" value={form.phone} onChange={set("phone")} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>관심 상품</label>
              <select style={{ ...inputStyle, cursor:"pointer" }} value={form.product} onChange={set("product")}>
                <option value="">상품 선택 (선택)</option>
                {PRODUCTS.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label style={labelStyle}>문의 내용 <span style={{ color:C.pink }}>*</span></label>
              <textarea style={{ ...inputStyle, resize:"vertical", minHeight:100 }}
                placeholder="문의하실 내용을 입력해주세요."
                value={form.message} onChange={set("message")} required />
            </div>
            {status === "error" && (
              <p style={{ margin:0, fontSize:C.fs.sm, color:C.pink }}>⚠ {errMsg || "전송에 실패했습니다. 다시 시도해주세요."}</p>
            )}
            <button type="submit" disabled={status === "sending"} style={{
              background: status === "sending" ? C.gray2 : "#000000",
              color:C.white, border:"none", borderRadius:8,
              padding:"12px", fontSize:C.fs.md, fontWeight:700,
              cursor: status === "sending" ? "not-allowed" : "pointer",
              transition:"background .15s",
            }}>
              {status === "sending" ? "전송 중..." : "문의 접수하기"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default InquiryModal;
