const solution = require('./index2.js');

test('case 1', () => {
  const dices = [
    [1, 2, 3, 4, 5, 6],
    [3, 3, 3, 3, 4, 4],
    [1, 3, 3, 4, 4, 4],
    [1, 1, 4, 4, 5, 5],
  ];
  const answer = [1, 4];
  expect(solution(dices)).toEqual(answer);
});

test('case 2', () => {
  const dices = [
    [1, 2, 3, 4, 5, 6],
    [2, 2, 4, 4, 6, 6],
  ];
  const answer = [2];
  expect(solution(dices)).toEqual(answer);
});
test('case 3', () => {
  const dices = [
    [40, 41, 42, 43, 44, 45],
    [43, 43, 42, 42, 41, 41],
    [1, 1, 80, 80, 80, 80],
    [70, 70, 1, 1, 70, 70],
  ];
  const answer = [1, 3];
  expect(solution(dices)).toEqual(answer);
});
