import { useState } from "react";
import { C } from "../../tokens";

const Zone = ({ label, sub, color, active, style={}, slots, rolling, topfix, layout="vertical", previewImg }) => {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos] = useState({ x:0, y:0 });
  const handleMouseMove = (e) => setPos({ x: e.clientX, y: e.clientY });
  return (
    <div
      style={{ borderRadius:5, padding:"7px 9px", position:"relative",
        background: active ? `${color}12` : "#EAECF0",
        border: active ? `1.5px solid ${color}` : `1px solid ${C.border2}`,
        transition:"all .18s", ...style,
      }}
      onMouseEnter={() => previewImg && active && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {hovered && previewImg && (
        <div style={{
          position:"fixed", zIndex:9999, pointerEvents:"none",
          left: pos.x + 16, top: pos.y - 60,
          background:"#fff", borderRadius:10,
          boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
          border:"1px solid #E5E7EA",
          padding:6, width:800,
        }}>
          <img src={previewImg} alt="실제 화면 미리보기"
            style={{ width:"100%", height:"auto", borderRadius:6, display:"block" }} />
          <p style={{ fontSize:C.mock.md, color:C.gray2, margin:"4px 0 0", textAlign:"center" }}>실제 노출 화면</p>
        </div>
      )}
      <div style={{ fontSize:C.mock.md, fontWeight:active?700:500, color:active?color:C.gray, marginBottom:(active&&slots)?6:0, wordBreak:"keep-all", overflowWrap:"break-word", whiteSpace:"pre-wrap" }}>
        {active ? `▶ ${label}` : label}
        {sub && <span style={{ fontSize:C.mock.sm, fontWeight:400, marginLeft:4, opacity:0.7 }}>{sub}</span>}
        {active && rolling && (
          <span style={{ fontSize:C.mock.sm, fontWeight:600, marginLeft:4, background:`${color}20`, padding:"1px 5px", borderRadius:3, color }}>{rolling}</span>
        )}
      </div>
      {active && slots && (
        layout === "horizontal" ? (
          <div style={{ display:"flex", gap:3 }}>
            {Array.from({ length:slots }).map((_,i) => (
              <div key={i} style={{ flex:1, background:`${color}18`, border:`1px dashed ${color}55`, borderRadius:4, padding:"5px 6px", display:"flex", alignItems:"center", gap:5 }}>
                <div style={{ width:14, height:14, background:`${color}35`, borderRadius:3, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <div style={{ background:`${color}30`, borderRadius:2, height:4, marginBottom:3, width:"70%" }} />
                  <div style={{ background:`${color}20`, borderRadius:2, height:3, width:"90%" }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display:"flex", gap:3 }}>
            {Array.from({ length:slots }).map((_,i) => (
              <div key={i} style={{ flex:1, background:`${color}18`, border:`1px dashed ${color}55`, borderRadius:4, padding:"5px 3px" }}>
                {topfix && <div style={{ background:`${color}50`, borderRadius:2, height:18, width:"100%", marginBottom:2 }} />}
                <div style={{ background:`${color}35`, borderRadius:2, height:8, width:"50%", margin:"0 auto 3px" }} />
                <div style={{ background:`${color}22`, borderRadius:2, height:5, marginBottom:2 }} />
                <div style={{ background:`${color}22`, borderRadius:2, height:4, width:"75%" }} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default Zone;
