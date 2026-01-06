// ===== 상태 =====
let currentQuestion = 0;

const questions = [
  {
    q: "기타 톤이 마음에 안 들 때, 첫 점검은?",
    a: [
      "볼륨/톤/픽업 포지션",
      "앰프 EQ를 극단으로",
      "케이블/노이즈"
    ]
  },
  {
    q: "연습 시간이 부족한 날, 선택은?",
    a: [
      "크로매틱 + 리듬만",
      "오늘은 쉰다",
      "영상만 본다"
    ]
  },
  {
    q: "합주에서 소리가 안 들릴 때?",
    a: [
      "톤을 깎는다",
      "볼륨을 올린다",
      "드러머를 본다"
    ]
  }
];

// ===== DOM =====
const questionEl = document.getElementById("question");
const buttons = document.querySelectorAll("#ui button");

// ===== 렌더 =====
function renderQuestion() {
  const data = questions[currentQuestion];
  questionEl.textContent = data.q;

  buttons.forEach((btn, i) => {
    btn.textContent = `${String.fromCharCode(65 + i)}. ${data.a[i]}`;
  });
}

// ===== 입력 =====
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    next();
  });
});

function next() {
  currentQuestion++;

  if (currentQuestion >= questions.length) {
    questionEl.textContent = "오늘의 연습은 여기까지.";
    buttons.forEach(b => b.style.display = "none");
    return;
  }

  renderQuestion();
}

// ===== 시작 =====
renderQuestion();
