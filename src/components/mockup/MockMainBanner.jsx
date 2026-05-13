import { useState } from "react";
import { C } from "../../tokens";
import BrowserBar from "../ui/BrowserBar";
import GNB from "../ui/GNB";
import SkeletonRow from "../ui/SkeletonRow";
import Zone from "./Zone";

const MockMainBanner = ({ hl, ads=[] }) => {
  const ad = (id) => ads.find(a => a.id === id) ?? {};
  const lbl = (id) => ad(id).mockupDesc || ad(id).name || "";
  const prv = (id) => ad(id).previewUrl || null;
  const isSkin = hl === "backskin";
  const skinColor = C.blue;
  const [skinHovered, setSkinHovered] = useState(false);
  const [skinPos, setSkinPos] = useState({ x:0, y:0 });
  const [edgeHovered, setEdgeHovered] = useState(false);
  const [edgePos, setEdgePos] = useState({ x:0, y:0 });
  const skinStyle = (side) => ({
    width: 56, flexShrink:0,
    background: isSkin ? `${skinColor}12` : "#F1F5F9",
    border: isSkin ? `1.5px solid ${skinColor}` : "1px solid #E8ECF2",
    borderRadius:4,
    margin: side === "left" ? "3px 2px 3px 3px" : "3px 3px 3px 2px",
    display:"flex", alignItems:"center", justifyContent:"center",
    transition:"all .2s",
    cursor: isSkin && prv("backskin") ? "default" : undefined,
  });
  const skinText = (side) => (
    <span style={{
      fontSize:C.mock.sm, fontWeight:isSkin?700:400,
      color:isSkin?skinColor:C.gray2,
      writingMode:"vertical-rl",
      textAlign:"center",
    }}>
      {isSkin ? `▶ 백스킨(${side==="left"?"좌":"우"})` : `백스킨(${side==="left"?"좌":"우"})`}
    </span>
  );
  const skinHandlers = isSkin && prv("backskin") ? {
    onMouseEnter: () => setSkinHovered(true),
    onMouseLeave: () => setSkinHovered(false),
    onMouseMove:  (e) => setSkinPos({ x: e.clientX, y: e.clientY }),
  } : {};

  return (
    <div style={{ background:"#FAFAFA", borderRadius:8, overflow:"hidden", border:"1px solid #DDE1E7" }}>
      <BrowserBar />
      <GNB />

      {/* 전체 레이아웃: [백스킨좌] [중앙] [백스킨우] */}
      <div style={{ display:"flex", gap:0, alignItems:"stretch" }}>

        {/* 백스킨 좌 */}
        <div style={skinStyle("left")} {...skinHandlers}>{skinText("left")}</div>

        {/* 중앙 콘텐츠 */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", gap:2, padding:"3px 0" }}>

          {/* 메인 탑 + 우측 스켈레톤 */}
          <div style={{ display:"flex", gap:2, alignItems:"stretch" }}>
            <Zone label={lbl("maintop")} color={C.blue}
              active={hl==="maintop"} previewImg={prv("maintop")}
              style={{ flex:2, minHeight:28 }} />
            <div style={{ flex:1, display:"flex", gap:2 }}>
              <div style={{ flex:1, background:"#E9EEF4", borderRadius:5 }} />
              <div style={{ flex:1, background:"#E9EEF4", borderRadius:5 }} />
            </div>
          </div>

          {/* 콘텐츠 스켈레톤 */}
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"6px 7px" }}>
            <div style={{ display:"flex", gap:8 }}>
              <div style={{ flex:1 }}>
                <SkeletonRow w="70%" h={5} mb={3} />
                <SkeletonRow w="90%" h={4} mb={2} />
                <SkeletonRow w="80%" h={4} mb={2} />
                <SkeletonRow w="60%" h={4} mb={0} />
              </div>
              <div style={{ flex:1 }}>
                <SkeletonRow w="70%" h={5} mb={3} />
                <SkeletonRow w="90%" h={4} mb={2} />
                <SkeletonRow w="75%" h={4} mb={2} />
                <SkeletonRow w="55%" h={4} mb={0} />
              </div>
            </div>
          </div>

          {/* 메인 상단띠 */}
          <Zone label={lbl("topstrip")} color={C.blue}
            active={hl==="topstrip"} previewImg={prv("topstrip")} />

          {/* Emperor 채용관 스켈레톤 (4번째 슬롯 = Emperor Edge) */}
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px 6px" }}>
            <SkeletonRow w="45%" h={5} mb={3} />
            <div style={{ display:"flex", gap:2 }}>
              {[0,1,2,3].map(i => {
                const isEdge = i === 3;
                const edgeActive = isEdge && hl === "emperiredge";
                const edgeHandlers = edgeActive && prv("emperiredge") ? {
                  onMouseEnter: () => setEdgeHovered(true),
                  onMouseLeave: () => setEdgeHovered(false),
                  onMouseMove:  (e) => setEdgePos({ x: e.clientX, y: e.clientY }),
                } : {};
                return (
                  <div key={i} style={{
                    flex:1,
                    background: edgeActive ? `${C.blue}12` : "#E9EEF4",
                    border: isEdge ? `${edgeActive ? "1.5px solid" : "1px solid"} ${edgeActive ? C.blue : "#D2D5DB"}` : "none",
                    borderRadius:3, padding:"4px 2px",
                  }} {...edgeHandlers}>
                    {isEdge ? (
                      <>
                        <div style={{ fontSize:C.mock.sm, color: edgeActive ? C.blue : C.gray2, fontWeight: edgeActive ? 700 : 400, textAlign:"center", marginBottom:3 }}>
                          {edgeActive ? "▶ Emperor Edge" : "Emperor Edge"}
                        </div>
                        <div style={{ background: edgeActive ? `${C.blue}30` : "#D1D9E6", borderRadius:2, height:20, width:"100%" }} />
                      </>
                    ) : (
                      <>
                        <div style={{ width:"50%", height:8, background:"#D1D9E6", borderRadius:2, margin:"0 auto 3px" }} />
                        <SkeletonRow w="90%" h={3} mb={2} />
                        <SkeletonRow w="70%" h={3} mb={0} />
                      </>
                    )}
                  </div>
                );
              })}
              {/* Emperor Edge 미리보기 팝업 */}
              {edgeHovered && prv("emperiredge") && (
                <div style={{
                  position:"fixed", zIndex:9999, pointerEvents:"none",
                  left: edgePos.x + 16, top: edgePos.y - 60,
                  background:"#fff", borderRadius:10,
                  boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
                  border:"1px solid #E5E7EA",
                  padding:6, width:800,
                }}>
                  <img src={prv("emperiredge")} alt="실제 화면 미리보기"
                    style={{ width:"100%", height:"auto", borderRadius:6, display:"block" }} />
                  <p style={{ fontSize:C.mock.md, color:C.gray2, margin:"4px 0 0", textAlign:"center" }}>실제 노출 화면</p>
                </div>
              )}
            </div>
          </div>

          {/* 메인 미들띠 */}
          <Zone label={lbl("midstrip")} color={C.blue}
            active={hl==="midstrip"} previewImg={prv("midstrip")} />

          {/* Lord 채용관 스켈레톤 */}
          <div style={{ background:"#F1F5F9", borderRadius:5, padding:"5px 6px" }}>
            <SkeletonRow w="40%" h={5} mb={3} />
            <div style={{ display:"flex", gap:2 }}>
              {[1,2,3].map(i => (
                <div key={i} style={{ flex:1, background:"#E9EEF4", borderRadius:3, padding:"4px 2px" }}>
                  <SkeletonRow w="90%" h={3} mb={2} />
                  <SkeletonRow w="70%" h={3} mb={0} />
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* 백스킨 우 */}
        <div style={skinStyle("right")} {...skinHandlers}>{skinText("right")}</div>

        {/* 백스킨 미리보기 팝업 */}
        {skinHovered && prv("backskin") && (
          <div style={{
            position:"fixed", zIndex:9999, pointerEvents:"none",
            left: skinPos.x + 16, top: skinPos.y - 60,
            background:"#fff", borderRadius:10,
            boxShadow:"0 8px 32px rgba(0,0,0,0.18)",
            border:"1px solid #E5E7EA",
            padding:6, width:800,
          }}>
            <img src={prv("backskin")} alt="실제 화면 미리보기"
              style={{ width:"100%", height:"auto", borderRadius:6, display:"block" }} />
            <p style={{ fontSize:C.mock.md, color:C.gray2, margin:"4px 0 0", textAlign:"center" }}>실제 노출 화면</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MockMainBanner;
