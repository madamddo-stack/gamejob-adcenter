# CLAUDE.md — 게임잡 광고센터

> 이 문서는 **어떻게 만드는가**를 다룹니다. 기획 의도는 `PRD.md` 참조.

---

## 기술 스택
- **Framework**: React 18 + Vite
- **Language**: JavaScript (JSX)
- **Styling**: 인라인 스타일 (Tailwind 없음, CSS 파일 없음)
- **배포**: Vercel 자동 배포 (`v3` 브랜치 push 시)
- **외부 연동**: Notion API (문의 저장), Make.com → Slack (알림 자동화)

---

## 브랜치 / 배포
| 브랜치 | 용도 |
|--------|------|
| `v4`   | 현재 작업 브랜치 (Figma 연동 작업) |
| `v3`   | 이전 버전 |
| `main` | 레거시 |

```bash
git add .
git commit -m "작업 내용"
git push origin v4
```

---

## 파일 구조
```
gamejob-adcenter/
├── src/
│   ├── AdCenter.jsx        # 메인 컴포넌트 (전체 UI + 내부 컴포넌트)
│   ├── main.jsx
│   ├── bi_gamejob.svg
│   └── data/
│       └── products.js     # 상품 데이터 (가격·기간·설명 수정은 여기만)
├── api/
│   ├── submit-inquiry.mjs  # 문의 접수 → Notion 저장
│   └── products.mjs        # 상품 데이터 API
├── PRD.md                  # 기획 문서
├── CLAUDE.md               # 이 파일
└── vite.config.js
```

> **상품 가격·기간·설명 수정 시**: `src/data/products.js`만 수정하면 전체 UI 자동 반영.

---

## 디자인 토큰

> 전체 토큰 정의는 `DESIGN-SYSTEM.md` 참조. 값 변경 시 `tokens.json` 수정.

`AdCenter.jsx` 상단 `C` 객체에 정의. 색상은 반드시 `C.xxx`로 참조하고 직접 hex 하드코딩 금지.
토큰에 없는 색이 필요하면 `C` 객체 + `tokens.json` 모두 추가하고 사용자에게 확인 후 사용.

```js
const C = {
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
};
```

---

## 디자인 시스템 — 버튼
| 종류 | 배경색 | 사용처 |
|------|--------|--------|
| 프라이머리 | `#000000` (블랙) | 헤더 "광고 문의하기", 모달 "문의 접수하기", 모달 "확인" 닫기 버튼 |

---

## 반응형 (모바일 대응)
- **브레이크포인트**: `window.innerWidth <= 720` → 모바일
- **헤더 높이**: `HEADER_H = 93px`
- **모바일 앵커 오프셋**: `HEADER_H + 54px` (헤더 + 칩 메뉴 높이)

| 요소 | PC | 모바일 |
|------|----|--------|
| 헤더 | 소개서 다운로드 버튼 + 부제목 표시 | 숨김, padding 16px |
| LNB | 좌측 196px 고정 사이드바 | 상단 가로 스크롤 칩 메뉴 |
| ProductCard 그리드 | `3fr 2fr` | `1fr` (1열) |
| 목업 배치 | 가로 나란히 | 세로 쌓기 |
| 가격 요약 테이블 | 표시 | 숨김 (`!isMobile`) |

---

## 내부 컴포넌트 구조

| 컴포넌트 | 역할 |
|----------|------|
| `AdCenter` | 루트 컴포넌트, 상태 관리 |
| `CategorySection` | 섹션 래퍼 (타이틀 + 구분선 + 자식) |
| `ProductCard` | 개별 상품 카드 (목업 + 상품 정보) |
| `LNB` | 좌측 사이드바 네비게이션 |
| `InquiryModal` | 광고 문의 모달 (Notion 저장) |
| `MainBoothPriceTable` | 메인채용관 가격 요약 테이블 |
| `RecruitBoothPriceTable` | 채용정보 채용관 가격 요약 테이블 |
| `BannerPriceTable` | 배너 광고 가격 요약 테이블 (디바이스/지면 rowspan) |
| `ResumePriceTable` | 이력서 열람 가격 요약 테이블 |
| `PackageCompareNew` | 배너 패키지 비교 표 |
| `PackageMockupViewer` | 배너 패키지 목업 뷰어 |
| `TH` | 테이블 헤더 셀 (border, padding 기본 포함) |
| `TD` | 테이블 데이터 셀 (border, padding, `background:#fff` 기본 포함) |

### TH / TD 사용 시 주의
- `rowSpan`, `colSpan` 등 HTML 속성은 `...rest`로 자동 전달됨.
- `style` prop으로 개별 셀 스타일 오버라이드 가능.

---

## LNB 동작
- PC: `scrollIntoView({ behavior:"smooth" })` 앵커 스크롤
- 모바일: `window.scrollTo` + 헤더/칩 오프셋 계산
- `IntersectionObserver`로 현재 섹션 자동 감지 → LNB 활성화

---

## 외부 연동

### Notion API
- 문의 접수 시 `/api/submit-inquiry.mjs` 호출 → `NOTION_DB_INQUIRY` DB에 저장
- `.env` 필수 변수:
  ```
  NOTION_TOKEN=
  NOTION_DB_RECRUIT=
  NOTION_DB_BANNERS=
  NOTION_DB_PACKAGES=
  NOTION_DB_RESUME=
  NOTION_DB_INQUIRY=
  ```

### Make.com → Slack 자동화
- Notion `NOTION_DB_INQUIRY` 상태가 "완료"로 변경되면 Make 시나리오 트리거
- Slack `#gamejob-광고문의` 채널에 회사명 / 이메일 / 관심상품 알림 발송

---

## Figma 연동 워크플로우
1. Figma에서 UI 수정
2. Figma 링크 공유 → Claude가 Figma MCP로 디자인 읽기
3. `AdCenter.jsx` 코드 반영
4. `git push origin v3` → Vercel 자동 배포
