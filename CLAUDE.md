# 게임잡 광고센터 프로젝트

## 프로젝트 개요
게임잡(gamejob.co.kr) 광고 상품을 소개하는 광고센터 웹앱.
기업 광고 담당자가 상품을 확인하고 문의할 수 있는 페이지.

## 기술 스택
- React 18 + Vite
- 스타일: 인라인 스타일 (CSS-in-JS 없음, Tailwind 없음)
- 배포: Vercel (자동 배포, v2 브랜치)
- URL: https://gamejob-adcenter.vercel.app

## 파일 구조
```
src/
├── AdCenter.jsx       # 메인 컴포넌트 (전체 UI)
└── data/
    └── products.js    # 상품 데이터 (가격·기간·설명 수정은 여기만)
```

## 상품 데이터 구조 (products.js)
가격·기간·설명을 수정할 때는 `src/data/products.js`만 수정하면 전체 UI에 자동 반영됩니다.

## 네비게이션 구조
### 1depth (헤더 버튼)
- 전체상품 소개서
- 배너패키지 상품 소개서

### 2depth (LNB 사이드바 — 좌측 고정, 여백 없이 붙음)
**전체상품 소개서:**
- 메인 채용관 > Emperor / Lord / Knight
- 채용정보 채용관 > Sword / Shield / Armor
- 배너 광고 > 각 상품
- 이력서 열람 > 이력서 열람 서비스

**배너패키지 상품 소개서:**
- 배너 패키지 > 올인원 / 커튼 / 실속

### LNB 동작
- 클릭 시 해당 상품 섹션으로 앵커 스크롤
- IntersectionObserver로 현재 뷰포트 위치에 따라 LNB 자동 활성화
- 전체 상품이 한 페이지에 세로로 나열됨 (SPA가 아닌 스크롤 방식)

## 레이아웃
- 풀 브라우저 너비 사용
- 내용 최대 너비: 1440px
- 헤더: sticky, 풀 너비
- LNB: 196px 고정, sticky, 브라우저 좌측에 딱 붙음
- 콘텐츠: 나머지 너비

## 상품 카드 구조
각 상품은 카드로 표현:
- 카드 헤더: 지면 위치 라벨 + 태그
- 좌측 (3fr or 1fr): 목업 패널 (배경 #FAFCFF)
- 우측 (2fr or 1fr): 상품명 + 특징 + 가격 탭

**메인 채용관 / 채용정보 채용관**: gridTemplateColumns 3fr:2fr
- 좌측에 Mobile 목업(왼쪽) + PC 목업(오른쪽) 나란히

**배너 광고 / 이력서 열람**: gridTemplateColumns 1fr:1fr

## 목업 구조

### PC 메인 목업 (MockMainBanner, MockBoothPC)
```
[백스킨(좌) 56px] [중앙콘텐츠] [백스킨(우) 56px]
                   ├─ 메인 탑
                   ├─ 콘텐츠 스켈레톤
                   ├─ 메인 상단띠
                   ├─ [Emperor 채용관 스켈레톤] [Emperor Edge]
                   ├─ Lord/Knight 스켈레톤
                   └─ 메인 미들띠
```
- 백스킨: 항상 56px 고정, 활성 시 amber 색상 하이라이트
- 텍스트: "백스킨\n(좌)" — (좌) 앞에서 줄바꿈

### PC 서브 목업 (MockSub)
- 커뮤니티 Pick (상단)
- [서브날개/날개2] [채용관 스켈레톤 3개] [서브스카이]
- 서브 하단

### 모바일 목업 (MockBoothMobile, MockRecruitMobile, MockMobile)
- 세로 스마트폰 프레임
- 상단/하단 스켈레톤 + 해당 상품 하이라이트

### 배너 상품별 목업 매핑
| 상품 ID | 목업 |
|--------|------|
| backskin, maintop, topstrip, midstrip, emperiredge | MockMainBanner |
| subwing, subwing2, subsky, subbottom, commPick, commMid | MockSub |
| mobMain, mobSub | MockMobile |

### Zone 컴포넌트
지면 블록 표현. active 시 색상 하이라이트 + slots(구좌 카드) 표시.

### SkeletonRow 컴포넌트
주변 콘텐츠를 흐린 회색 막대로 표현.

## 디자인 토큰 (C 객체)
```js
navy: "#1B2B4B"   // 헤더 배경
blue: "#2563EB"   // 주 강조색
green: "#1E6B3C"  // Lord / Sword
amber: "#7A4400"  // Knight / Armor / 백스킨
purple: "#3D2FA0" // 띠배너
pink: "#8B1A4A"   // 서브 배너
teal: "#0B6657"   // 모바일 / 커뮤니티
```

## 배포
```bash
# 로컬 개발
npm run dev

# Vercel 자동 배포 (push하면 자동)
git add .
git commit -m "작업 내용"
git push origin v2
```

## 현재 브랜치
- `main`: 프로덕션
- `v2`: 현재 작업 브랜치 (Vercel에서 자동 배포됨)

## 담당자 연락처
- T. 02-3466-5266
- E. ad@gamejob.co.kr
