import { C } from "../tokens";

function CategorySection({ id, title, sub, children }) {
  return (
    <section id={id} style={{ marginBottom:56, scrollMarginTop:110, borderTop:`1px solid ${C.border}`, paddingTop:40 }}>
      <div style={{ marginBottom:20 }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <div style={{ width:4, height:24, background:C.blue, borderRadius:2 }} />
          <h2 style={{ fontSize:C.fs["2xl"], fontWeight:800, color:C.text, margin:0, letterSpacing:"-0.02em" }}>{title}</h2>
        </div>
        {sub && <p style={{ fontSize:C.fs.base, color:C.gray, margin:"0 0 0 14px", lineHeight:1.6 }}>{sub}</p>}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        {children}
      </div>
    </section>
  );
}

export default CategorySection;
