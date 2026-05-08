import gamejobLogo from "./bi_gamejob.svg";

const STATS = [
  { value: "23만+", label: "활성 게임 인재" },
  { value: "7,000+", label: "등록 기업" },
  { value: "월 100만+", label: "공고 조회" },
  { value: "69만+", label: "공개 이력서" },
];

const CATEGORIES = [
  {
    tag: "채용 포스팅",
    color: "#004F6B",
    bgLight: "#EBFAFF",
    tagColor: "#00A6E2",
    title: "채용관 상품",
    desc: "게임잡 메인·채용정보 탭 최상단에 기업 로고와 대표 공고를 직접 게재해 구직자 시선을 선점합니다.",
    items: ["메인 채용관 (Emperor · Lord · Knight)", "채용정보 채용관 (Sword · Shield · Armor)"],
    badge: "메인 채용관 구매 시 채용정보 채용관 자동 포함",
    cta: "all",
  },
  {
    tag: "브랜딩",
    color: "#0085B5",
    bgLight: "#D6F4FF",
    tagColor: "#0085B5",
    title: "배너 광고",
    desc: "PC 메인·서브·커뮤니티·모바일 전 지면 배너로 브랜드 인지도를 높이고 채용 노출을 극대화합니다.",
    items: ["PC 메인 (백스킨 · 탑 · 띠배너 · Edge)", "PC 서브 (날개 · 스카이 · 하단)", "커뮤니티 · 모바일 메인띠"],
    badge: "패키지 구성으로 비용 절감 가능",
    cta: "package",
  },
  {
    tag: "인재 탐색",
    color: "#308242",
    bgLight: "#ECF8EF",
    tagColor: "#308242",
    title: "이력서 열람 서비스",
    desc: "게임잡 회원의 이력서·자기소개서·포트폴리오·연락처를 직접 열람하고 바로 입사 제의를 보낼 수 있습니다.",
    items: ["공개 이력서 69만+ 보유", "신입·경력 필터링 검색", "열람 후 직접 입사제의 발송"],
    badge: "메인 채용관 구매 시 기본 건수 제공",
    cta: "all",
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
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 0, width: "100%", maxWidth: 760,
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
      </section>

      {/* 상품 카테고리 카드 섹션 */}
      <section style={{ padding: "72px 24px 80px", background: "#F9FAFB" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>

          {/* 섹션 타이틀 */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: "clamp(20px, 3vw, 32px)", fontWeight: 900, color: "#131927", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
              목적에 맞는 상품을 선택하세요
            </h2>
            <p style={{ fontSize: 15, color: "#6D717F", margin: 0 }}>
              채용 목표와 예산에 맞게 단독 또는 조합하여 운영할 수 있습니다.
            </p>
          </div>

          {/* 카드 그리드 */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}>
            {CATEGORIES.map((cat, i) => (
              <div
                key={i}
                style={{
                  background: "#fff",
                  border: "1px solid #E5E7EA",
                  borderRadius: 16,
                  padding: "28px 28px 24px",
                  display: "flex", flexDirection: "column",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {/* 태그 */}
                <div style={{
                  display: "inline-flex", alignSelf: "flex-start",
                  background: cat.bgLight, color: cat.tagColor,
                  fontSize: 11, fontWeight: 700,
                  borderRadius: 100, padding: "4px 10px",
                  marginBottom: 16,
                }}>
                  {cat.tag}
                </div>

                {/* 타이틀 */}
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#131927", margin: "0 0 10px", letterSpacing: "-0.02em" }}>
                  {cat.title}
                </h3>

                {/* 설명 */}
                <p style={{ fontSize: 13.5, color: "#6D717F", lineHeight: 1.65, margin: "0 0 20px" }}>
                  {cat.desc}
                </p>

                {/* 상품 목록 */}
                <ul style={{ margin: "0 0 20px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                  {cat.items.map((item, j) => (
                    <li key={j} style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#4D5461" }}>
                      <span style={{ color: cat.tagColor, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* 배지 */}
                <div style={{
                  background: cat.bgLight, borderRadius: 8,
                  padding: "8px 12px", fontSize: 12, color: cat.color,
                  fontWeight: 600, marginBottom: 24,
                }}>
                  💡 {cat.badge}
                </div>

                {/* CTA */}
                <button
                  onClick={() => onEnter(cat.cta)}
                  style={{
                    marginTop: "auto",
                    background: "#fff", color: "#131927",
                    border: "1.5px solid #D2D5DB", borderRadius: 8,
                    padding: "10px 0", fontSize: 13, fontWeight: 700,
                    cursor: "pointer", width: "100%",
                  }}
                >
                  상품 자세히 보기 →
                </button>
              </div>
            ))}
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
