import { C } from "../../tokens";

const TD = ({ children, style={}, ...rest }) => (
  <td {...rest} style={{ padding:"10px 14px", fontSize:C.fs.base, border:`1px solid ${C.border}`, textAlign:"center", verticalAlign:"middle", background:"#fff", ...style }}>{children}</td>
);

export default TD;
