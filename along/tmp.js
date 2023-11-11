const moves = [1, 5, 4];

const WIN = [[1,2,3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 6]];
let loading = false;

const getSplitValues = () => {
  const a = [], b = [];
  moves.forEach((i, index) => {
    if(index % 2 === 1) a.push(i); else b.push(i);
  });
  a.sort(); b.sort();
  return [a, b];
}
const whoWon = () => {
  let won = 0;
  const [a, b] = getSplitValues();
  if(b[2] === 7) console.log('WHOWON', a, b, moves);
  WIN.forEach(arr => {
    if(!won){
      if(a.includes(arr[0]) && a.includes(arr[1]) && a.includes(arr[2])) won = 1;
      if(b.includes(arr[0]) && b.includes(arr[1]) && b.includes(arr[2])) won = 2;
    }
  });
  // console.log(moves, won);
  return won;
}

const playNextMove = () => {
  console.log('PLAY NEXT MOVE', moves);
  loading = true;
    const [a,b] = getSplitValues();
    let nextMove = 0;
    if(b.length === 1){
      if(moves[0] === 5) nextMove = 1; else nextMove = 5;
    } else {
      for(let i=1;i<=9;i++) { if(!moves.includes(i)) {
        moves.push(i);
        if(whoWon() === 2) nextMove = i;
        moves.pop();
      }}
      console.log('MIDWAY Next move', nextMove);
      for(let i=1;i<=9;i++) { if(!nextMove && !moves.includes(i)) {
        moves.push(i);
        let lost = false;
        for(let j=1; j<=9; j++){ if(!nextMove && !moves.includes(j)) {
          moves.push(j);
          if(whoWon() === 2){
            console.log('LOST ON ', i, j);
            lost = true;
          } else console.log('TESTED FOR ', i, j);
          moves.pop();
        }}
        moves.pop();
        if(!lost) nextMove = i;
      }}
    }
    if(nextMove){
      // document.querySelector(`#c${nextMove}`).innerHTML = 'AMEY';
      moves.push(nextMove);
      loading = false;
    } else {
      alert('It is a draw!!');
    }
    console.log('NEXT MOVE =>', nextMove);
}

playNextMove();

