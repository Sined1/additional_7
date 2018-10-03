module.exports = function solveSudoku(matrix) {
  // check row
  function checkRow(row, column, value) {
    let s = 0;
    for (let i = 0; i < 9; i++) {
      if (i == column) {
        continue;
      }
      if (value == matrix[row][i]) {
        s++;
      }
    }
    if (s == 0) {
      return true;
    } else {
      return false;
    }
  }

  // check column
  function checkColumn(row, column, value) {
    let s = 0;
    for (let i = 0; i < 9; i++) {
      if (i == row) {
        continue;
      }
      if (value == matrix[i][column]) {
        s++;
      }
    }
    if (s == 0) {
      return true;
    } else {
      return false;
    }
  }

  //get box values
  function getBox(value) {
    switch (value) {
      case 0: return [0,2];
      case 1: return [0,2];
      case 2: return [0,2];
      case 3: return [3,5];
      case 4: return [3,5];
      case 5: return [3,5];
      case 6: return [6,8];
      case 7: return [6,8];
      case 8: return [6,8];
    }
  }

  // check box 3x3
  function checkBox([startR, endR], [startC, endC], row, column, value) {
    let s = 0;
    for (let i = startR; i <= endR; i++) {
      for (let j = startC; j <= endC; j++) {
        if (i == row && j == column) {
          continue;
        }
        if (value == matrix[i][j]) {
          s++;
        }
      }
    }
    if (s == 0) {
      return true;
    } else {
      return false;
    }
  }

  // check value function (combine row, column and box check)
  function checkValue(row, column, value) {
    if (checkRow(row, column, value) && checkColumn(row, column, value) && checkBox(getBox(row), getBox(column), row, column, value)) {
      return true;
    } else {
      return false;
    }
  }

  //get emptyArray - array with unknown values from given Sudoku
  function getEmptyArray(ar) {
    let a = [];
    let i, j;
    for (i = 0; i < 9; i++) {
      for (j = 0; j < 9; j++) {
        if (ar[i][j] === 0) {
          a.push(i, j);
        }
      }
    }
    return a;
  }

  //variables
  let emAr = getEmptyArray(matrix);
  let row, col, val, s;

  //solving the main task
  for (let i = 0; i < (emAr.length / 2); i++) {
    row = emAr[i*2];
    col = emAr[i*2+1];
    val = matrix[row][col];
    s = val;

    // try to rewrite this for to while cycle
    if (val < 9) {
      do {
        val++;
        if (checkValue(row, col, val)) {
          matrix[row][col] = val;
          s = 0;
          break;
        } else {
          s++;
        }
      } while (val < 9);
    } else {
      matrix[row][col] = 0;
      i = i - 2;
    }

    // Check if value is not fit to the place. Return to the previous
    // step if not
    if (s == 9) {
      matrix[row][col] = 0;
      i = i - 2;
    }
  }

  return(matrix);
}
