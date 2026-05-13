// ─── 디자인 토큰 ─────────────────────────────────────────
export const C = {
  navy:    "#004F6B",  // Primary/900 — 헤더 배경
  blue:    "#00A6E2",  // Primary/500 — 주 강조색, 섹션 타이틀 바
  blueL:   "#EBFAFF",  // Primary/50
  green:   "#256533",  // Green/800 — Lord / Sword
  greenL:  "#ECF8EF",  // Green/50
  amber:   "#6B4700",  // Yellow/900 — Knight / Armor / 백스킨
  amberL:  "#FFF7E6",  // Yellow/50
  purple:  "#0085B5",  // Primary/700 — 띠배너
  purpleL: "#D6F4FF",  // Primary/100
  pink:    "#EE443F",  // Red/500 — 서브 배너
  pinkL:   "#FDECEC",  // Red/50
  teal:    "#308242",  // Green/700 — 모바일 / 커뮤니티
  tealL:   "#ECF8EF",  // Green/50
  gray:    "#6D717F",  // Grey/500
  gray2:   "#9EA2AE",  // Grey/400
  grayL:   "#F9FAFB",  // Grey/50
  border:  "#E5E7EA",  // Grey/200 — 테두리 기본
  border2: "#D2D5DB",  // Grey/300
  white:   "#FFFFFF",
  bg:      "#F3F4F6",  // Grey/100 — 배경
  text:    "#131927",  // Grey/900 — 본문 텍스트
  sub:     "#4D5461",  // Grey/600 — 보조 텍스트

  // 폰트 사이즈 — 실제 UI
  fs: {
    xs: 11, sm: 12, base: 13, md: 14, lg: 15,
    lg2: 16, xl: 18, "2xl": 20, "3xl": 24, "4xl": 32, "4xl2": 40, "5xl": 48,
  },

  // 줄간격 — 반드시 "px" 문자열로 사용
  // ⚠️ 숫자로 쓰면 폰트 크기 × N배로 적용되므로 반드시 "20px" 형태로
  lh: {
    xs: "16px", sm: "18px", base: "20px", md: "20px", lg: "22px",
    lg2: "24px", xl: "26px", "2xl": "28px", "3xl": "32px", "4xl": "40px", "4xl2": "48px", "5xl": "56px",
  },

  // 폰트 사이즈 / 색상 — 목업 전용
  mock: {
    sm: 8, md: 9, lg: 10,
    textMuted: "#94A3B8",   // 목업 보조 텍스트
    textLight: "#CBD5E1",   // 목업 다크배경 위 텍스트
  },
};

// ─── 유틸리티 ─────────────────────────────────────────────
export const fw = (n) => n?.toLocaleString("ko-KR") + "원";

export const anchorId = (id) => `product-${id}`;

// ─── 패키지 컬러 팔레트 ───────────────────────────────────
export const PKG_STYLES = {
  allinone: { color: "#00A6E2", bgLight: "#EBFAFF" },
  curtain:  { color: "#8B5E00", bgLight: "#FFF8EE" },
  value:    { color: "#256533", bgLight: "#ECF8EF" },
};
