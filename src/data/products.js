// ============================================================
//  게임잡 광고센터 상품 데이터
//  가격·기간·설명을 여기서만 수정하면 전체 UI에 자동 반영됩니다.
// ============================================================

// ─────────────────────────────────────────
// 1. 메인 채용관
// ─────────────────────────────────────────
export const mainBooth = {
  title: "메인 채용관",
  desc: "게임잡 메인화면 최상단 노출 — 기업 로고 + 대표 공고를 직접 게재",
  tiers: [
    {
      id: "emperor",
      name: "Emperor 채용관",
      position: "상단",
      color: "#185FA5",
      bgLight: "#E6F1FB",
      features: [
        "기업 로고 + 대표공고 3개 노출",
        "20분 간격 위치 순환",
        "채용정보(Sword 채용관) 동시 노출",
        "이력서 열람서비스 건수 제공",
      ],
      combined: [
        { period: "1주(7일)",    price: 1573000, original: 2420000, topfix: 627000,  topfixTotal: 2200000 },
        { period: "1개월(30일)", price: 5148000, original: 7920000, topfix: 2024000, topfixTotal: 7172000 },
        { period: "3개월(90일)", price: 11440000,original:17600000, topfix: 6072000, topfixTotal:17512000 },
        { period: "6개월(180일)",price: 17160000,original:26400000, topfix:12144000, topfixTotal:29304000 },
      ],
      individual: [
        { period: "1주(7일)",    price: 1210000, topfix: 627000,  topfixTotal: 1837000 },
        { period: "1개월(30일)", price: 3960000, topfix: 2024000, topfixTotal: 5984000 },
        { period: "3개월(90일)", price: 8800000, topfix: 6072000, topfixTotal:14872000 },
        { period: "6개월(180일)",price:13200000, topfix:12144000, topfixTotal:25344000 },
      ],
    },
    {
      id: "lord",
      name: "Lord 채용관",
      position: "중단",
      color: "#3B6D11",
      bgLight: "#EAF3DE",
      features: [
        "기업 로고 + 대표공고 2개 노출",
        "20분 간격 위치 순환",
        "채용정보(Shield 채용관) 동시 노출",
        "이력서 열람서비스 건수 제공",
      ],
      combined: [
        { period: "1주(7일)",    price: 1043000, original: 1606000, topfix: 417000,  topfixTotal: 1460000 },
        { period: "1개월(30일)", price: 3146000, original: 4840000, topfix: 1258000, topfixTotal: 4404000 },
        { period: "3개월(90일)", price: 7865000, original:12100000, topfix: 3774000, topfixTotal:11639000 },
        { period: "6개월(180일)",price:12870000, original:19800000, topfix: 7548000, topfixTotal:20418000 },
      ],
      individual: [
        { period: "1주(7일)",    price: 803000,  topfix: 417000,  topfixTotal: 1220000 },
        { period: "1개월(30일)", price: 2420000, topfix: 1258000, topfixTotal: 3678000 },
        { period: "3개월(90일)", price: 6050000, topfix: 3774000, topfixTotal: 9824000 },
        { period: "6개월(180일)",price: 9900000, topfix: 7548000, topfixTotal:17448000 },
      ],
    },
    {
      id: "knight",
      name: "Knight 채용관",
      position: "하단",
      color: "#854F0B",
      bgLight: "#FFF8EE",
      features: [
        "기업 로고 + 대표공고 1개 노출",
        "20분 간격 위치 순환",
        "채용정보(Armor 채용관) 동시 노출",
        "이력서 열람서비스 건수 제공",
      ],
      combined: [
        { period: "1주(7일)",    price: 836000,  original: 1287000, topfix: null },
        { period: "1개월(30일)", price: 2416000, original: 3718000, topfix: null },
      ],
      individual: [
        { period: "1주(7일)",    price: 643500, topfix: null },
        { period: "1개월(30일)", price: 1859000,topfix: null },
      ],
    },
  ],
};

// ─────────────────────────────────────────
// 2. 채용정보 채용관
// ─────────────────────────────────────────
export const recruitBooth = {
  title: "채용정보 채용관",
  desc: "채용정보 탭 내 직종·지역·경력 조건 기반 타깃 노출 (일 단가 · VAT포함)",
  note: "메인채용관 구매 시 자동 포함 — Emperor→Sword / Lord→Shield / Knight→Armor",
  tiers: [
    { id: "sword",  name: "Sword 채용관",  position: "상단", combined: 35750,  individual: 27500 },
    { id: "shield", name: "Shield 채용관", position: "중단", combined: 28600,  individual: 22000 },
    { id: "armor",  name: "Armor 채용관",  position: "하단", combined: 21450,  individual: 16500 },
  ],
};

// ─────────────────────────────────────────
// 3. 배너 광고
// ─────────────────────────────────────────
export const bannerAds = [
  // PC 메인
  { id: "backskin",     device: "PC",     zone: "메인",        name: "메인 백스킨",    size: "2560×1000px", rolling: "고정",     price: 3300000 },
  { id: "maintop",      device: "PC",     zone: "메인",        name: "메인 탑",        size: "2560×1000px", rolling: "3구좌 롤링",price: 2200000 },
  { id: "topstrip",     device: "PC",     zone: "메인",        name: "메인 상단띠",    size: "1080×70px",   rolling: "3구좌 롤링",price: 1815000 },
  { id: "midstrip",     device: "PC",     zone: "메인",        name: "메인 미들띠",    size: "1080×70px",   rolling: "3구좌 롤링",price: 1430000 },
  { id: "curtain",      device: "PC",     zone: "메인",        name: "메인 커튼",      size: "-",           rolling: "고정",     price: null,  note: "패키지 포함 상품" },
  { id: "mainright",    device: "PC",     zone: "메인",        name: "메인 우측",      size: "-",           rolling: "고정",     price: null,  note: "패키지 포함 상품" },
  { id: "emperiredge",  device: "PC",     zone: "메인",        name: "Emperor Edge",   size: "258×532px",   rolling: "2구좌",    price: null,  note: "별도 문의" },
  // PC 서브
  { id: "subwing",      device: "PC",     zone: "서브",        name: "서브 날개",      size: "90×154px",    rolling: "3구좌 롤링",price: 2200000 },
  { id: "subwing2",     device: "PC",     zone: "서브",        name: "서브 날개2",     size: "90×154px",    rolling: "3구좌 롤링",price: null,  note: "패키지 포함 상품" },
  { id: "subsky",       device: "PC",     zone: "서브",        name: "서브 스카이",    size: "120×600px",   rolling: "4구좌",    price: 1100000 },
  { id: "subbottom",    device: "PC",     zone: "서브",        name: "서브 하단",      size: "570×110px",   rolling: "4구좌",    price: 880000 },
  // PC+M
  { id: "commPick",     device: "PC+M",   zone: "커뮤니티",    name: "커뮤니티 Pick",  size: "PC 1780×528 / M 640×240px", rolling: "4구좌", price: 2200000 },
  { id: "commMid",      device: "PC+M",   zone: "커뮤니티",    name: "커뮤니티 미들띠",size: "-",           rolling: "롤링",     price: null,  note: "패키지 포함 상품" },
  // Mobile
  { id: "mobMain",      device: "Mobile", zone: "메인",        name: "모바일 메인띠",  size: "624×210px",   rolling: "3구좌",    price: 3300000 },
  { id: "mobSub",       device: "Mobile", zone: "서브",        name: "모바일 서브띠",  size: "-",           rolling: "롤링",     price: null,  note: "패키지 포함 상품" },
];

// ─────────────────────────────────────────
// 4. 배너 패키지
// ─────────────────────────────────────────
export const bannerPackages = [
  {
    id: "allinone",
    name: "올인원 패키지",
    tagline: "게임잡 전 지면 완전 커버",
    price: 14000000,
    period: "1주",
    highlight: true,
    desc: "PC·서브·모바일 전 지면에 배너 게재. 최대 노출로 확실한 브랜딩 효과.",
    includedIds: ["backskin","maintop","topstrip","midstrip","curtain","mainright","subwing","subwing2","subsky","subbottom","commPick","commMid","mobMain","mobSub"],
  },
  {
    id: "curtain",
    name: "커튼 패키지",
    tagline: "강렬한 첫인상, 커튼 중심 구성",
    price: 6600000,
    period: "1주",
    highlight: false,
    desc: "메인 커튼 배너로 방문자 시선을 확실하게 잡는 전략형 패키지.",
    includedIds: ["curtain","mainright","subwing2","commPick","commMid","mobSub"],
  },
  {
    id: "value",
    name: "실속 패키지",
    tagline: "핵심 지면 비용 효율 최적화",
    price: 4400000,
    period: "1주",
    highlight: false,
    desc: "메인 띠배너 + 서브 + 커뮤니티 핵심 지면으로 합리적 예산 운용.",
    includedIds: ["maintop","topstrip","midstrip","subsky","subbottom","commPick"],
  },
];

// 패키지 비교표용 지면 목록 (순서 고정)
export const packageCompareRows = [
  { zone: "메인 페이지",  id: "backskin",  name: "메인 백스킨" },
  { zone: "메인 페이지",  id: "maintop",   name: "메인 탑" },
  { zone: "메인 페이지",  id: "topstrip",  name: "메인 상단띠" },
  { zone: "메인 페이지",  id: "midstrip",  name: "메인 미들띠" },
  { zone: "메인 페이지",  id: "curtain",   name: "메인 커튼" },
  { zone: "메인 페이지",  id: "mainright", name: "메인 우측" },
  { zone: "서브 페이지",  id: "subsky",    name: "서브 스카이" },
  { zone: "서브 페이지",  id: "subwing",   name: "서브 날개" },
  { zone: "서브 페이지",  id: "subwing2",  name: "서브 날개2" },
  { zone: "서브 페이지",  id: "subbottom", name: "서브 하단" },
  { zone: "서브 페이지",  id: "commPick",  name: "커뮤니티 Pick" },
  { zone: "서브 페이지",  id: "commMid",   name: "커뮤니티 미들띠" },
  { zone: "모바일",       id: "mobMain",   name: "모바일 메인띠" },
  { zone: "모바일",       id: "mobSub",    name: "모바일 서브띠" },
  { zone: "모바일",       id: "commPick",  name: "커뮤니티 Pick (M)" },
];

// ─────────────────────────────────────────
// 5. 이력서 열람 서비스
// ─────────────────────────────────────────
export const resumeService = {
  title: "이력서 열람 서비스",
  desc: "게임잡 회원의 이력서·자기소개서·포트폴리오·연락처를 열람하고 직접 입사제의 가능. 이력서 원본 열람 시 건수 차감.",
  note: "메인채용관 구매 시 신청 기간과 동일한 건수 기본 제공",
  plans: [
    { count: 10,  days: 3,  price: 55000 },
    { count: 20,  days: 7,  price: 99000 },
    { count: 30,  days: 30, price: 148500 },
    { count: 50,  days: 30, price: 220000 },
    { count: 100, days: 30, price: 385000 },
    { count: 200, days: 30, price: 660000 },
    { count: 300, days: 90, price: 825000 },
    { count: 500, days: 90, price: 1100000 },
  ],
};

// ─────────────────────────────────────────
// 유틸 — 숫자 → 원 표기
// ─────────────────────────────────────────
export const won = (n) =>
  n == null ? "별도 문의" : n.toLocaleString("ko-KR") + "원";
