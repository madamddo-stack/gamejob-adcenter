import gamejobLogo from "./bi_gamejob.svg";

const STATS = [
  { value: "23만+", label: "활성 게임 인재" },
  { value: "7,000+", label: "등록 기업" },
  { value: "월 100만+", label: "공고 조회" },
  { value: "69만+", label: "공개 이력서" },
];

export default function LandingPage({ onEnter }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>

      {/* 헤더 */}
      <header style={{
        width: "100%", boxSizing: "border-box",
        padding: "0 40px", height: 72,
        display: "flex", alignItems: "center",
        borderBottom: "1px solid #E5E7EA",
      }}>
        <img src={gamejobLogo} alt="게임잡" style={{ height: 26 }} />
      </header>

      {/* Hero */}
      <main style={{
        flex: 1, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px",
        background: "linear-gradient(160deg, #F0FAFF 0%, #fff 60%)",
      }}>

        {/* 뱃지 */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "#EBFAFF", border: "1px solid #B3ECFF",
          borderRadius: 100, padding: "6px 14px",
          fontSize: 12, fontWeight: 600, color: "#00A6E2",
          marginBottom: 24,
        }}>
          대한민국 No.1 게임 채용 플랫폼
        </div>

        {/* 헤드라인 */}
        <h1 style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
          color: "#131927", textAlign: "center",
          lineHeight: 1.25, letterSpacing: "-0.03em",
          margin: "0 0 16px",
        }}>
          게임잡 채용 마케팅으로<br />
          <span style={{ color: "#00A6E2" }}>최적의 게임 인재</span>를 만나세요
        </h1>

        {/* 서브 */}
        <p style={{
          fontSize: 16, color: "#6D717F", textAlign: "center",
          lineHeight: 1.7, margin: "0 0 48px", maxWidth: 480,
        }}>
          메인 채용관부터 배너 광고·이력서 열람까지<br />
          기업 규모에 맞는 상품을 한눈에 비교하세요.
        </p>

        {/* CTA 버튼 */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}>
          <button
            onClick={() => onEnter("all")}
            style={{
              background: "#000", color: "#fff",
              border: "none", borderRadius: 8,
              padding: "14px 32px", fontSize: 15, fontWeight: 700,
              cursor: "pointer",
            }}
          >
            전체 상품 안내 →
          </button>
          <button
            onClick={() => onEnter("package")}
            style={{
              background: "#fff", color: "#131927",
              border: "1.5px solid #D2D5DB", borderRadius: 8,
              padding: "14px 32px", fontSize: 15, fontWeight: 700,
              cursor: "pointer",
            }}
          >
            배너패키지 상품 안내
          </button>
        </div>

        {/* 구분선 */}
        <div style={{ width: "100%", maxWidth: 760, borderTop: "1px solid #E5E7EA", marginBottom: 48 }} />

        {/* 신뢰 수치 */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0,
          width: "100%", maxWidth: 760,
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "0 16px",
              borderRight: i < STATS.length - 1 ? "1px solid #E5E7EA" : "none",
            }}>
              <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: "#004F6B", letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#6D717F", marginTop: 4 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 푸터 */}
      <footer style={{
        padding: "20px 40px", borderTop: "1px solid #E5E7EA",
        fontSize: 12, color: "#9EA2AE", textAlign: "center",
      }}>
        광고 문의 · T. 02-3466-5266 · E. ad@gamejob.co.kr
      </footer>
    </div>
  );
}
