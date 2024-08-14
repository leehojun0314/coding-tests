function solution(dices) {
  let combinations = dices.length / 2;
  let unions = [];
  let results = {};
  for (let i = 0; i < dices.length; i++) {
    for (let j = i + 1; j < dices.length; j++) {
      unions.push([i, j]);
    }
  }
  let availableIndexes = dices.reduce((acc, cur, index) => {
    acc.push(index);
    return acc;
  }, []);
  console.log('available indexes: ', availableIndexes);

  let oponents = [];
  for (let i = 0; i < unions.length; i++) {
    let availableIndexesCopy = [...availableIndexes];
    for (let j = 0; j < unions[i].length; j++) {
      availableIndexesCopy.splice(
        availableIndexesCopy.indexOf(unions[i][j]),
        1,
      );
      console.log(
        'available indexes copy after splice: ',
        availableIndexesCopy,
      );
    }
    oponents.push(availableIndexesCopy);
    console.log('union: ', unions[i]);
    console.log('oponent: ', availableIndexesCopy);
  }
  console.log('oponents: ', oponents);
  console.log('unions: ', unions);
  // for (let i = 0; i < unions.length; i++) {
  //   for (let j = 0; j < combinations; j++) {
  //     // oponent.push((unions[i][j] + combinations) % dices.length);
  //     console.log('union: ', unions[i]);
  //     console.log('available indexes: ', availableIndexes);
  //     let splicedArr = availableIndexes.slice(unions[i][j] + 1);
  //     console.log('spliced arr: ', splicedArr);
  //     oponents.push(splicedArr);
  //     // oponent.push(availableIndexes.filter((x) => x !== unions[i][j])[j]);
  //   }

  //   console.log('union: ', unions[i]);
  // }
  var answer = [];
  return answer;
}
function solution2(dices) {
  let combinations = dices.length / 2;
  let wins = [];
  for (let dice of dices) {
    wins.push(dice.reduce((acc, cur) => acc + cur, 0));
  }
  console.log('wins: ', wins);
  let copyWins = [...wins];
  let answer = [];
  for (let i = 0; i < combinations; i++) {
    const max = Math.max(...copyWins);
    const maxIndex = wins.indexOf(max);
    copyWins.splice(maxIndex, 1);
    answer.push(maxIndex);
  }
  console.log('answer: ', answer);
  return answer.map((x) => x + 1);
}
solution2([
  [1, 2, 3, 4, 5, 6],
  [3, 3, 3, 3, 4, 4],
  [1, 3, 3, 4, 4, 4],
  [1, 1, 4, 4, 5, 5],
]);
module.exports = solution2;
