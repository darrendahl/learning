export class Board {
  rows: number;
  cols: number;
  cells: number[][];

  // m x n grid
  // [1,2,3,4,5,6,7]
  // [1,2,3,4,5,6,7]
  // [1,2,3,4,5,6,7]
  // [1,2,3,4,5,6,7]
  // [1,2,3,4,5,6,7]
  // [1,2,3,4,5,6,7]

  constructor(rows: number = 6, cols: number = 7) {
    this.rows = rows;
    this.cols = cols;
    this.cells = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => 0)
    );
  }

  checkColumn(r: number, player: number) {
    let consecutive = 0;
    for (let i = 0; i < this.cols; i++) {
      const row = this.cells[r];
      if (row && row[i] === player) {
        consecutive++;
      } else {
        consecutive = 0;
      }

      if (consecutive === 4) {
        return true;
      }
    }
    return false;
  }

  checkRow(c: number, player: number) {
    let consecutive = 0;

    for (let i = 0; i < this.rows; i++) {
      const row = this.cells[i];
      if (row && row[c] === player) {
        consecutive++;
      } else {
        consecutive = 0;
      }
      if (consecutive === 4) {
        return true;
      }
    }
    return false;
  }

  checkDiag(r: number, c: number, player: number) {
    let consecutive = 0;

    // check left diag
    let i = r;
    let j = c;
    while (i >= 0 && j >= 0 && i < this.rows && j < this.cols) {
      const row = this.cells[i];
      if (row && row[j] === player) {
        consecutive++;
        if (consecutive === 4) {
          return true;
        }
      } else {
        break;
      }
      i--;
      j--;
    }

    // check right diag
    i = r;
    j = c;
    while (i >= 0 && j >= 0 && i < this.rows && j < this.cols) {
      const row = this.cells[i];
      if (row && row[j] === player) {
        consecutive++;
        if (consecutive === 4) {
          return true;
        }
      } else {
        break;
      }
      i++;
      j++;
    }
    return false;
  }

  checkAntiDiag(r: number, c: number, player: number) {
    // check right antidiag
    let consecutive = 0;
    let i = r;
    let j = c;
    while (i >= 0 && j >= 0 && i < this.rows && j < this.cols) {
      const row = this.cells[i];
      if (row && row[j] === player) {
        consecutive++;
        if (consecutive === 4) {
          return true;
        }
      } else {
        break;
      }
      i--;
      j++;
    }

    i = r;
    j = c;
    // check right antidiag
    while (i >= 0 && j >= 0 && i < this.rows && j < this.cols) {
      const row = this.cells[i];
      if (row && row[j] === player) {
        consecutive++;
        if (consecutive === 4) {
          return true;
        }
      } else {
        break;
      }
      i++;
      j--;
    }

    return false;
  }

  hasPlayerWon(r: number, c: number, player: number): boolean {
    return (
      this.checkRow(c, player) ||
      this.checkColumn(r, player) ||
      this.checkDiag(r, c, player) ||
      this.checkAntiDiag(r, c, player)
    );
  }
  // when user clicks on the column,
  // we figure out the right row it goes to,
  // its bottom up - the first free row from the bottom
  move(col: number, player: number): number {
    for (let i = this.cells.length - 1; i >= 0; i--) {
      const row = this.cells[i];
      if (row && row[col] === 0) {
        row[col] = player;
        if (this.hasPlayerWon(i, col, player)) {
          return player;
        }
        return 0;
      }
    }
    return 0;
  }
}
