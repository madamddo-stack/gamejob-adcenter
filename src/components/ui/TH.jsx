import { C } from "../../tokens";

const TH = ({ children, style={}, ...rest }) => (
  <th {...rest} style={{ padding:"11px 14px", fontSize:C.fs.sm, fontWeight:700, color:C.white, background:"#111", border:"1px solid #2a2a2a", textAlign:"center", whiteSpace:"nowrap", ...style }}>{children}</th>
);

export default TH;
