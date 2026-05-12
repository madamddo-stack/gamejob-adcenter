# 게임잡 광고센터 — 디자인 시스템

> 이 문서는 `tokens.json` 기반으로 관리됩니다.
> 값 변경 시 `tokens.json` 수정 → Tokens Studio export → Figma Variables 자동 반영.

---

## 1. 폰트

| 항목 | 값 |
|------|----|
| **기본 폰트** | Pretendard |
| **Fallback** | sans-serif |
| **토큰** | `typography.fontFamily.base` |

---

## 2. 타이포그래피 스케일

| 토큰명 | 크기 | 용도 |
|--------|------|------|
| `typography.fontSize.xs`   | 11px | 태그, 뱃지, 캡션 보조 |
| `typography.fontSize.sm`   | 12px | caption — 보조 설명, 테이블 셀 |
| `typography.fontSize.base` | 13px | body small — 목록, 레이블 |
| `typography.fontSize.md`   | 14px | body — 기본 본문 |
| `typography.fontSize.lg`   | 15px | body large — CTA 텍스트, 강조 본문 |
| `typography.fontSize.xl`   | 18px | subheading — 카드 제목 |
| `typography.fontSize.2xl`  | 20px | heading small |
| `typography.fontSize.3xl`  | 24px | heading medium |
| `typography.fontSize.4xl`  | 32px | heading large |
| `typography.fontSize.5xl`  | 48px | display — Hero 타이틀 |

### 폰트 웨이트

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `typography.fontWeight.regular`   | 400 | 본문 |
| `typography.fontWeight.medium`    | 500 | 보조 강조 |
| `typography.fontWeight.semibold`  | 600 | 뱃지, 레이블 |
| `typography.fontWeight.bold`      | 700 | 버튼, 강조 텍스트 |
| `typography.fontWeight.extrabold` | 800 | 카드 타이틀 |
| `typography.fontWeight.black`     | 900 | Hero, 섹션 타이틀 |

### 줄 간격 (폰트 사이즈별 1:1 대응)

| 토큰명 | 폰트 | 줄간격 |
|--------|------|--------|
| `typography.lineHeight.xs`   | 11px | 16px |
| `typography.lineHeight.sm`   | 12px | 18px |
| `typography.lineHeight.base` | 13px | 20px |
| `typography.lineHeight.md`   | 14px | 20px |
| `typography.lineHeight.lg`   | 15px | 22px |
| `typography.lineHeight.xl`   | 18px | 26px |
| `typography.lineHeight.2xl`  | 20px | 28px |
| `typography.lineHeight.3xl`  | 24px | 32px |
| `typography.lineHeight.4xl`  | 32px | 40px |
| `typography.lineHeight.5xl`  | 48px | 56px |

---

## 3. 컬러 팔레트

### Primary (브랜드 블루)

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.primary.900` | `#004F6B` | 헤더 배경, 신뢰 수치 강조 |
| `color.primary.700` | `#0085B5` | 띠배너, 브랜딩 강조 |
| `color.primary.500` | `#00A6E2` | 주 강조색, 섹션 타이틀 바, 아이콘 |
| `color.primary.100` | `#D6F4FF` | 배경 라이트 |
| `color.primary.50`  | `#EBFAFF` | 뱃지 배경, 카드 강조 배경 |

### Green

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.green.800` | `#256533` | Lord / Sword 상품 강조 |
| `color.green.700` | `#308242` | 모바일 / 커뮤니티 지면 |
| `color.green.50`  | `#ECF8EF` | 그린 계열 배경 라이트 |

### Yellow

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.yellow.900` | `#6B4700` | Knight / Armor / 백스킨 강조 |
| `color.yellow.50`  | `#FFF7E6` | 앰버 계열 배경 라이트 |

### Red

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.red.500` | `#EE443F` | 서브 배너 강조 |
| `color.red.50`  | `#FDECEC` | 레드 계열 배경 라이트 |

### Neutral (텍스트·배경·테두리)

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.neutral.900` | `#131927` | 본문 텍스트 기본 |
| `color.neutral.600` | `#4D5461` | 보조 텍스트 |
| `color.neutral.500` | `#6D717F` | 설명 텍스트, 서브 라벨 |
| `color.neutral.400` | `#9EA2AE` | placeholder, 비활성 |
| `color.neutral.300` | `#D2D5DB` | 강조 테두리 |
| `color.neutral.200` | `#E5E7EA` | 기본 테두리, 구분선 |
| `color.neutral.100` | `#F3F4F6` | 페이지 배경 |
| `color.neutral.50`  | `#F9FAFB` | 카드 배경 라이트 |
| `color.neutral.0`   | `#FFFFFF` | 흰색 배경 |

### Button

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `color.button.primary`     | `#000000` | 프라이머리 버튼 배경 |
| `color.button.primaryText` | `#FFFFFF` | 프라이머리 버튼 텍스트 |

---

## 4. 스페이싱

4px 단위 기반 스케일.

| 토큰명 | 값 | 주요 사용처 |
|--------|----|-------------|
| `spacing.4`  | 4px  | 아이콘 gap |
| `spacing.8`  | 8px  | 인라인 요소 간격 |
| `spacing.12` | 12px | 버튼 내 gap |
| `spacing.16` | 16px | 카드 내부 패딩 (모바일) |
| `spacing.20` | 20px | 카드 gap |
| `spacing.24` | 24px | 카드 내부 패딩 (PC) |
| `spacing.32` | 32px | 섹션 내부 여백 |
| `spacing.48` | 48px | 섹션 타이틀 하단 여백 |
| `spacing.72` | 72px | 섹션 상하 패딩 |
| `spacing.80` | 80px | Hero 상하 패딩 |

---

## 5. 보더 반경

| 토큰명 | 값 | 용도 |
|--------|----|------|
| `borderRadius.sm`   | 4px   | 태그, 작은 뱃지 |
| `borderRadius.md`   | 8px   | 버튼, 입력 필드 |
| `borderRadius.lg`   | 12px  | 중형 카드 |
| `borderRadius.xl`   | 16px  | 주요 카드, 모달 |
| `borderRadius.full` | 9999px | 칩, pill 형태 뱃지 |

---

## 6. 버튼 시스템

### 프라이머리 버튼
| 속성 | 값 |
|------|----|
| 배경색 | `color.button.primary` (`#000000`) |
| 텍스트색 | `color.button.primaryText` (`#FFFFFF`) |
| 반경 | `borderRadius.md` (8px) |
| 폰트 | `typography.fontWeight.bold` / `typography.fontSize.lg` |
| 사용처 | 헤더 "광고 문의하기", 모달 "문의 접수하기", 모달 "확인" |

### 세컨더리 버튼
| 속성 | 값 |
|------|----|
| 배경색 | `color.neutral.0` (`#FFFFFF`) |
| 테두리 | `border.strong` |
| 텍스트색 | `color.neutral.900` |
| 반경 | `borderRadius.md` (8px) |
| 사용처 | "배너패키지 상품 안내", "상품 자세히 보기" |

---

## 7. 토큰 업데이트 방법

```
1. tokens.json 수정
        ↓
2. Tokens Studio → JSON 에디터에 붙여넣기
        ↓
3. Styles & Variables → Export to Figma → Confirm
        ↓
4. Figma Variables 자동 업데이트
```
