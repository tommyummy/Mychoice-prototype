/* =========================
   설정(여기만 만지면 위치/크기 튜닝 가능)
   ========================= */
const ASSETS = {
  bg: "assets/bg/stage_vertical.png",
  body: "assets/character/rockstar_body.png",
  guitar: "assets/character/rockstar_guitar.png",
  fret: "assets/character/rockstar_fret_arm.png",
  pick: "assets/character/rockstar_pick_arm.png",
};

// “한 장이 아니라 따로 넣었는데 비율/위치 문제” 해결 포인트:
// 아래 값들은 “화면(stage) 높이 기준”으로 스케일을 잡고, 레이어마다 상대 오프셋을 준다.
const LAYOUT = {
  // 캐릭터 전체 크기: stage 높이의 몇 %로 body를 보이게 할지
  bodyHeightRatio: 0.92, // 0.85~1.0 사이에서 조절

  // 레이어별 위치 오프셋(픽셀): stage 기준 (JS에서 scale과 함께 적용)
  // +x => 오른쪽, +y => 아래
  offset: {
    body:  { x: 0,   y: 20 },
    guitar:{ x: 70,  y: 70 },
    fret:  { x: 135, y: 10 },
    pick:  { x: 125, y: 115 },
  },

  // 레이어별 추가 회전(도)
  rotate: {
    body:  0,
    guitar: 0,
    fret:  0,
    pick:  0,
  },

  // transform-origin (퍼센트). 팔 모션 자연스럽게 하려면 이게 핵심.
  // 대충 시작값: 팔의 어깨쪽/팔꿈치쪽에 가깝게 잡아야 함.
  origin: {
    fret: "20% 50%",
    pick: "20% 50%",
    guitar: "30% 50%",
    body: "50% 50%",
  },
};

const STORAGE_KEY = "mychoice_rockstar_v1";

/* =========================
   질문(15개)
   ========================= */
const QUESTIONS = [
  {
    title: "오늘 연습을 언제 할래?",
    desc: "락스타는 ‘타이밍’이 아니라 ‘루틴’을 가진다.",
    choices: [
      { key: "A", text: "지금 10분만이라도 바로 한다" },
      { key: "B", text: "저녁에 각 잡고 1시간 한다" },
      { key: "C", text: "내일 컨디션 좋을 때 한다" },
    ],
    speech: "“핑계는 늘 고음역대에서 들린다.”",
  },
  {
    title: "피킹이 흐트러질 때, 첫 점검은?",
    desc: "속도는 결과고, 각도와 리듬이 원인이다.",
    choices: [
      { key: "A", text: "피크 각도(기울기)와 스트로크 깊이" },
      { key: "B", text: "손목 고정 vs 팔 전체 움직임" },
      { key: "C", text: "메트로놈 없이 감으로만 친 습관" },
    ],
    speech: "“일단 메트로놈. 변명은 그 다음.”",
  },
  {
    title: "기타 톤이 마음에 안 들 때, 첫 점검은?",
    desc: "장비보다 ‘신호 흐름’이 먼저다.",
    choices: [
      { key: "A", text: "볼륨/톤/픽업 포지션부터" },
      { key: "B", text: "앰프 EQ를 극단으로 돌려 기준 찾기" },
      { key: "C", text: "케이블/노이즈/접촉부터 확인" },
    ],
    speech: "“톤은 철학이고, 케이블은 현실이다.”",
  },
  {
    title: "코드가 뭉개질 때 가장 자주 놓치는 것?",
    desc: "‘손가락 힘’이 아니라 ‘압력 분배’ 문제일 때가 많다.",
    choices: [
      { key: "A", text: "손가락 끝 각도(지문이 줄 쪽으로)" },
      { key: "B", text: "엄지 위치(목 뒤 중앙 고정)" },
      { key: "C", text: "프렛 바로 뒤를 누르는 거리" },
    ],
    speech: "“세게가 아니라 정확히.”",
  },
  {
    title: "연습 곡을 고를 때 기준은?",
    desc: "너의 ‘레벨’이 아니라 ‘다음 레벨’을 만드는 곡.",
    choices: [
      { key: "A", text: "지금 실력 80%로 연주 가능한 곡" },
      { key: "B", text: "핵심 테크닉 1개가 포함된 곡" },
      { key: "C", text: "그냥 지금 미친 듯이 좋은 곡" },
    ],
    speech: "“덕질은 최고의 커리큘럼.”",
  },
  {
    title: "합주는 언제부터가 적절할까?",
    desc: "완벽해진 뒤가 아니라, 리듬을 공유할 때부터다.",
    choices: [
      { key: "A", text: "박자 유지가 안정되면 바로" },
      { key: "B", text: "레퍼토리 5곡 만들고" },
      { key: "C", text: "녹음해보고 스스로 납득되면" },
    ],
    speech: "“합주는 실력보다 태도를 본다.”",
  },
  {
    title: "손이 빨리 지칠 때 해결책은?",
    desc: "근력보다 ‘불필요한 긴장’이 범인일 가능성이 높다.",
    choices: [
      { key: "A", text: "템포 낮추고 힘 30%로만 연주" },
      { key: "B", text: "스트레칭+짧은 세트로 나눠 연습" },
      { key: "C", text: "장비 세팅(현 높이/게이지)부터 손보기" },
    ],
    speech: "“근육이 아니라 긴장을 깎아라.”",
  },
  {
    title: "무대에서 실수했을 때 1순위 행동은?",
    desc: "청중은 ‘실수’보다 ‘태도’에 더 민감하다.",
    choices: [
      { key: "A", text: "표정 유지하고 다음 마디로 복귀" },
      { key: "B", text: "바로 멈추고 고쳐 친다" },
      { key: "C", text: "드럼/베이스를 보고 리듬만 붙잡는다" },
    ],
    speech: "“멈추는 순간, 모두가 알아챈다.”",
  },
  {
    title: "연습 루틴을 만들 때 가장 강력한 장치?",
    desc: "의지보다 시스템이 강하다.",
    choices: [
      { key: "A", text: "매일 같은 시간 ‘10분’ 고정" },
      { key: "B", text: "주간 목표를 숫자로 관리" },
      { key: "C", text: "연습 영상/녹음을 강제" },
    ],
    speech: "“10분이 0분을 이긴다.”",
  },
  {
    title: "곡 카피할 때 가장 효율적인 순서?",
    desc: "전체→핵심→디테일. 순서를 거꾸로 하면 늪이다.",
    choices: [
      { key: "A", text: "구조(인트로/벌스/후렴) 먼저 파악" },
      { key: "B", text: "리듬 스트럼/그루브 먼저 복제" },
      { key: "C", text: "솔로/리드부터 먼저 도전" },
    ],
    speech: "“솔로는 마지막에 와도 도망 안 간다.”",
  },
  {
    title: "녹음 들어보면 ‘생각보다 별로’일 때?",
    desc: "그건 성장의 신호다. 귀가 먼저 자랐다.",
    choices: [
      { key: "A", text: "바로 다시 녹음해서 비교" },
      { key: "B", text: "문제 구간만 루프 연습" },
      { key: "C", text: "오늘은 멈추고 내일 새 귀로 듣기" },
    ],
    speech: "“기분 나쁨 = 업그레이드 진행 중.”",
  },
  {
    title: "톤을 두껍게 만들고 싶다면?",
    desc: "EQ보다 먼저 ‘연주’가 두꺼워야 한다.",
    choices: [
      { key: "A", text: "피킹 위치를 브릿지↔넥으로 이동" },
      { key: "B", text: "게인 줄이고 더 정확히 친다" },
      { key: "C", text: "더블트래킹(같은 파트 2번 녹음)" },
    ],
    speech: "“게인은 숨길 뿐, 만들지 않는다.”",
  },
  {
    title: "스트로크가 들쭉날쭉할 때 원인 후보 1순위?",
    desc: "대부분 ‘오른손의 리듬’ 문제다.",
    choices: [
      { key: "A", text: "업/다운 일관성(공중에서도 계속)" },
      { key: "B", text: "왼손 코드 전환 속도" },
      { key: "C", text: "앰프/이펙터 세팅" },
    ],
    speech: "“오른손이 밴드의 드러머다.”",
  },
  {
    title: "무대 캐릭터를 정한다면?",
    desc: "기교만이 아니라 ‘서사’가 팬을 만든다.",
    choices: [
      { key: "A", text: "쿨하게 최소 동작, 소리로 승부" },
      { key: "B", text: "과감한 리액션, 관객과 대화" },
      { key: "C", text: "곡마다 다른 인격, 연출형" },
    ],
    speech: "“사람들은 곡보다 ‘너’를 기억한다.”",
  },
  {
    title: "오늘의 마지막 질문: 내일을 위해 남길 1가지는?",
    desc: "누적 게임은 ‘내일을 쉬게’ 만드는 선택이 진짜다.",
    choices: [
      { key: "A", text: "기타를 케이스 밖에 꺼내 둔다" },
      { key: "B", text: "내일 연습할 1분짜리 구간만 정한다" },
      { key: "C", text: "짧게라도 녹음해서 저장한다" },
    ],
    speech: "“내일의 너는 오늘의 너를 고마워할 거다.”",
  },
];

/* =========================
   DOM
   ========================= */
const $ = (sel) => document.querySelector(sel);

const bgEl = $(".bg");
const profilePill = $("#profilePill");

const startPanel = $("#startPanel");
const gamePanel = $("#gamePanel");

const nickInput = $("#nickInput");
const ageSelect = $("#ageSelect");
const genderSelect = $("#genderSelect");
const startBtn = $("#startBtn");
const resumeBtn = $("#resumeBtn");
const wipeAllBtn = $("#wipeAllBtn");

const qCount = $("#qCount");
const progressBar = $("#progressBar");
const qTitle = $("#qTitle");
const qDesc = $("#qDesc");
const choicesEl = $("#choices");
const speechLine = $("#speechLine");

const logBtn = $("#logBtn");
const resetRunBtn = $("#resetRunBtn");
const backToStartBtn = $("#backToStartBtn");

const logPanel = $("#logPanel");
const logBody = $("#logBody");
const closeLogBtn = $("#closeLogBtn");

const toast = $("#toast");

const layerBody = $("#layerBody");
const layerGuitar = $("#layerGuitar");
const layerFret = $("#layerFret");
const layerPick = $("#layerPick");

let state = loadState() || null;

/* =========================
   유틸
   ========================= */
function showToast(msg){
  toast.textContent = msg;
  toast.classList.remove("hidden");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(()=>toast.classList.add("hidden"), 1600);
}

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function saveState(s){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
}
function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  }catch{
    return null;
  }
}
function wipeState(){
  localStorage.removeItem(STORAGE_KEY);
}

/* =========================
   이미지 프리로드 + 배경 세팅
   ========================= */
function preload(src){
  return new Promise((resolve, reject)=>{
    const img = new Image();
    img.onload = ()=>resolve(img);
    img.onerror = ()=>reject(new Error("load fail: "+src));
    img.src = src;
  });
}

async function initAssets(){
  // 배경
  bgEl.style.backgroundImage = `url("${ASSETS.bg}")`;

  // 레이어 src
  layerBody.src = ASSETS.body;
  layerGuitar.src = ASSETS.guitar;
  layerFret.src = ASSETS.fret;
  layerPick.src = ASSETS.pick;

  // transform-origin
  layerBody.style.transformOrigin = LAYOUT.origin.body;
  layerGuitar.style.transformOrigin = LAYOUT.origin.guitar;
  layerFret.style.transformOrigin = LAYOUT.origin.fret;
  layerPick.style.transformOrigin = LAYOUT.origin.pick;

  // preload 해서 “?” 박스(깨짐) 줄이기
  try{
    await Promise.all([
      preload(ASSETS.bg),
      preload(ASSETS.body),
      preload(ASSETS.guitar),
      preload(ASSETS.fret),
      preload(ASSETS.pick),
    ]);
  }catch(e){
    showToast("이미지 로딩 실패: 파일명/경로/대소문자 확인");
    // 계속 진행은 하되, 깨질 수 있음
  }

  applyLayout();
}

/* =========================
   레이아웃 계산(핵심)
   - 화면 크기에 따라 레이어들이 비율 맞게 붙게 함
   ========================= */
function applyLayout(){
  const stage = document.querySelector(".stage");
  if(!stage) return;

  const rect = stage.getBoundingClientRect();
  const stageH = rect.height;

  // body의 표시 높이를 stageH 기준으로 맞춤
  // (body png 원본 높이는 모르니, CSS에서 height로 스케일)
  const bodyH = stageH * LAYOUT.bodyHeightRatio;

  // body는 height 기준 스케일
  layerBody.style.height = `${bodyH}px`;
  layerBody.style.width = "auto";

  // 다른 레이어들도 bodyH에 비례해서 맞춘다
  const scale = bodyH / stageH; // 대략치
  // 기타/팔 크기를 bodyH에 연동
  layerGuitar.style.height = `${bodyH * 0.52}px`;
  layerFret.style.height   = `${bodyH * 0.36}px`;
  layerPick.style.height   = `${bodyH * 0.30}px`;

  // 공통 base 위치(가운데)
  // CSS에서 이미 left:50%, top:52% + translate(-50,-50) 적용됨
  // 여기서는 오프셋/회전만 추가한다.
  setLayerTransform(layerBody,  LAYOUT.offset.body,   LAYOUT.rotate.body);
  setLayerTransform(layerGuitar,LAYOUT.offset.guitar, LAYOUT.rotate.guitar);
  setLayerTransform(layerFret,  LAYOUT.offset.fret,   LAYOUT.rotate.fret);
  setLayerTransform(layerPick,  LAYOUT.offset.pick,   LAYOUT.rotate.pick);

  function setLayerTransform(el, off, rot){
    const x = off.x * 1; // px
    const y = off.y * 1;
    el.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(${rot}deg)`;
  }
}

window.addEventListener("resize", ()=>applyLayout());

/* =========================
   게임 로직
   ========================= */
function defaultState(profile){
  return {
    profile,
    idx: 0,               // 현재 질문 index
    log: [],              // {qIndex, title, choiceKey, choiceText, ts}
  };
}

function setProfilePill(profile){
  profilePill.textContent = `${profile.nick} · ${profile.age} · ${profile.gender}`;
}

function gotoStart(){
  startPanel.classList.remove("hidden");
  gamePanel.classList.add("hidden");
}

function gotoGame(){
  startPanel.classList.add("hidden");
  gamePanel.classList.remove("hidden");
  renderQuestion();
  applyLayout();
}

function renderQuestion(){
  if(!state) return;

  const total = QUESTIONS.length;
  const i = clamp(state.idx, 0, total-1);
  const q = QUESTIONS[i];

  qCount.textContent = `Q ${i+1}/${total}`;
  progressBar.style.width = `${((i)/ (total-1)) * 100}%`;

  qTitle.textContent = q.title;
  qDesc.textContent = q.desc;
  speechLine.textContent = q.speech || "“좋아. 다음.”";

  // choices
  choicesEl.innerHTML = "";
  q.choices.forEach((c)=>{
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.textContent = `${c.key}. ${c.text}`;
    btn.addEventListener("click", ()=>{
      pickStrum(); // 선택 시 피킹 모션
      commitChoice(i, q, c);
      nextQuestion();
    });
    choicesEl.appendChild(btn);
  });

  // 프로필 pill
  setProfilePill(state.profile);
}

function commitChoice(i, q, c){
  state.log.push({
    qIndex: i,
    title: q.title,
    choiceKey: c.key,
    choiceText: c.text,
    ts: Date.now(),
  });
  saveState(state);
}

function nextQuestion(){
  const total = QUESTIONS.length;
  if(state.idx < total - 1){
    state.idx += 1;
    saveState(state);
    renderQuestion();
  }else{
    // 마지막이면 결과 화면 대신: 다시 처음으로 돌리는 선택 제공
    showToast("오늘의 선택 완료. 내 기록을 확인해봐.");
    renderLog();
  }
}

function renderLog(){
  logBody.innerHTML = "";
  if(!state || !state.log.length){
    logBody.innerHTML = `<div class="logItem"><div class="k">기록 없음</div>아직 선택한 내용이 없다.</div>`;
    return;
  }

  const frag = document.createDocumentFragment();
  state.log.slice().reverse().forEach((item)=>{
    const div = document.createElement("div");
    div.className = "logItem";
    const dt = new Date(item.ts);
    const time = `${dt.getMonth()+1}/${dt.getDate()} ${String(dt.getHours()).padStart(2,"0")}:${String(dt.getMinutes()).padStart(2,"0")}`;

    div.innerHTML = `
      <div class="k">${time} · Q${item.qIndex+1}</div>
      <div><b>${item.title}</b></div>
      <div style="margin-top:6px;">선택: ${item.choiceKey}. ${item.choiceText}</div>
    `;
    frag.appendChild(div);
  });
  logBody.appendChild(frag);
}

/* =========================
   피킹 모션(오른손)
   ========================= */
function pickStrum(){
  layerPick.classList.remove("is-strum");
  // reflow 강제 후 다시 붙여서 애니메이션 재시작
  void layerPick.offsetWidth;
  layerPick.classList.add("is-strum");
}

/* =========================
   이벤트 바인딩
   ========================= */
startBtn.addEventListener("click", ()=>{
  const nick = (nickInput.value || "").trim();
  if(!nick){
    showToast("닉네임을 입력해.");
    return;
  }
  const profile = {
    nick,
    age: ageSelect.value,
    gender: genderSelect.value,
  };
  state = defaultState(profile);
  saveState(state);
  gotoGame();
});

resumeBtn.addEventListener("click", ()=>{
  const s = loadState();
  if(!s){
    showToast("저장된 기록이 없다.");
    return;
  }
  state = s;
  gotoGame();
});

wipeAllBtn.addEventListener("click", ()=>{
  wipeState();
  state = null;
  showToast("저장된 기록을 삭제했다.");
});

logBtn.addEventListener("click", ()=>{
  renderLog();
  logPanel.classList.remove("hidden");
});
closeLogBtn.addEventListener("click", ()=>{
  logPanel.classList.add("hidden");
});

resetRunBtn.addEventListener("click", ()=>{
  if(!state) return;
  state.idx = 0;
  state.log = [];
  saveState(state);
  showToast("진행을 초기화했다.");
  renderQuestion();
});

backToStartBtn.addEventListener("click", ()=>{
  gotoStart();
});

/* =========================
   시작
   ========================= */
(async function boot(){
  await initAssets();

  // 최초 화면: 저장 있으면 pill만 표시, 시작패널 유지
  const s = loadState();
  if(s?.profile){
    profilePill.textContent = `${s.profile.nick} · ${s.profile.age} · ${s.profile.gender}`;
  }else{
    profilePill.textContent = "프로필 없음";
  }

  // 기본은 시작 패널
  gotoStart();
})();
