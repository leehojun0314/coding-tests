function solution(dice) {
  // n개의 주사위 중 n/2개의 주사위를 선택하는 모든 조합을 생성
  const combinations = generateCombinations(dice.length, dice.length / 2);

  let maxWinProbability = 0; // A의 최대 승리 확률을 저장할 변수
  let bestCombination = []; // A의 최적 주사위 조합을 저장할 변수

  // 각 주사위의 점수 분포를 사전 계산
  const scoreDistributions = dice.map((die) => calculateScoreDistribution(die));

  // 생성된 모든 조합에 대해 순회하며 승리 확률을 계산
  combinations.forEach((combination) => {
    const winProbability = calculateWinProbability(
      scoreDistributions,
      combination,
    );
    // 현재 조합의 승리 확률이 지금까지의 최대값보다 크면 갱신
    if (winProbability > maxWinProbability) {
      maxWinProbability = winProbability;
      bestCombination = combination;
    }
  });

  // 가장 높은 승리 확률을 가진 조합을 반환 (1부터 시작하는 인덱스로 변환)
  return bestCombination.map((x) => x + 1);
}

function generateCombinations(n, k) {
  const results = []; // 모든 조합을 저장할 배열

  // 백트래킹으로 조합 생성
  function backtrack(start, path) {
    if (path.length === k) {
      results.push(Array.from(path)); // 길이가 k인 조합을 결과에 추가
      return;
    }
    for (let i = start; i < n; i++) {
      path.push(i); // 현재 인덱스를 경로에 추가
      backtrack(i + 1, path); // 다음 인덱스부터 시작해 재귀 호출
      path.pop(); // 백트래킹: 경로에서 마지막 요소 제거
    }
  }

  // 백트래킹 시작
  backtrack(0, []);
  return results; // 생성된 모든 조합을 반환
}

// 각 주사위의 가능한 점수 분포를 계산하는 함수
function calculateScoreDistribution(die) {
  const distribution = new Array(101).fill(0); // 주사위 점수의 범위는 1 ~ 100
  die.forEach((value) => distribution[value]++); // 각 점수가 주사위에서 나오는 빈도를 기록
  return distribution; // 각 점수의 빈도가 기록된 분포 배열을 반환
}

function calculateWinProbability(distributions, combinationA) {
  const n = distributions.length; // 주사위의 총 개수
  // B의 주사위 조합을 생성 (A에 포함되지 않은 주사위 인덱스)
  const combinationB = Array.from({ length: n })
    .map((_, i) => i)
    .filter((i) => !combinationA.includes(i));

  let totalOutcomes = 0; // 총 경우의 수
  let wins = 0; // A가 이기는 경우의 수

  // A와 B의 주사위 조합에 대한 모든 가능한 점수 결과 생성
  const outcomesA = generateOutcomes(distributions, combinationA);
  const outcomesB = generateOutcomes(distributions, combinationB);

  // A와 B의 모든 점수 결과를 비교하여 A의 승리 횟수를 계산
  outcomesA.forEach((countA, scoreA) => {
    outcomesB.forEach((countB, scoreB) => {
      const outcomes = countA * countB; // A와 B의 각 결과 조합의 발생 수 계산
      totalOutcomes += outcomes; // 총 경우의 수에 더함
      if (scoreA > scoreB) {
        // A가 B보다 높은 점수를 가질 경우
        wins += outcomes; // A의 승리 횟수를 증가시킴
      }
    });
  });

  return wins / totalOutcomes; // A의 승리 확률 반환
}

function generateOutcomes(distributions, combination) {
  // 주사위 조합에 대한 가능한 모든 점수 결과를 저장할 배열
  let outcomes = new Array(1001).fill(0); // 최대 점수 합은 1000
  outcomes[0] = 1; // 초기에는 점수 0에서 시작

  // 조합된 각 주사위의 점수 분포를 적용
  combination.forEach((index) => {
    let newOutcomes = new Array(outcomes.length).fill(0); // 새로운 결과를 저장할 배열 초기화
    distributions[index].forEach((count, score) => {
      if (count > 0) {
        // 현재 점수에 해당하는 주사위 면이 있다면
        for (let prevScore = 0; prevScore < outcomes.length; prevScore++) {
          // 이전 결과에 현재 주사위의 점수를 더하여 새로운 점수 결과 생성
          newOutcomes[prevScore + score] += outcomes[prevScore] * count;
        }
      }
    });
    // 현재까지의 모든 주사위 조합 결과를 새로운 결과로 업데이트
    outcomes = newOutcomes.slice(0, 481); // A와 B가 가지는 최대 점수는 각각 480
  });

  return outcomes; // 조합된 주사위에 대한 모든 점수 결과 반환
}

module.exports = solution;
