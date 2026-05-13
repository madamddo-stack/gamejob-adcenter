import { C } from "../tokens";

function LNB({ groups, activeId, onSelect }) {
  return (
    <nav style={{ paddingTop:8 }}>
      {groups.map(g => (
        <div key={g.group} style={{ marginBottom:4 }}>
          <div style={{ display:"flex", alignItems:"center", gap:7, padding:"7px 16px 4px" }}>
            <span className="material-symbols-rounded" style={{ fontSize:16, color:C.gray2, lineHeight:1 }}>{g.icon}</span>
            <span style={{ fontSize:C.fs.md, fontWeight:700, color:C.text, lineHeight:C.lh.md }}>{g.group}</span>
          </div>
          {g.items.map(item => {
            const active = activeId === item.id;
            return (
              <button key={item.id} onClick={() => onSelect(item.id, item.isAnchor)} style={{
                display:"block", width:"100%", textAlign:"left",
                padding:"6px 16px 7px 37px",
                fontSize:C.fs.sm, fontWeight:active?700:400,
                color:active?C.blue:C.gray,
                background:active?C.blueL:"transparent",
                border:"none",
                borderLeft:active?`3px solid ${C.blue}`:"3px solid transparent",
                cursor:"pointer", transition:"all .1s",
              }}>{item.label}</button>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

export default LNB;
