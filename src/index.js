module.exports = function solveSudoku(matrix) {
  // check row
  function checkRow(row, value) {
    let s = 0;
    for (let i = 0; i < 9; i++) {
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
  function checkColumn(column, value) {
    let s = 0;
    for (let i = 0; i < 9; i++) {
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

  // check close box
  function checkBox([startR, endR], [startC, endC], value) {
    let s = 0;
    for (let i = startR; i <= endR; i++) {
      for (let j = startC; j <= endC; j++) {
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
    if (checkRow(row, value) && checkColumn(column, value) && checkBox(getBox(row),getBox(column), value)) {
      return true;
    } else {
      return false;
    }
  }

  //putValue
  function putValue(r,c) {
    for (let i = 1; i <= 9; i++) {
      if (checkValue(r, c, i)) {
        matrix[r][c] = i;
      }
    }
  }
  
  //backtracking system
  // make given values static

  // general cycle
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (matrix[i][j] == 0) {
        putValue(i, j);
      }
    }
  }
  return(matrix);
}
