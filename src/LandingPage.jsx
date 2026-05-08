import gamejobLogo from "./bi_gamejob.svg";
import { bannerPackages } from "./data/products.js";

const PKG_STYLE = {
  allinone: {
    tagline: "완전 커버",
    taglineSub: "게임잡 전 지면에 브랜드를 각인시키고 싶을 때",
    color: "#1A6FD4",
    headerBg: "#DBEAFE",
    badgeBg: "#1A6FD4",
    btnBg: "#1A6FD4",
    zoneCount: 15,
  },
  curtain: {
    tagline: "첫인상 집중",
    taglineSub: "커튼 배너로 방문자 시선을 한번에 사로잡고 싶을 때",
    color: "#8B5E00",
    headerBg: "#FEF3C7",
    badgeBg: "#8B5E00",
    btnBg: "#8B5E00",
    zoneCount: 8,
  },
  value: {
    tagline: "비용 효율",
    taglineSub: "핵심 지면만 선별해 합리적 예산으로 운영할 때",
    color: "#256533",
    headerBg: "#D1FAE5",
    badgeBg: "#256533",
    btnBg: "#256533",
    zoneCount: 7,
  },
};

const STATS = [
  { value: "23만+", label: "활성 게임 인재" },
  { value: "7,000+", label: "등록 기업" },
  { value: "월 100만+", label: "공고 조회" },
  { value: "69만+", label: "공개 이력서" },
];

const CATEGORIES = [
  {
    tag: "주목도 강화",
    tagColor: "#00A6E2",
    tagBg: "#EBFAFF",
    title: "메인 채용관",
    titleColor: "#00A6E2",
    type: "프리미엄 노출형",
    typeColor: "#00A6E2",
    typeBg: "#EBFAFF",
    borderTop: "#00A6E2",
    rows: [
      { label: "핵심 목적", value: "채용공고를 메인에서 가장 눈에 띄게 노출" },
      { label: "노출 위치", value: "게임잡 메인 홈페이지\n상단·중단·하단 주요 영역" },
      { label: "노출 방식", value: "메인 유입 구간 선노출" },
      { label: "기대 효과", value: "공고 주목도 상승, 지원 유입 확대" },
      { label: "추천 활용", value: "대규모 채용, 집중 채용 시즌,\n기업/공고 인지도 확보 필요 시" },
    ],
    cta: "all",
  },
  {
    tag: "타깃 효율",
    tagColor: "#308242",
    tagBg: "#ECF8EF",
    title: "채용정보 채용관",
    titleColor: "#308242",
    type: "성과·효율형",
    typeColor: "#308242",
    typeBg: "#ECF8EF",
    borderTop: "#308242",
    rows: [
      { label: "핵심 목적", value: "직무·조건에 맞는 인재에게 효율적으로 노출" },
      { label: "노출 위치", value: "직종, 지역, 경력, 직급 등\n채용정보 영역" },
      { label: "노출 방식", value: "검색/카테고리 기반 타깃 노출" },
      { label: "기대 효과", value: "타깃 적합도 높은 지원자 확보" },
      { label: "추천 활용", value: "특정 직군 채용, 적합 인재 발굴,\n비용 대비 효율 중심 운영 시" },
    ],
    cta: "all",
  },
  {
    tag: "브랜드 확산",
    tagColor: "#C27A00",
    tagBg: "#FFF7E6",
    title: "배너 광고",
    titleColor: "#C27A00",
    type: "브랜딩형",
    typeColor: "#C27A00",
    typeBg: "#FFF7E6",
    borderTop: "#F5A623",
    rows: [
      { label: "핵심 목적", value: "기업 및 채용 브랜드 홍보 강화" },
      { label: "노출 위치", value: "게임잡 홈페이지 내\n배너 광고 영역" },
      { label: "노출 방식", value: "비주얼 중심 광고형 노출" },
      { label: "기대 효과", value: "기업 인지도 제고, 프로젝트 홍보" },
      { label: "추천 활용", value: "채용 브랜딩 구축, 기업 캠페인,\n긍정적 기업 이미지 강화 필요 시" },
    ],
    cta: "package",
  },
];

export default function LandingPage({ onEnter }) {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", display: "flex", flexDirection: "column" }}>

      {/* 헤더 */}
      <header style={{
        width: "100%", boxSizing: "border-box",
        padding: "0 40px", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        borderBottom: "1px solid #E5E7EA", position: "sticky", top: 0, background: "#fff", zIndex: 100,
      }}>
        <img src={gamejobLogo} alt="게임잡" style={{ height: 26 }} />
        <button
          onClick={() => onEnter("all")}
          style={{
            background: "#000", color: "#fff", border: "none",
            borderRadius: 7, padding: "8px 18px", fontSize: 13,
            fontWeight: 700, cursor: "pointer",
          }}
        >
          ✉ 광고 문의하기
        </button>
      </header>

      {/* Hero */}
      <section style={{
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "80px 24px 64px",
        background: "linear-gradient(160deg, #F0FAFF 0%, #fff 60%)",
      }}>
        <div style={{
          display: "inline-flex", alignItems: "center",
          background: "#EBFAFF", border: "1px solid #B3ECFF",
          borderRadius: 100, padding: "6px 14px",
          fontSize: 12, fontWeight: 600, color: "#00A6E2", marginBottom: 24,
        }}>
          대한민국 No.1 게임 채용 플랫폼
        </div>

        <h1 style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
          color: "#131927", textAlign: "center",
          lineHeight: 1.25, letterSpacing: "-0.03em", margin: "0 0 16px",
        }}>
          게임잡 채용 마케팅으로<br />
          <span style={{ color: "#00A6E2" }}>최적의 게임 인재</span>를 만나세요
        </h1>

        <p style={{
          fontSize: 16, color: "#6D717F", textAlign: "center",
          lineHeight: 1.7, margin: "0 0 48px", maxWidth: 480,
        }}>
          메인 채용관부터 배너 광고·이력서 열람까지<br />
          기업 규모에 맞는 상품을 한눈에 비교하세요.
        </p>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}>
          <button onClick={() => onEnter("all")} style={{
            background: "#000", color: "#fff", border: "none",
            borderRadius: 8, padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
          }}>
            전체 상품 안내 →
          </button>
          <button onClick={() => onEnter("package")} style={{
            background: "#fff", color: "#131927",
            border: "1.5px solid #D2D5DB", borderRadius: 8,
            padding: "14px 32px", fontSize: 15, fontWeight: 700, cursor: "pointer",
          }}>
            배너패키지 상품 안내
          </button>
        </div>

        <div style={{ width: "100%", maxWidth: 760, borderTop: "1px solid #E5E7EA", marginBottom: 48 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", width: "100%", maxWidth: 760 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "0 16px",
              borderRight: i < STATS.length - 1 ? "1px solid #E5E7EA" : "none",
            }}>
              <div style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: "#004F6B", letterSpacing: "-0.03em" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 13, color: "#6D717F", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 상품 비교 카드 섹션 */}
      <section style={{ padding: "72px 24px 80px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          <div style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, color: "#131927", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              게임잡 주요 상품 비교
            </h2>
            <p style={{ fontSize: 15, color: "#6D717F", margin: 0 }}>
              채용 목적에 따라 메인 노출형, 타깃 채용형, 브랜딩형 상품을 선택할 수 있습니다.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {CATEGORIES.map((cat, i) => (
              <div key={i} style={{
                background: "#fff",
                border: "1px solid #E5E7EA",
                borderTop: `3px solid ${cat.borderTop}`,
                borderRadius: 16,
                overflow: "hidden",
                display: "flex", flexDirection: "column",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}>
                {/* 카드 헤더 */}
                <div style={{ padding: "24px 24px 20px", borderBottom: "1px solid #F3F4F6" }}>
                  <div style={{
                    display: "inline-flex",
                    background: cat.tagBg, color: cat.tagColor,
                    fontSize: 11, fontWeight: 700,
                    borderRadius: 100, padding: "4px 10px", marginBottom: 10,
                  }}>
                    {cat.tag}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 900, color: cat.titleColor, letterSpacing: "-0.02em", marginBottom: 8 }}>
                    {cat.title}
                  </div>
                  <div style={{
                    display: "inline-flex",
                    background: cat.typeBg, color: cat.typeColor,
                    fontSize: 12, fontWeight: 700,
                    borderRadius: 6, padding: "4px 10px",
                  }}>
                    {cat.type}
                  </div>
                </div>

                {/* 카드 바디 */}
                <div style={{ padding: "0 0 8px", flex: 1 }}>
                  {cat.rows.map((row, j) => (
                    <div key={j} style={{
                      display: "grid", gridTemplateColumns: "80px 1fr",
                      borderBottom: "1px solid #F3F4F6",
                      padding: "14px 24px", gap: 12, alignItems: "start",
                    }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: "#9EA2AE", whiteSpace: "nowrap", paddingTop: 1 }}>
                        {row.label}
                      </span>
                      <span style={{ fontSize: 13, color: "#4D5461", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ padding: "16px 24px 24px" }}>
                  <button
                    onClick={() => onEnter(cat.cta)}
                    style={{
                      background: "#fff", color: "#131927",
                      border: "1.5px solid #D2D5DB", borderRadius: 8,
                      padding: "10px 0", fontSize: 13, fontWeight: 700,
                      cursor: "pointer", width: "100%",
                    }}
                  >
                    상품 자세히 보기 →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 배너 패키지 섹션 */}
      <section style={{ padding: "72px 24px 80px", background: "#fff" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          <div style={{ marginBottom: 48, textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, color: "#131927", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              어떤 목적으로 광고하시나요?
            </h2>
            <p style={{ fontSize: 15, color: "#6D717F", margin: 0 }}>
              목적에 맞는 배너 패키지를 선택하세요 · 최소 신청기간 1주일 · VAT포함
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {bannerPackages.map((pkg) => {
              const s = PKG_STYLE[pkg.id];
              if (!s) return null;
              return (
                <div key={pkg.id} style={{
                  border: "1px solid #E5E7EA", borderRadius: 16,
                  overflow: "hidden", display: "flex", flexDirection: "column",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}>
                  {/* 컬러 헤더 */}
                  <div style={{ background: s.headerBg, padding: "28px 28px 24px" }}>
                    <div style={{ fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 900, color: s.color, letterSpacing: "-0.03em", marginBottom: 8 }}>
                      {s.tagline}
                    </div>
                    <p style={{ fontSize: 13.5, color: "#4D5461", margin: "0 0 20px", lineHeight: 1.6 }}>
                      {s.taglineSub}
                    </p>
                    <div style={{
                      display: "inline-flex", alignItems: "center",
                      background: s.badgeBg, color: "#fff",
                      fontSize: 12, fontWeight: 700,
                      borderRadius: 6, padding: "5px 12px",
                    }}>
                      {s.zoneCount}개 지면 포함
                    </div>
                  </div>

                  {/* 바디 */}
                  <div style={{ padding: "24px 28px", flex: 1, display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: "#131927", marginBottom: 16 }}>
                      {pkg.name}
                    </div>

                    {/* 특징 */}
                    <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                      {pkg.features.map((f, j) => (
                        <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 13.5, color: "#4D5461", lineHeight: 1.5 }}>
                          <span style={{ width: 3, height: 16, background: s.color, borderRadius: 2, flexShrink: 0, marginTop: 3 }} />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* 가격 */}
                    <div style={{ marginTop: "auto" }}>
                      <div style={{ fontSize: "clamp(22px, 2.5vw, 28px)", fontWeight: 900, color: s.color, letterSpacing: "-0.02em" }}>
                        {pkg.price.toLocaleString("ko-KR")}원
                      </div>
                      <div style={{ fontSize: 12, color: "#9EA2AE", marginTop: 4 }}>
                        {pkg.period} · VAT포함
                      </div>
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => onEnter("package")}
                    style={{
                      background: s.btnBg, color: "#fff",
                      border: "none", padding: "18px 28px",
                      fontSize: 15, fontWeight: 700, cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                    }}
                  >
                    이 패키지 선택하기
                    <span style={{ fontSize: 18 }}>→</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
