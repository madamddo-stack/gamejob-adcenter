// 임시 디버그 엔드포인트 — 확인 후 삭제 예정
export default function handler(req, res) {
  const val = process.env.NOTION_DB_INQUIRY || "(없음)";
  // 앞 8자리만 노출 (보안)
  const masked = val.length > 8 ? val.slice(0, 8) + "..." : val;
  res.json({
    NOTION_DB_INQUIRY_prefix: masked,
    NOTION_DB_INQUIRY_length: val.length,
    full: val, // 확인 후 이 줄 삭제
  });
}
