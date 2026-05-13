import { useState, useEffect, useMemo } from "react";
import gamejobLogo from "./bi_gamejob.svg";
import {
  mainBooth as _mainBooth, recruitBooth as _recruitBooth,
  bannerAds as _bannerAds, bannerPackages as _bannerPackages,
  resumeService as _resumeService,
} from "./data/products";
import { C, fw, anchorId } from "./tokens";
import LNB from "./components/LNB";
import InquiryModal from "./components/InquiryModal";
import CategorySection from "./components/CategorySection";
import ProductCard from "./components/ProductCard";
import PackageCompareNew from "./components/PackageCompareNew";
import PackageMockupViewer from "./components/PackageMockupViewer";
import { MainBoothPriceTable, RecruitBoothPriceTable, BannerPriceTable, ResumePriceTable } from "./components/price-tables";
import { MockSub, MockMainBanner, MockMobile, MockResume } from "./components/mockup";

export default function AdCenter({ initialTab = "all", onBack }) {
  const [tab, setTab] = useState(initialTab);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const HEADER_H = 93;
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 720);
  useEffect(() => {
    const handler = () => setIsMobile(window.innerWidth <= 720);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  // 상품 데이터: 정적 파일을 기본값으로, Notion API 응답으로 덮어씀
  const [products, setProducts] = useState({
    mainBooth: _mainBooth,
    recruitBooth: _recruitBooth,
    bannerAds: _bannerAds,
    bannerPackages: _bannerPackages,
    resumeService: _resumeService,
  });

  useEffect(() => {
    fetch("/api/products")
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data) setProducts(data); })
      .catch(() => {});
  }, []);

  const { mainBooth, recruitBooth, bannerAds, bannerPackages, resumeService } = products;

  // ALL_ITEMS: Notion 데이터 기반으로 재계산
  const ALL_ITEMS = useMemo(() => {
    const items = [];
    mainBooth.tiers.forEach((tier, ti) => {
      const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
      items.push({
        id:tier.id, category:"메인 채용관", title:tier.name,
        tag:tier.position+" 노출", tagColor:colors[ti][0], tagBg:colors[ti][1],
        zoneLabel:"메인", mockup:null, tiers:mainBooth.tiers,
        features:tier.features,
        priceTabs:[
          { label:"결합 (PC+M)", rows:tier.combined.map(r=>({ label:r.period, value:fw(r.price), sub:fw(r.original) })), note:"* 개별 합산 대비 35% 할인 / 최소 1주일" },
          { label:"개별 (PC/M)", rows:tier.individual.map(r=>({ label:r.period, value:fw(r.price) })), note:"* 최소 신청기간 1주일" },
        ],
      });
      // Emperor / Lord → 상단고정 별도 상품
      if (tier.id === "emperor" || tier.id === "lord") {
        const announcementCount = tier.id === "emperor" ? 3 : 2;
        const topfixFeatures = tier.features.length > 0
          ? [`상단이미지+기업로고+대표공고 ${announcementCount}개 노출`, ...tier.features.slice(1)]
          : [`상단이미지+기업로고+대표공고 ${announcementCount}개 노출`];
        items.push({
          id:`${tier.id}-topfix`, category:"메인 채용관",
          title:`${tier.name} 상단고정`,
          tag:tier.position+" 노출", tagColor:colors[ti][0], tagBg:colors[ti][1],
          zoneLabel:"메인", mockup:null, tiers:mainBooth.tiers,
          hlId:tier.id, isTopfix:true,
          features:topfixFeatures,
          priceTabs:[
            { label:"결합 (PC+M)", rows:tier.combined.filter(r=>r.topfixTotal).map(r=>({ label:r.period, value:fw(r.topfixTotal) })), note:"* 결합 가격 + 상단고정 옵션 포함가 / 최소 1주일" },
            { label:"개별 (PC/M)", rows:tier.individual.filter(r=>r.topfixTotal).map(r=>({ label:r.period, value:fw(r.topfixTotal) })), note:"* 개별 가격 + 상단고정 옵션 포함가 / 최소 신청기간 1주일" },
          ],
        });
      }
    });
    recruitBooth.tiers.forEach((tier, ti) => {
      const colors = [[C.blue,C.blueL],[C.green,C.greenL],[C.amber,C.amberL]];
      items.push({
        id:tier.id, category:"채용정보 채용관", title:tier.name,
        tag:tier.position+" 노출", tagColor:colors[ti][0], tagBg:colors[ti][1],
        zoneLabel:"채용정보", mockup:<MockSub hl={tier.id} ads={bannerAds} />, tiers:recruitBooth.tiers,
        features:["채용정보 탭 "+tier.position+" 고정 노출","기업로고+기업명+채용제목 노출","최근 수정공고 순 상단 배치","메인채용관 구매 시 자동 포함"],
        priceTabs:[{ label:"일 단가", rows:[{ label:"결합 (PC+M)", value:tier.combined.toLocaleString()+"원/일" },{ label:"개별 (PC/M)", value:tier.individual.toLocaleString()+"원/일" }], note:"* 최소 신청기간 1주일 / 메인채용관 구매 시 자동 포함" }],
      });
    });
    bannerAds.filter(b=>b.price).forEach(b => {
      const dColor = { "PC":[C.blue,C.blueL], "PC+M":[C.purple,C.purpleL], "Mobile":[C.teal,C.tealL] };
      const dc = dColor[b.device]||dColor["PC"];
      const MAIN_IDS = ["backskin","maintop","topstrip","midstrip","emperiredge"];
      const SUB_IDS  = ["subwing","subwing2","subsky","subbottom","commMid"];
      const MOB_IDS  = ["mobMain","mobSub"];
      let mockup = null;
      if (b.id === "commPick") {
        mockup = (
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ width:155, flexShrink:0 }}>
              <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
              <MockMobile hl="commPick" ads={bannerAds} />
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>PC</p>
              <MockSub hl="commPick" ads={bannerAds} />
            </div>
          </div>
        );
      } else if (MAIN_IDS.includes(b.id)) {
        mockup = <MockMainBanner hl={b.id} ads={bannerAds} />;
      } else if (SUB_IDS.includes(b.id)) {
        mockup = <MockSub hl={b.id} ads={bannerAds} />;
      } else if (MOB_IDS.includes(b.id)) {
        mockup = (
          <div style={{ display:"flex", justifyContent:"center" }}>
            <div style={{ width:155, flexShrink:0 }}>
              <p style={{ fontSize:C.mock.lg, color:C.gray2, fontWeight:600, marginBottom:6, textAlign:"center" }}>Mobile</p>
              <MockMobile hl={b.id} ads={bannerAds} />
            </div>
          </div>
        );
      }
      const deviceLabel = b.device==="Mobile"?"모바일 전용":b.device==="PC+M"?"PC+모바일 동시":"PC 전용";
      items.push({
        id:b.id, category:"배너 광고", title:b.name,
        tag:b.device+" · "+b.zone, tagColor:dc[0], tagBg:dc[1],
        zoneLabel:b.zone, mockup,
        exposure:[
          { label:"노출 위치", value:b.location || b.zone+" ("+deviceLabel+")" },
          { label:"노출 방식", value:b.rolling },
        ],
        guide:[
          { label:"이미지 사이즈", value:b.size },
          { label:"이미지 용량",   value:b.capacity },
        ],
        priceTabs:[{ label:"1주일 단가", rows:[{ label:"1주일(7일)", value:fw(b.price) }], note:"* VAT 포함 / 최소 1주일 이상" }],
      });
    });
    items.push({
      id:"resume", category:"이력서 열람", title:"이력서 열람 서비스",
      tag:"인재 DB", tagColor:C.pink, tagBg:C.pinkL,
      zoneLabel:"", mockup:<MockResume />,
      features:["이력서·자기소개서·포트폴리오 열람","이메일·연락처 확인 가능","게임잡 회원에게 직접 입사제의","메인채용관 구매 시 기본 건수 제공"],
      priceTabs:[{ label:"건수별 가격", rows:resumeService.plans.map(p=>({ label:p.count+"건 · "+p.days+"일", value:fw(p.price), sub:Math.round(p.price/p.count).toLocaleString()+"원/건" })), note:"* VAT 포함 / 이력서 원본 열람 시 건수 차감" }],
    });
    return items;
  }, [mainBooth, recruitBooth, bannerAds, resumeService]);

  // LNB 데이터
  const LNB_ALL = useMemo(() => {
    const mainItems = [];
    mainBooth.tiers.forEach(t => {
      mainItems.push({ id:t.id, label:t.name.replace(" 채용관","") });
      if (t.id === "emperor" || t.id === "lord") {
        mainItems.push({ id:`${t.id}-topfix`, label:`${t.name.replace(" 채용관","")} 상단고정` });
      }
    });
    return [
      { group:"메인 채용관",    icon:"grid_view",             sectionId:"sec-main",    items:mainItems },
      { group:"채용정보 채용관", icon:"format_list_bulleted",  sectionId:"sec-recruit", items:recruitBooth.tiers.map(t=>({ id:t.id, label:t.name.replace(" 채용관","") })) },
      { group:"배너 광고",      icon:"web_asset",              sectionId:"sec-banner",  items:bannerAds.filter(b=>b.price).map(b=>({ id:b.id, label:b.name })) },
      { group:"이력서 열람",    icon:"manage_search",          sectionId:"sec-resume",  items:[{ id:"resume", label:"이력서 열람 서비스" }] },
    ];
  }, [mainBooth, recruitBooth, bannerAds]);

  const LNB_PKG = useMemo(() => [
    {
      group:"배너 패키지", icon:"layers", sectionId:"sec-pkg",
      items:[
        ...bannerPackages.map(p=>({ id:p.id, label:p.name })),
        { id:"sec-pkg-compare", label:"패키지 지면 비교", isAnchor:true },
      ],
    },
  ], [bannerPackages]);

  const [activeId, setActiveId] = useState(ALL_ITEMS[0]?.id);

  // LNB 클릭 → 앵커 스크롤
  const handleSelect = (id, isAnchor) => {
    setActiveId(id);
    const el = document.getElementById(isAnchor ? id : anchorId(id));
    if (!el) return;
    if (isMobile) {
      const offset = HEADER_H + 54; // 헤더 + 상단 칩 메뉴 높이
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior:"smooth" });
    } else {
      el.scrollIntoView({ behavior:"smooth", block:"start" });
    }
  };

  const handleTabChange = (v) => {
    setTab(v);
    const firstId = v === "all" ? ALL_ITEMS[0].id : bannerPackages[0].id;
    setActiveId(firstId);
    window.scrollTo({ top:0, behavior:"smooth" });
  };

  // 스크롤 감지 → 현재 보이는 섹션을 LNB 활성화
  useEffect(() => {
    const allIds = tab === "all"
      ? ALL_ITEMS.map(i => i.id)
      : bannerPackages.map(p => p.id);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace("product-","");
            setActiveId(id);
          }
        });
      },
      { rootMargin:"-30% 0px -60% 0px", threshold:0 }
    );

    allIds.forEach(id => {
      const el = document.getElementById(anchorId(id));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [tab]);

  return (
    <div style={{ minHeight:"100vh", background:C.bg, fontFamily:"'Noto Sans KR','Apple SD Gothic Neo',sans-serif", color:C.text, fontSize:C.fs.md, fontWeight:400, lineHeight:"20px" }}>

      {inquiryOpen && <InquiryModal onClose={() => setInquiryOpen(false)} />}

      {/* ── 헤더 ── */}
      <header style={{ background:C.white, borderBottom:`1px solid ${C.border}`, position:"sticky", top:0, zIndex:100, boxShadow:"0 1px 3px rgba(15,23,42,0.05)" }}>
        <div style={{ width:"100%", padding: isMobile ? "0 16px" : "0 40px", boxSizing:"border-box" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              {onBack && (
                <button onClick={onBack} style={{
                  background:"none", border:"none", cursor:"pointer",
                  color:C.gray, fontSize:C.fs.sm, fontWeight:500,
                  display:"flex", alignItems:"center", gap:4, padding:"4px 8px 4px 0",
                }}>
                  ← 홈
                </button>
              )}
              <img src={gamejobLogo} alt="GAMEJOB" style={{ height:28 }} />
              {!isMobile && <span style={{ fontSize:C.fs.md, color:C.sub, fontWeight:500 }}>채용 마케팅 상품안내</span>}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:7 }}>
              {!isMobile && [["all","전체상품 소개서"],["package","배너패키지 상품 소개서"]].map(([v,l]) => (
                <button key={v} onClick={() => handleTabChange(v)} style={{
                  height:34, padding:"0 14px", fontSize:C.fs.sm, fontWeight:600, borderRadius:7, cursor:"pointer",
                  border:`1px solid ${C.border2}`,
                  background:C.white, color:C.gray,
                  display:"flex", alignItems:"center", gap:5,
                }}>
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M6.5 1.5v7M3.5 6l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M2 10.5h9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  {l}
                </button>
              ))}
              <button onClick={() => setInquiryOpen(true)} style={{
                display:"inline-flex", alignItems:"center", gap:5,
                height:34, background:"#000000", borderRadius:7, padding:"0 16px",
                color:C.white, fontSize:isMobile ? 11 : 12, fontWeight:700, border:"none", cursor:"pointer", marginLeft:2,
              }}>✉ 광고문의</button>
            </div>
          </div>
          {/* 2depth 탭 */}
          <nav style={{ display:"flex", gap:0, marginTop:10 }}>
            {[["all","전체 상품안내"],["package","배너패키지 상품 안내"]].map(([v,l]) => (
              <button key={v} onClick={() => handleTabChange(v)} style={{
                padding: isMobile ? "10px 14px" : "10px 20px",
                fontSize: isMobile ? 12 : 13, fontWeight:600,
                background:"transparent", border:"none", cursor:"pointer",
                color: tab===v ? C.text : C.gray2,
                borderBottom: tab===v ? `2px solid ${C.text}` : "2px solid transparent",
                transition:"all .12s", whiteSpace:"nowrap",
              }}>{l}</button>
            ))}
          </nav>
        </div>
      </header>

      {/* ── 바디 ── */}
      <div style={{ display:"flex", flexDirection: isMobile ? "column" : "row", minHeight:`calc(100vh - ${HEADER_H}px)` }}>

        {/* LNB — PC: 왼쪽 고정 / Mobile: 상단 가로 스크롤 */}
        {isMobile ? (
          <div style={{
            position:"sticky", top:HEADER_H, zIndex:90,
            background:C.white, borderBottom:`1px solid ${C.border}`,
            overflowX:"auto", whiteSpace:"nowrap",
            display:"flex", alignItems:"center", gap:4,
            padding:"8px 16px",
          }}>
            {(tab==="all" ? LNB_ALL : LNB_PKG).flatMap(g => g.items).map(item => {
              const active = activeId === item.id;
              return (
                <button key={item.id} onClick={() => handleSelect(item.id, item.isAnchor)} style={{
                  display:"inline-block", flexShrink:0,
                  padding:"5px 12px", fontSize:C.fs.sm, fontWeight:active?700:400,
                  color:active?C.blue:C.gray,
                  background:active?C.blueL:"transparent",
                  border:`1px solid ${active?C.blue:C.border}`,
                  borderRadius:20, cursor:"pointer", transition:"all .1s",
                  whiteSpace:"nowrap",
                }}>{item.label}</button>
              );
            })}
          </div>
        ) : (
          <div style={{
            width:196, flexShrink:0,
            position:"sticky", top:HEADER_H,
            height:`calc(100vh - ${HEADER_H}px)`,
            overflowY:"auto",
            background:C.white,
            borderRight:`1px solid ${C.border}`,
          }}>
            <LNB
              groups={tab==="all" ? LNB_ALL : LNB_PKG}
              activeId={activeId}
              onSelect={handleSelect}
            />
          </div>
        )}

        {/* 콘텐츠 */}
        <div style={{ flex:1, minWidth:0, overflowX:"hidden" }}>
          <div style={{ maxWidth:1244, padding: isMobile ? "20px 16px 60px" : "28px 36px 80px" }}>

            {tab === "all" && (
              <div>
                <CategorySection id="sec-main" title="메인 채용관" sub="게임잡 메인화면 최상단 — 기업 로고 + 대표공고를 직접 게재. Emperor · Lord · Knight 3단계 선택.">
                  {!isMobile && <MainBoothPriceTable tiers={mainBooth.tiers} />}
                  {ALL_ITEMS.filter(i=>i.category==="메인 채용관").map(item => <ProductCard key={item.id} item={item} isMobile={isMobile} />)}
                </CategorySection>
                <CategorySection id="sec-recruit" title="채용정보 채용관" sub="채용정보 탭 내 직종·지역·경력 조건 기반 타깃 노출. 메인채용관 구매 시 자동 포함.">
                  {!isMobile && <RecruitBoothPriceTable tiers={recruitBooth.tiers} />}
                  {ALL_ITEMS.filter(i=>i.category==="채용정보 채용관").map(item => <ProductCard key={item.id} item={item} isMobile={isMobile} />)}
                </CategorySection>
                <CategorySection id="sec-banner" title="배너 광고" sub="메인·서브·모바일·커뮤니티 전 지면 배너. 목적에 맞는 지면을 개별 선택.">
                  {!isMobile && <BannerPriceTable bannerAds={bannerAds} />}
                  {ALL_ITEMS.filter(i=>i.category==="배너 광고").map(item => <ProductCard key={item.id} item={item} isMobile={isMobile} />)}
                </CategorySection>
                <CategorySection id="sec-resume" title="이력서 열람 서비스" sub="게임잡 회원의 이력서·포트폴리오·연락처를 열람하고 직접 입사제의.">
                  {!isMobile && <ResumePriceTable plans={resumeService.plans} />}
                  {ALL_ITEMS.filter(i=>i.category==="이력서 열람").map(item => <ProductCard key={item.id} item={item} isMobile={isMobile} />)}
                </CategorySection>
              </div>
            )}

            {tab === "package" && (
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                <PackageCompareNew bannerPackages={bannerPackages} />
                <PackageMockupViewer bannerPackages={bannerPackages} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── 푸터 ── */}
      <footer style={{ borderTop:`1px solid ${C.border}`, background:C.white, padding:"16px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <p style={{ fontSize:C.fs.sm, color:C.gray2, margin:0 }}>게임잡 광고센터 · T. 02-3466-5266 · E. ad@gamejob.co.kr</p>
        <p style={{ fontSize:C.fs.sm, color:C.gray2, margin:0 }}>* 모든 가격 VAT포함 / 최소 신청기간: 채용관 1주일, 배너 1주일 이상</p>
      </footer>
    </div>
  );
}
