const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';





function grid({ rows, columns }) {


  let hatPlaced = false
  let minesArray = Array.from({ length: rows }, () => (
    Array.from({ length: columns }, () => fieldCharacter)
  ))
  let minesPlaced = 0
  let mines = Math.floor((rows * columns) / 3)

  while (minesPlaced < mines) {
    let randomRow = Math.floor(Math.random() * rows)
    let randomColumn = Math.floor(Math.random() * columns)
    if (minesArray[randomRow][randomColumn] === fieldCharacter) {
      minesArray[randomRow][randomColumn] = hole
      minesPlaced++
    }
  }

  while (!hatPlaced) {
    let randomRow = Math.floor(Math.random() * rows)
    let randomColumn = Math.floor(Math.random() * columns)
    if (minesArray[randomRow][randomColumn] === fieldCharacter) {
      minesArray[randomRow][randomColumn] = hat
      hatPlaced = true
    }
  }
  minesArray[0][0] = pathCharacter
  creatingGridCalled = true;
  return minesArray
}


function findLastIndex(arr, element) {
  for (let i = arr.length - 1; i >= 0; i--) {
    let subArr = arr[i]
    for (let j = subArr.length - 1; j >= 0; j--) {
      if (subArr[j] === element) {
        return [i, j]
      }
    }
  }
  return -1
}

let arr = grid({ rows: 12, columns: 10 });

function print() {
  console.log(arr.join('\n').replace(/,/g, ''));
}


function move() {
  let [i, j] = findLastIndex(arr, pathCharacter)
  print()
  const direction = prompt('Which direction Down(D), Up(U), Left(L), Right(R)? ');
  if (direction === 'D') {
    if (arr[i + 1][j] === hole) {
      console.log('You fell in a hole!')
      return
    } else if (arr[i + 1][j] === hat) {
      console.log('You found your hat!')
      return
    }

    if (i < arr.length - 1) {
      arr[i + 1][j] = pathCharacter
    }
  } else if (direction === 'U') {
    arr[i - 1][j] = pathCharacter


    if (arr[i - 1][j] === hole) {
      console.log('You fell in a hole!')
      return
    } else if (arr[i - 1][j] === hat) {
      console.log('You found your hat!')
      return
    }


  } else if (direction === 'R') {
    if (arr[i][j + 1] === hole) {
      console.log('You fell in a hole!')
      return
    } else if (arr[i][j + 1] === hat) {
      console.log('You found your hat!')
      return
    }

    if (j < arr[i].length - 1) {
      arr[i][j + 1] = pathCharacter
    }
  } else if (direction === 'L') {
    if (arr[i][j - 1] === hole) {
      console.log('You fell in a hole!')
      return
    } else if (arr[i][j - 1] === hat) {
      console.log('You found your hat!')
      return
    }

    arr[i][j - 1] = pathCharacter


  } else {
    console.log('Invalid Input')
  }
  move()
}


move()

module.exports = { grid };


