import { C } from "../../tokens";

const ZoneMulti = ({ label, id, includedIds, color, style={} }) => {
  const active = includedIds.includes(id);
  return (
    <div style={{
      borderRadius:4, padding:"4px 6px", transition:"all .15s",
      background: active ? `${color}15` : "#EAECF0",
      border: `${active ? "1.5px" : "1px"} solid ${active ? color : C.border2}`,
      ...style,
    }}>
      <div style={{ fontSize:C.mock.sm, fontWeight:active?700:400, color:active?color:C.gray, wordBreak:"keep-all", whiteSpace:"pre-wrap" }}>
        {active ? `▶ ${label}` : label}
      </div>
    </div>
  );
};

export default ZoneMulti;
