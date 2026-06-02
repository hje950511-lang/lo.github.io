/**
 * Yanggu Experience ON - Core Gamified JavaScript
 * Handles dynamic weekend calculations, seamless local CORS database fallbacks,
 * RPG filters matching, absolute floating leaf animations, and parchment modal triggers.
 */

// 🛡️ Bulletproof Local CORS Fallback Database
// This ensures that even if the user double-clicks index.html (running under file://),
// the browser blocks fetch('programs.json') due to security sandboxing, it still runs 100% flawlessly.
const PROGRAMS_DATABASE_FALLBACK = [
  {
    "id": 1,
    "title": "숲속 생태 탐험 프로그램",
    "ageGroup": "9-11",
    "category": ["Nature"],
    "date": "2026-06-06",
    "location": "DMZ 야생동식물원",
    "phone": "033-480-2529",
    "description": "전문 숲해설가와 함께하는 DMZ 야생화 생태 탐방 및 천연 나뭇잎 액자 만들기 체험",
    "rewards": ["자연 감수성 향상 🌳", "동식물 생태 지식 습득 🌿", "천연 나뭇잎 액자 만들기 🧸"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 2,
    "title": "박수근 미술관 어린이 회화 교실",
    "ageGroup": "9-11",
    "category": ["Arts"],
    "date": "2026-06-06",
    "location": "박수근 미술관",
    "phone": "033-480-2655",
    "description": "양구가 낳은 세계적인 화가 박수근 화백의 화풍을 배우고 화강암 질감의 수채화를 직접 그려보는 시간",
    "rewards": ["예술적 표현력 발달 🎨", "회화 드로잉 감각 향상 🖌️", "박수근 미술관 기념품 🎨"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 3,
    "title": "양구 백토 전통 도자기 체험",
    "ageGroup": "6-8",
    "category": ["Crafts"],
    "date": "2026-06-07",
    "location": "양구백자박물관",
    "phone": "033-480-2664",
    "description": "천년 역사 양구 백토를 손으로 직접 빚어 세상에 하나뿐인 나만의 도자기 백자 컵 만들기",
    "rewards": ["창의성 및 집중력 배양 🏺", "소근육 발달 및 손재주 향상 👐", "나만의 백자 컵 완성 🏺"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 4,
    "title": "두타연 계곡 역사 생태 트레킹",
    "ageGroup": "12-14",
    "category": ["Nature"],
    "date": "2026-06-13",
    "location": "방산면 두타연 계곡",
    "phone": "033-480-2251",
    "description": "천혜의 비경 두타연 폭포와 출렁다리를 지나며 양구의 희귀 산양을 직접 관찰하는 친환경 자연 탐방로 도보 여행",
    "rewards": ["자연 속 기초 체력 증진 🌳", "야생 동식물 관찰 능력 🦌", "완주 성취감 및 완주 배지 🏅"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 5,
    "title": "해피에듀 청소년 1:1 진로진학 컨설팅",
    "ageGroup": "15-18",
    "category": ["Career Exploration"],
    "date": "2026-06-14",
    "location": "양구 교육캠퍼스 에듀센터 2층",
    "phone": "033-480-2431",
    "description": "대학 입시 및 미래 설계 진로에 대해 전문 입시 컨설턴트가 1:1로 맞춤형 입시 진학 로드맵을 그려주는 양구 행복교육 프로그램",
    "rewards": ["진로 및 적성 탐색 🎓", "입시 및 진학 정보 획득 📊", "나만의 맞춤형 진로 로드맵 수립 ✨"],
    "url": "https://www.yanggu.go.kr/happyedu"
  },
  {
    "id": 6,
    "title": "평생학습관 영어놀이터 (아동 스토리텔링)",
    "ageGroup": "6-8",
    "category": ["Crafts"],
    "date": "2026-06-06",
    "location": "양구군 평생학습관 어린이 교육실",
    "phone": "033-480-2421",
    "description": "그림책 스토리텔링과 신나는 영어 동요 놀이를 통해 재미있게 소통하고 표현력을 기르는 어린이 평생 교육 강좌",
    "rewards": ["영어 친밀감 향상 🧸", "스토리텔링과 언어 표현력 🗣️", "알파벳 교재 및 퍼즐 세트 🧸"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 7,
    "title": "평생학습관 청소년 방송 댄스 스포츠 교실",
    "ageGroup": "9-11",
    "category": ["Sports", "Arts"],
    "date": "2026-06-13",
    "location": "양구군 평생학습관 체육실",
    "phone": "033-480-2422",
    "description": "최신 유행하는 K-POP 안무를 배우며 리듬감을 익히고, 기초 체력과 표현력을 신나게 기르는 평생학습 청소년 댄스 수업",
    "rewards": ["리듬감 및 신체 표현력 발달 💃", "유산소 기초 체력 향상 ⚽", "신체 활동 성취감 획득 ⚽"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 8,
    "title": "평생학습관 아동 창의 과학 보드게임 교실",
    "ageGroup": "6-8",
    "category": ["Science"],
    "date": "2026-06-07",
    "location": "양구군 평생학습관 스마트 배움터",
    "phone": "033-480-2421",
    "description": "재미있는 과학 원리 보드게임과 교구를 직접 조작하며 논리적 사고와 문제해결력을 기르는 아동 창의 평생 교실",
    "rewards": ["논리적 사고 및 수리력 향상 🔬", "문제 해결 능력 배양 🧩", "창의 퍼즐 교구 증정 🔬"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  },
  {
    "id": 9,
    "title": "에듀센터 주말 행복 창의 동아리 활동",
    "ageGroup": "12-14",
    "category": ["Arts", "Science"],
    "date": "2026-06-14",
    "location": "양구군 청소년수련관 에듀센터 동아리실",
    "phone": "033-480-2411",
    "description": "밴드, 보드게임, 레고 코딩, 연극 등 청소년들이 원하는 주제를 정해 동아리 주말 자율 소모임 활동을 갖고 연구할 수 있도록 공간 및 활동을 지원하는 행복 교육 프로그램",
    "rewards": ["자기주도적 및 협동 지능 향상 🤝", "동아리 소통과 협동심 배양 💡", "자율 창의 동아리 활동 지원 🤝"],
    "url": "https://www.yanggu.go.kr/happyedu"
  },
  {
    "id": 10,
    "title": "청소년 ITQ 엑셀 자격증 정복반",
    "ageGroup": "15-18",
    "category": ["Science", "Career Exploration"],
    "date": "2026-06-13",
    "location": "양구 교육캠퍼스 컴퓨터 강의실",
    "phone": "033-480-2468",
    "description": "국가공인 ITQ 엑셀 자격증 취득을 목표로 문서 작성, 함수 계산, 그래프 활용 등 실무 능력을 기르는 청소년 컴퓨터 평생 교실",
    "rewards": ["실무 오피스 마스터 능력 배양 📊", "ITQ 엑셀 자격증 완벽 대비 🎓", "엑셀 핵심 요약 필기 노트 🎓"],
    "url": "https://www.yanggu.go.kr/lll/yglll/index.do"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname;
  const isFindPage = path.includes('find.html');
  const isResultsPage = path.includes('results.html');

  // Core Dynamic Weekend Calculator
  const weekendInfo = calculateWeekendDates();

  // Mount background parallax-like floating leaf animations
  initForestBackgroundParallax();

  if (isFindPage) {
    initFindPage(weekendInfo);
  } else if (isResultsPage) {
    initResultsPage(weekendInfo);
  }
});

/**
 * Calculates actual upcoming Saturday and Sunday dates dynamically
 */
function calculateWeekendDates() {
  const today = new Date();
  const day = today.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

  let diffToSat = 6 - day;
  if (day === 0) {
    diffToSat = -1; // Today is Sunday, Saturday was yesterday
  }

  const thisSat = new Date(today);
  thisSat.setDate(today.getDate() + diffToSat);

  const thisSun = new Date(thisSat);
  thisSun.setDate(thisSat.getDate() + 1);

  const nextSat = new Date(thisSat);
  nextSat.setDate(thisSat.getDate() + 7);

  const nextSun = new Date(nextSat);
  nextSun.setDate(nextSat.getDate() + 1);

  return {
    thisSat,
    thisSun,
    nextSat,
    nextSun,
    formatted: {
      thisSatStr: formatDateString(thisSat, true),
      thisSunStr: formatDateString(thisSun, true),
      nextSatStr: formatDateString(nextSat, true),
      nextSunStr: formatDateString(nextSun, true),
      thisSatIso: toIsoDateString(thisSat),
      thisSunIso: toIsoDateString(thisSun),
      nextSatIso: toIsoDateString(nextSat),
      nextSunIso: toIsoDateString(nextSun),
    }
  };
}

function formatDateString(date, includeDayOfWeek = true) {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayNames = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = dayNames[date.getDay()];

  if (includeDayOfWeek) {
    return `${month}월 ${day}일 (${dayOfWeek})`;
  }
  return `${month}월 ${day}`;
}

function toIsoDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Map static mock dates to dynamic actual weekend dates
 */
function getDynamicProgramDate(staticDate, weekendInfo) {
  if (staticDate.endsWith('-06')) {
    return {
      iso: weekendInfo.formatted.thisSatIso,
      display: weekendInfo.formatted.thisSatStr,
      label: '이번 주 토요일'
    };
  } else if (staticDate.endsWith('-07')) {
    return {
      iso: weekendInfo.formatted.thisSunIso,
      display: weekendInfo.formatted.thisSunStr,
      label: '이번 주 일요일'
    };
  } else if (staticDate.endsWith('-13')) {
    return {
      iso: weekendInfo.formatted.nextSatIso,
      display: weekendInfo.formatted.nextSatStr,
      label: '다음 주 토요일'
    };
  } else if (staticDate.endsWith('-14')) {
    return {
      iso: weekendInfo.formatted.nextSunIso,
      display: weekendInfo.formatted.nextSunStr,
      label: '다음 주 일요일'
    };
  }
  
  return {
    iso: staticDate,
    display: staticDate,
    label: '모험 일정'
  };
}

/**
 * Subtly drifts vector leaves on page scroll for RPG depth
 */
function initForestBackgroundParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const elements = document.querySelectorAll('.forest-bg-element');
    
    elements.forEach((el, index) => {
      const speed = (index + 1) * 0.05;
      const rotation = index === 2 ? scrolled * 0.03 : 0;
      el.style.transform = `translateY(${scrolled * speed}px) rotate(${rotation}deg)`;
    });
  });
}

/* ==========================================
   Page 2 Logic: Search / find.html
   ========================================== */
function initFindPage(weekendInfo) {
  const form = document.getElementById('searchForm');
  const validationAlert = document.getElementById('validationAlert');
  const periodSelect = document.getElementById('period');

  if (!form || !periodSelect) return;

  // 1. Dynamic dropdown labels
  const thisWeekendLabel = `이번 주말 🏰 (${weekendInfo.formatted.thisSatStr} ~ ${weekendInfo.formatted.thisSunStr})`;
  const nextWeekendLabel = `다음 주말 🌋 (${weekendInfo.formatted.nextSatStr} ~ ${weekendInfo.formatted.nextSunStr})`;
  
  periodSelect.options[0].text = thisWeekendLabel;
  periodSelect.options[1].text = nextWeekendLabel;

  // 2. Submit form parser
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const selectedAgeGroupInput = form.querySelector('input[name="ageGroup"]:checked');
    if (!selectedAgeGroupInput) {
      showValidationError('자녀의 연령대를 선택해 주세요.');
      return;
    }
    const age = selectedAgeGroupInput.value;

    const selectedInterestsInputs = form.querySelectorAll('input[name="interests"]:checked');
    const interestsArray = Array.from(selectedInterestsInputs).map(input => input.value);
    const interests = interestsArray.join(',');

    const period = periodSelect.value;

    hideValidationError();
    
    const queryParams = new URLSearchParams({
      age,
      interests,
      period
    });
    
    window.location.href = `results.html?${queryParams.toString()}`;
  });

  // 3. Mount Youth Recommended Shelf Modal triggers
  initYouthFeaturedShelf(weekendInfo);
}

function initYouthFeaturedShelf(weekendInfo) {
  // We showcase program IDs 3 (DMZ 과학 캠프) and 8 (도서관 구연 봉사)
  const previewButtons = document.querySelectorAll('.featured-quest-trigger-btn');
  
  previewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const questId = parseInt(btn.getAttribute('data-id'), 10);
      
      // Load from fallback directly for 0ms reliability on Page 2
      const program = PROGRAMS_DATABASE_FALLBACK.find(p => p.id === questId);
      if (program) {
        const dynamicDateInfo = getDynamicProgramDate(program.date, weekendInfo);
        const programWithDynamicDate = {
          ...program,
          dynamicDate: dynamicDateInfo.iso,
          dateDisplay: dynamicDateInfo.display,
          dateLabel: dynamicDateInfo.label
        };
        openDetailModal(programWithDynamicDate);
      }
    });
  });

  initModalTriggers();
}

function showValidationError(message) {
  const alertBox = document.getElementById('validationAlert');
  const alertText = document.getElementById('validationMsg');
  if (alertBox && alertText) {
    alertText.textContent = message;
    alertBox.style.display = 'flex';
    alertBox.classList.add('fade-in');
    alertBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function hideValidationError() {
  const alertBox = document.getElementById('validationAlert');
  if (alertBox) {
    alertBox.style.display = 'none';
  }
}

/* ==========================================
   Page 3 Logic: Results / results.html
   ========================================== */
function initResultsPage(weekendInfo) {
  const cardsGrid = document.getElementById('cardsGrid');
  const resultsCount = document.getElementById('resultsCount');
  const searchTagsContainer = document.getElementById('searchTagsContainer');
  
  if (!cardsGrid || !resultsCount || !searchTagsContainer) return;

  const params = new URLSearchParams(window.location.search);
  const ageParam = params.get('age');
  const interestsParam = params.get('interests');
  const periodParam = params.get('period') || 'this-weekend';

  if (!ageParam) {
    renderEmptyState("선택 조건 오류", "어린이 및 청소년의 연령 조건이 비어 있습니다. 다시 선택해 주세요.", true);
    return;
  }

  const selectedInterests = interestsParam ? interestsParam.split(',') : [];

  // Render breadcrumbs
  renderSearchBadges(ageParam, selectedInterests, periodParam, weekendInfo, searchTagsContainer);

  // 🛡️ Robust CORS-safe Fetch Sequence
  fetch('programs.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Local file protocol or CORS restrictions blocked JSON fetching.');
      }
      return response.json();
    })
    .then(programs => {
      // SUCCESS: Run matching filter on fetched JSON catalog
      processAndRenderPrograms(programs, ageParam, selectedInterests, periodParam, weekendInfo, cardsGrid, resultsCount);
    })
    .catch(error => {
      // 🛡️ CATCH BLOCK: Fetch failed (local file:// protocol CORS limit)
      // Fallback seamlessly to PROGRAMS_DATABASE_FALLBACK array!
      console.warn("programs.json fetch blocked by CORS/filesystem. Seamlessly falling back to local JS DB.", error);
      processAndRenderPrograms(PROGRAMS_DATABASE_FALLBACK, ageParam, selectedInterests, periodParam, weekendInfo, cardsGrid, resultsCount);
    });

  // Modal triggers
  initModalTriggers();
}

/**
 * Unified filter matching engine
 */
function processAndRenderPrograms(database, age, interests, period, weekendInfo, container, countTextNode) {
  const filtered = database.map(program => {
    const dynamicDateInfo = getDynamicProgramDate(program.date, weekendInfo);
    return {
      ...program,
      dynamicDate: dynamicDateInfo.iso,
      dateDisplay: dynamicDateInfo.display,
      dateLabel: dynamicDateInfo.label
    };
  }).filter(program => {
    // 1. Level check
    const isAgeMatch = program.ageGroup === age;

    // 2. Buff check (OR logic. If empty, all are accepted)
    let isInterestMatch = true;
    if (interests.length > 0) {
      isInterestMatch = program.category.some(cat => interests.includes(cat));
    }

    // 3. Expedition Dungeon check
    let isPeriodMatch = false;
    if (period === 'this-weekend') {
      isPeriodMatch = (program.dynamicDate === weekendInfo.formatted.thisSatIso || program.dynamicDate === weekendInfo.formatted.thisSunIso);
    } else if (period === 'next-weekend') {
      isPeriodMatch = (program.dynamicDate === weekendInfo.formatted.nextSatIso || program.dynamicDate === weekendInfo.formatted.nextSunIso);
    }

    return isAgeMatch && isInterestMatch && isPeriodMatch;
  });

  // Count text update
  countTextNode.textContent = `총 ${filtered.length}개의 맞춤 활동을 찾았습니다.`;

  if (filtered.length === 0) {
    renderEmptyState("조건에 맞는 추천 활동을 찾지 못했습니다.", "선택하신 관심 분야를 넓히거나 활동 시기를 다르게 설정하여 다시 검색해 보세요.", false);
  } else {
    renderProgramCards(filtered, container);
  }
}

function renderSearchBadges(age, interests, period, weekendInfo, container) {
  container.innerHTML = '';

  // 1. Level class badge
  const ageLabel = age === '6-8' ? '초등 저학년 (6~8세)' :
                   age === '9-11' ? '초등 고학년 (9~11세)' :
                   age === '12-14' ? '중학생 (12~14세)' : '고등학생 (15~18세)';
  container.appendChild(createBadgeElement(ageLabel, 'age'));

  // 2. Dungeon period badge
  const periodLabel = period === 'this-weekend' ? '이번 주말' : '다음 주말';
  container.appendChild(createBadgeElement(periodLabel, 'period'));

  // 3. Synergy buff badges
  if (interests.length > 0) {
    interests.forEach(interest => {
      container.appendChild(createBadgeElement(translateInterest(interest), 'interest'));
    });
  } else {
    container.appendChild(createBadgeElement('전체 관심 분야', 'interest'));
  }
}

function createBadgeElement(text, type) {
  const badge = document.createElement('span');
  badge.className = `search-tag-badge ${type === 'interest' ? 'green' : ''}`;
  
  let iconSvg = '';
  if (type === 'age') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>`;
  } else if (type === 'period') {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/></svg>`;
  } else {
    iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.674.509a3.75 3.75 0 0 0 2.248-2.248c.363-.894.19-1.975-.509-2.674L8.077 4.659A2.25 2.25 0 0 0 6.486 3z"/><path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z"/></svg>`;
  }

  badge.innerHTML = `${iconSvg} ${text}`;
  return badge;
}

function translateInterest(interest) {
  const map = {
    'Nature': '자연 생태 🌳',
    'Science': '과학 탐구 🔬',
    'Sports': '체육 스포츠 ⚽',
    'Arts': '문화 예술 🎨',
    'Crafts': '공예 교실 🏺',
    'Volunteering': '지역 봉사 🤝',
    'Career Exploration': '진로 탐색 🚀'
  };
  return map[interest] || interest;
}

/**
 * Creates dynamic quest scroll cards in results grid
 */
function renderProgramCards(programs, container) {
  container.innerHTML = '';

  programs.forEach((program, index) => {
    const card = document.createElement('div');
    card.className = 'rec-card fade-in';
    card.style.animationDelay = `${index * 0.08}s`;

    const categoriesHtml = program.category.map(cat => 
      `<span class="card-badge card-badge-category">${translateInterest(cat)}</span>`
    ).join(' ');

    const ageLabel = program.ageGroup === '6-8' ? '6~8세 추천' :
                     program.ageGroup === '9-11' ? '9~11세 추천' :
                     program.ageGroup === '12-14' ? '12~14세 추천' : '15~18세 추천';

    // Build rewards list items HTML
    const rewardsHtml = program.rewards.map(rew => 
      `<span class="reward-item">${rew}</span>`
    ).join(' ');

    card.innerHTML = `
      <div class="card-header-row">
        <div>
          <div class="card-category-badges">
            ${categoriesHtml}
            <span class="card-badge card-badge-age">${ageLabel}</span>
          </div>
          <h3 class="card-title">${program.title}</h3>
        </div>
      </div>
      
      <p class="card-description">${program.description}</p>
      
      <div class="card-details-box">
        <div class="detail-row">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/></svg>
          <span>${program.dateDisplay} <small style="color: var(--color-primary); font-weight:800;">(${program.dateLabel})</small></span>
        </div>
        <div class="detail-row">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/></svg>
          <span>${program.location}</span>
        </div>
        <div class="detail-row" style="grid-column: span 2;">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.445-5.122-3.743-6.568-6.569l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
          <span>연락처: <a href="tel:${program.phone}">${program.phone}</a></span>
        </div>
      </div>

      <!-- Expected Rewards Shelf -->
      <div class="card-rewards-box">
        <div class="rewards-title">
          🎁 이번 체험을 통해 기대되는 배움 효과 및 혜택:
        </div>
        <div class="rewards-list">
          ${rewardsHtml}
        </div>
      </div>
      
      <div class="card-footer-actions">
        <button class="btn btn-primary detail-trigger-btn" data-id="${program.id}">상세 내용 보기</button>
      </div>
    `;

    const triggerBtn = card.querySelector('.detail-trigger-btn');
    triggerBtn.addEventListener('click', () => {
      openDetailModal(program);
    });

    container.appendChild(card);
  });
}

function renderEmptyState(title, description, isError = false) {
  const cardsGrid = document.getElementById('cardsGrid');
  if (!cardsGrid) return;

  cardsGrid.innerHTML = `
    <div class="empty-state fade-in">
      <div class="empty-state-icon">
        ${isError ? 
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" style="stroke: #D32F2F;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" /></svg>` : 
          `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" /></svg>`
        }
      </div>
      <h3>${title}</h3>
      <p>${description}</p>
      <a href="find.html" class="btn btn-secondary" style="margin-top: 10px;">검색 조건 변경하기</a>
    </div>
  `;
}

/* ==========================================
   8. Modal Core Actions & Triggers
   ========================================== */
function openDetailModal(program) {
  const modalOverlay = document.getElementById('detailModal');
  const modalBox = modalOverlay?.querySelector('.modal-box');
  
  if (!modalOverlay || !modalBox) return;

  const title = modalOverlay.querySelector('.modal-title');
  const badgeContainer = modalOverlay.querySelector('.modal-category-badges');
  const date = modalOverlay.querySelector('.modal-date');
  const location = modalOverlay.querySelector('.modal-location');
  const description = modalOverlay.querySelector('.modal-description-text');
  const actionBtn = modalOverlay.querySelector('.modal-apply-btn');

  title.textContent = program.title;
  description.textContent = program.description;
  location.textContent = program.location;
  date.textContent = `${program.dateDisplay} (${program.dateLabel})`;

  badgeContainer.innerHTML = '';
  program.category.forEach(cat => {
    const b = document.createElement('span');
    b.className = 'card-badge card-badge-category';
    b.textContent = translateInterest(cat);
    badgeContainer.appendChild(b);
  });

  const ageLabel = program.ageGroup === '6-8' ? '6~8세 추천' :
                   program.ageGroup === '9-11' ? '9~11세 추천' :
                   program.ageGroup === '12-14' ? '12~14세 추천' : '15~18세 추천';
  const ageBadge = document.createElement('span');
  ageBadge.className = 'card-badge card-badge-age';
  ageBadge.textContent = ageLabel;
  badgeContainer.appendChild(ageBadge);

  // Bind telephone/rewards elements inside details modal if elements exist
  // We dynamically append the magic contact line inside the modal info grid!
  const contactRow = modalOverlay.querySelector('.modal-contact-row');
  if (contactRow) {
    contactRow.innerHTML = `<a href="tel:${program.phone}" style="color:inherit; text-decoration:none;">연락처: ${program.phone} (📞 터치 시 즉시 발신)</a>`;
  } else {
    // Dynamically insert details if not already present
    const detailsBox = modalOverlay.querySelector('.modal-details');
    // Remove old contact rows if any
    const oldRow = detailsBox.querySelector('.modal-contact-wrapper');
    if (oldRow) oldRow.remove();

    const wrapper = document.createElement('div');
    wrapper.className = 'detail-row modal-contact-wrapper';
    wrapper.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.2" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.445-5.122-3.743-6.568-6.569l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"/></svg>
      <span>연락처: <a href="tel:${program.phone}" style="color:var(--color-primary-dark); font-weight:700; text-decoration:underline;">${program.phone}</a></span>
    `;
    detailsBox.appendChild(wrapper);
  }

  // Bind rewards shelf inside modal description
  const modalDescBox = modalOverlay.querySelector('.modal-description-text');
  const oldRewards = modalOverlay.querySelector('.modal-rewards-wrapper');
  if (oldRewards) oldRewards.remove();
  
  const rewardsContainer = document.createElement('div');
  rewardsContainer.className = 'modal-rewards-wrapper card-rewards-box';
  rewardsContainer.style.marginTop = '20px';
  rewardsContainer.style.marginBottom = '20px';
  
  const rewardsHtml = program.rewards.map(rew => 
    `<span class="reward-item">${rew}</span>`
  ).join(' ');
  
  rewardsContainer.innerHTML = `
    <div class="rewards-title">
      🎁 이번 체험을 통해 기대되는 배움 효과 및 혜택:
    </div>
    <div class="rewards-list" style="margin-top: 6px;">
      ${rewardsHtml}
    </div>
  `;
  // Insert before the footer
  modalDescBox.parentNode.insertBefore(rewardsContainer, modalDescBox.nextSibling);

  // Quest Accept action
  actionBtn.onclick = () => {
    if (confirm(`'${program.title}' 프로그램 신청 페이지로 이동하시겠습니까?\n(본 서비스는 MVP 데모 버전으로, 실제 운영 기관의 예약 페이지로 연계됩니다.)`)) {
      window.open(program.url || '#', '_blank');
    }
  };

  // Open modal
  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  const modalOverlay = document.getElementById('detailModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function initModalTriggers() {
  const modalOverlay = document.getElementById('detailModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const secondaryCloseBtn = document.getElementById('modalCancelBtn');

  if (!modalOverlay) return;

  closeBtn?.addEventListener('click', closeDetailModal);
  secondaryCloseBtn?.addEventListener('click', closeDetailModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeDetailModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeDetailModal();
    }
  });
}
