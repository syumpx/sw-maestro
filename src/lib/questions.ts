export type Axis = "active_passive" | "structured_free";
export type ScoreType = "active" | "passive" | "structured" | "free";

export interface Question {
  id: number;
  axis: Axis;
  text: string;
  optionA: string;
  optionB: string;
  aScores: ScoreType;
  bScores: ScoreType;
}

export const questions: Question[] = [
  // Active / Passive (1-20)
  { id: 1, axis: "active_passive", text: "팀 회의에서 아이디어를 내는 시간. 잠깐 정적이 흘렀다.", optionA: "내가 먼저 뭐라도 꺼낸다", optionB: "누군가 말할 때까지 생각을 정리한다", aScores: "active", bScores: "passive" },
  { id: 2, axis: "active_passive", text: "새로운 사람들과 처음 만나는 자리에서", optionA: "먼저 말을 걸고 분위기를 만든다", optionB: "분위기를 파악하고 자연스럽게 녹아든다", aScores: "active", bScores: "passive" },
  { id: 3, axis: "active_passive", text: '팀원이 아무 의견 없이 "난 다 괜찮아"라고 한다', optionA: "답답하다, 본인 의견을 말해줬으면 좋겠다", optionB: "이해한다, 나도 가끔 그런다", aScores: "active", bScores: "passive" },
  { id: 4, axis: "active_passive", text: "프로젝트 방향이 애매한 상황", optionA: "일단 내가 방향을 제안하고 본다", optionB: "팀원들 생각을 먼저 듣고 정리한다", aScores: "active", bScores: "passive" },
  { id: 5, axis: "active_passive", text: "한 사람이 회의를 계속 주도하고 방향을 결정한다", optionA: "효율적이라 좋다", optionB: "다른 사람 의견이 묻히는 것 같아 불편하다", aScores: "active", bScores: "passive" },
  { id: 6, axis: "active_passive", text: "하루 일 끝나고 가장 뿌듯한 순간은", optionA: "내가 제안한 아이디어가 채택됐을 때", optionB: "팀 토론이 깊어지고 서로 이해가 생겼을 때", aScores: "active", bScores: "passive" },
  { id: 7, axis: "active_passive", text: "의견 충돌이 생겼을 때", optionA: "내 입장을 명확히 말하고 설득한다", optionB: "양쪽 이야기를 듣고 접점을 찾는다", aScores: "active", bScores: "passive" },
  { id: 8, axis: "active_passive", text: "팀에 리더가 없는 상황", optionA: "자연스럽게 내가 방향을 잡게 된다", optionB: "다른 사람이 리더 역할을 했으면 좋겠다", aScores: "active", bScores: "passive" },
  { id: 9, axis: "active_passive", text: '누군가 나에게 "너는 왜 그렇게 생각해?"라고 물었다', optionA: "즉시 이유를 말할 수 있다", optionB: "잠깐 생각을 정리하고 답한다", aScores: "active", bScores: "passive" },
  { id: 10, axis: "active_passive", text: '회의 후 "오늘 회의 어땠어?"라는 질문에', optionA: "바로 내 의견을 말한다", optionB: '"음... 괜찮았던 것 같아" 정도로 답하고 속으로 더 생각한다', aScores: "active", bScores: "passive" },
  { id: 11, axis: "active_passive", text: "팀원이 내 아이디어에 반대한다", optionA: "내 아이디어를 방어하고 다시 설득한다", optionB: "일단 상대 논리를 듣고 내 생각을 조정한다", aScores: "active", bScores: "passive" },
  { id: 12, axis: "active_passive", text: "친구들 사이에서 나는", optionA: "약속을 잡고 계획을 제안하는 사람", optionB: "다른 사람이 제안하면 따라가는 사람", aScores: "active", bScores: "passive" },
  { id: 13, axis: "active_passive", text: '"우리 팀 뭐부터 할까?"라는 질문이 나왔을 때', optionA: "내가 우선순위를 제시한다", optionB: "다 같이 논의해서 정하자고 한다", aScores: "active", bScores: "passive" },
  { id: 14, axis: "active_passive", text: "회의에서 내가 말을 너무 많이 한 것 같은 날", optionA: "별로 신경 안 쓰인다, 할 말은 했어야 했다", optionB: '집에 와서 "내가 너무 나댔나?" 싶다', aScores: "active", bScores: "passive" },
  { id: 15, axis: "active_passive", text: "팀에서 가장 조용한 사람이 있다", optionA: "그 사람이 의견을 말하도록 계속 유도한다", optionB: "본인이 편할 때 말할 거라 믿고 기다린다", aScores: "active", bScores: "passive" },
  { id: 16, axis: "active_passive", text: "낯선 환경에 던져졌을 때", optionA: "적극적으로 탐색하고 부딪친다", optionB: "먼저 관찰하고 상황을 파악한다", aScores: "active", bScores: "passive" },
  { id: 17, axis: "active_passive", text: "내가 가장 스트레스받는 팀원 유형은", optionA: "결정 못 하고 질질 끄는 사람", optionB: "혼자 다 정해놓고 밀어붙이는 사람", aScores: "active", bScores: "passive" },
  { id: 18, axis: "active_passive", text: "프로젝트 중간 피드백을 받는 상황", optionA: "내가 먼저 피드백을 요청한다", optionB: "팀원이 먼저 줄 때까지 기다린다", aScores: "active", bScores: "passive" },
  { id: 19, axis: "active_passive", text: "모두가 침묵하는 긴장된 회의 분위기", optionA: "내가 분위기를 깨고 대화를 이끈다", optionB: "불편하지만 누군가 말할 때까지 기다린다", aScores: "active", bScores: "passive" },
  { id: 20, axis: "active_passive", text: "나는 프로젝트에서", optionA: "방향을 제시하고 팀을 끌고 가는 게 편하다", optionB: "좋은 방향이 정해지면 그 안에서 실행하는 게 편하다", aScores: "active", bScores: "passive" },
  // Structured / Free (21-40)
  { id: 21, axis: "structured_free", text: "새로운 프로젝트를 시작할 때 가장 먼저 하고 싶은 건", optionA: "파일 구조, 노션 페이지, 일정표부터 정리한다", optionB: "일단 뭐라도 만들어보면서 감을 잡는다", aScores: "structured", bScores: "free" },
  { id: 22, axis: "structured_free", text: "팀원이 문서화 없이 코드부터 짜기 시작한다", optionA: "불안하다, 나중에 꼬일 것 같다", optionB: "괜찮다, 일단 돌아가는 게 먼저다", aScores: "structured", bScores: "free" },
  { id: 23, axis: "structured_free", text: "업무의 만족감이 어디서 오는가", optionA: "정리된 문서, 깔끔한 구조, 체계가 잡힌 시스템", optionB: "새로운 아이디어, 사람 만나기, 즉흥적 문제 해결", aScores: "structured", bScores: "free" },
  { id: 24, axis: "structured_free", text: "회의록 작성", optionA: "내가 쓰는 게 마음 편하다", optionB: "누가 써주면 좋겠다, 나는 다른 걸 하고 싶다", aScores: "structured", bScores: "free" },
  { id: 25, axis: "structured_free", text: '"이거 이 형식으로 정리해줘"라는 요청을 받았을 때', optionA: "명확해서 좋다", optionB: "좀 답답하다, 굳이 싶다", aScores: "structured", bScores: "free" },
  { id: 26, axis: "structured_free", text: "프로젝트 일정이 계속 바뀌는 상황", optionA: "짜증난다, 계획이 계획대로 가야 한다", optionB: "괜찮다, 원래 계획은 바뀌는 거다", aScores: "structured", bScores: "free" },
  { id: 27, axis: "structured_free", text: "가장 싫은 팀원 유형은", optionA: '대충 하고 "이 정도면 되지 않아?"라고 하는 사람', optionB: "사소한 거에 집착해서 진도가 안 나가게 하는 사람", aScores: "structured", bScores: "free" },
  { id: 28, axis: "structured_free", text: "아이디어 회의에서 나는", optionA: "아이디어를 정리하고 우선순위를 매기는 역할", optionB: "막 던지고 새로운 방향을 터뜨리는 역할", aScores: "structured", bScores: "free" },
  { id: 29, axis: "structured_free", text: "내 방/책상 상태는", optionA: "정리되어 있어야 집중이 된다", optionB: "어질러져 있어도 내 안에 질서가 있다", aScores: "structured", bScores: "free" },
  { id: 30, axis: "structured_free", text: "일을 시작하기 전", optionA: "계획을 세우고 나서 움직인다", optionB: "일단 시작하고 하면서 맞춰간다", aScores: "structured", bScores: "free" },
  { id: 31, axis: "structured_free", text: '팀원이 "그거 왜 그렇게 해야 해? 그냥 하면 안 돼?"라고 한다', optionA: "이유가 있으니까 그렇게 하는 거다, 답답하다", optionB: "맞다, 굳이 복잡하게 할 필요 없다", aScores: "structured", bScores: "free" },
  { id: 32, axis: "structured_free", text: "고객을 직접 만나는 일과 데이터를 분석하는 일 중", optionA: "데이터 분석이 더 재밌다", optionB: "고객 만나는 게 더 재밌다", aScores: "structured", bScores: "free" },
  { id: 33, axis: "structured_free", text: "새로운 도구(노션, 피그마 등)를 배울 때", optionA: "기능을 체계적으로 익히고 나서 쓴다", optionB: "일단 써보면서 필요한 기능을 찾는다", aScores: "structured", bScores: "free" },
  { id: 34, axis: "structured_free", text: "마감 전날", optionA: "이미 어제까지 거의 끝내놓은 상태다", optionB: "오늘 밤에 몰아서 끝낸다, 그게 내 리듬이다", aScores: "structured", bScores: "free" },
  { id: 35, axis: "structured_free", text: '팀에서 "우리 규칙 정하자"는 제안이 나왔다', optionA: "좋다, 명확한 게 편하다", optionB: "너무 빡빡해지는 거 아닌가 싶다", aScores: "structured", bScores: "free" },
  { id: 36, axis: "structured_free", text: "내가 더 스트레스받는 상황은", optionA: "체계 없이 중구난방으로 일이 진행될 때", optionB: "세세한 규칙과 절차에 발목 잡힐 때", aScores: "structured", bScores: "free" },
  { id: 37, axis: "structured_free", text: '"완벽하진 않아도 일단 내보내자"는 제안', optionA: "불안하다, 좀 더 다듬어야 한다", optionB: "좋다, 피드백 받고 고치면 된다", aScores: "structured", bScores: "free" },
  { id: 38, axis: "structured_free", text: "아이디어와 실행 중에 내가 더 좋아하는 건", optionA: "실행 — 구체적인 결과물을 만드는 것", optionB: "아이디어 — 새로운 가능성을 상상하는 것", aScores: "structured", bScores: "free" },
  { id: 39, axis: "structured_free", text: "프로젝트 도중 방향을 완전히 바꿔야 하는 상황", optionA: "손해 본 느낌이 크다, 기존 작업이 아까워서", optionB: "오히려 신난다, 새로운 방향이 재밌다", aScores: "structured", bScores: "free" },
  { id: 40, axis: "structured_free", text: "나는 업무 중에", optionA: "정리하고 체계 잡을 때 에너지가 생긴다", optionB: "새로운 걸 시도하고 만날 때 에너지가 생긴다", aScores: "structured", bScores: "free" },
];

export interface Scores {
  active: number;
  passive: number;
  structured: number;
  free: number;
}

export function calculateScores(answers: Record<number, "A" | "B">): Scores {
  const scores: Scores = { active: 0, passive: 0, structured: 0, free: 0 };
  questions.forEach((q) => {
    const answer = answers[q.id];
    if (!answer) return;
    const scoreKey = answer === "A" ? q.aScores : q.bScores;
    scores[scoreKey]++;
  });
  return scores;
}

export type Quadrant =
  | "active_structured"
  | "active_free"
  | "passive_structured"
  | "passive_free";

export function getQuadrant(scores: Scores): Quadrant {
  const isActive = scores.active >= 10;
  const isStructured = scores.structured >= 10;
  if (isActive && isStructured) return "active_structured";
  if (isActive && !isStructured) return "active_free";
  if (!isActive && isStructured) return "passive_structured";
  return "passive_free";
}

export const quadrantInfo: Record<Quadrant, { title: string; description: string }> = {
  active_structured: {
    title: "주도적 체계형",
    description:
      "방향을 직접 제시하고, 그 방향을 체계적으로 실행해나가는 타입입니다. 프로젝트의 엔진 역할을 맡기에 적합하지만, 팀원이 본인의 속도나 체계를 따라오지 못할 때 가장 큰 스트레스를 받습니다.",
  },
  active_free: {
    title: "주도적 자유형",
    description:
      "아이디어를 던지고 판을 흔드는 타입입니다. 새로운 방향을 여는 데 강하지만, 세부 실행이나 반복 작업에서는 답답함을 느낄 수 있습니다. 체계형 파트너가 옆에 있으면 강해집니다.",
  },
  passive_structured: {
    title: "신중한 체계형",
    description:
      "묵묵히 기반을 다지고 디테일을 챙기는 타입입니다. 팀의 안정성을 만드는 사람이지만, 방향이 불분명하거나 리더가 없는 상황에서 에너지가 빠지기 쉽습니다.",
  },
  passive_free: {
    title: "신중한 자유형",
    description:
      "경청하고 관찰하면서 창의적인 관점을 내놓는 타입입니다. 분위기를 읽는 감이 뛰어나지만, 주도적으로 판을 짜야 하는 상황에서는 부담을 느낄 수 있습니다.",
  },
};
