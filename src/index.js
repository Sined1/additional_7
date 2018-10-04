module.exports = function solveSudoku(matrix) {
  //save empty positions to work only with them
  function emptyPos (ar) {
    let newMatrix = [];
    for (let i = 0; i < ar.length; i++) {
      for (let j = 0; j < ar[0].length; j++) {
        if (ar[i][j] === 0) {
          newMatrix.push([i, j]);
        }
      }
    }
    return newMatrix;
  }

  //checkRow
  function checkRow (row, col, val, ar) {
    for (let i = 0; i < ar[row].length; i++) {
      if (i === col) continue;
      if (val === ar[row][i]) {
        return false;
      }
    }
    return true;
  }

  //checkColumn
  function checkColumn (row, col, val, ar) {
    for (let i = 0; i < ar.length; i++) {
      if (i === row) continue;
      if (val === ar[i][col]) {
        return false;
      }
    }
    return true;
  }

  //getBoxBorder
  function boxBorder (a) {
    switch (a) {
      case 0: return [0, 2];
      case 1: return [0, 2];
      case 2: return [0, 2];
      case 3: return [3, 5];
      case 4: return [3, 5];
      case 5: return [3, 5];
      case 6: return [6, 8];
      case 7: return [6, 8];
      case 8: return [6, 8];
      default: return "whole sheet, bug";
    }
  }

  //check3x3
  function check3x3 (row, col, val, ar) {
    let sR = boxBorder(row)[0],
        eR = boxBorder(row)[1],
        sC = boxBorder(col)[0],
        eC = boxBorder(col)[1];
    for (let i = sR; i <= eR; i++) {
      for (let j = sC; j <= eC; j++) {
        if (i === row && j === col) continue;
        if (ar[i][j] === val) {
          return false;
        }
      }
    }
    return true;
  }

  //checkValue
  function checkValue (row, col, val, ar) {
    if (checkRow(row, col, val, ar) && checkColumn(row, col, val, ar) && check3x3(row, col, val, ar)) {
      return true;
    } else {
      return false;
    }
  }

  //solveSudoku
  let emptyArray = emptyPos(matrix);
  let solveMatrix = matrix;
  let val, row, col, er, i;
  for (i = 0; i < emptyArray.length; i ++) {
    row = emptyArray[i][0];
    col = emptyArray[i][1];
    val = Math.floor(solveMatrix[row][col]);
    if (val < 9) {
      for (let j = val; j < 9; j++) {
        val++;
        if (checkValue(row, col, val, solveMatrix)) {
          solveMatrix[row][col] = val;
          break;
        } else if (val == 9) {
            solveMatrix[row][col] = 0;
            i = i - 2;
        }
      }
    } else {
      solveMatrix[row][col] = 0;
      i = i - 2;
    }
  }
  return solveMatrix;
}
