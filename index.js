
function addSquares(size) {
  // add a grid to #nonogram-inner-container 
  // of width `size` and height `size`

  const nonogramContainer = document.querySelector('#nonogram-inner-container');
  width = nonogramContainer.offsetWidth;

  const nonogramContainer2 = document.querySelector('#nonogram-inner-container2');

  for (let i = 0; i < size; i++) {
    let rowName = `board-row-${i}`;
    let currentRow = document.createElement('div');
    currentRow.id = rowName;
    currentRow.className = 'nonogram-row';
    nonogramContainer.appendChild(currentRow);
    for (let j = 0; j < size; j++) {
      let squareName = `cell-${i}-${j}`;
      let currentSquare = document.createElement('div')
      currentSquare.id = squareName;
      currentSquare.className = 'nonogram-cell';
      currentRow.appendChild(currentSquare);
      currentSquare.setAttribute('style', `height: ${width/size}px; width: ${width/size}px;`);
    }
  }

  for (let i = 0; i < size; i++) {
    let rowName2 = `board-row2-${i}`;
    let currentRow2 = document.createElement('div');
    currentRow2.id = rowName2;
    currentRow2.className = 'nonogram-row';
    nonogramContainer2.appendChild(currentRow2);
    for (let j = 0; j < size; j++) {
      let squareName2 = `cell2-${i}-${j}`;
      let currentSquare2 = document.createElement('div')
      currentSquare2.id = squareName2;
      currentSquare2.className = 'nonogram-cell2';
      currentRow2.appendChild(currentSquare2);
      currentSquare2.setAttribute('style', `height: ${width/size}px; width: ${width/size}px;`);
    }
  }
  
}

function fillSquares(percentage) {
  // iterate thru squares and roll using percentage 
  // for whether it gets filled or not 

  const cellList = document.querySelectorAll('.nonogram-cell');
  
  cellList.forEach((cell) => {
    if (Math.random()*100 < percentage) {
      cell.classList.add('filled');
    }
  });
}

function generateHints() {
  // generate arrays for each row+col with the 
  // count of each grouping of squares in the row

  const nonogramContainer = document.querySelector('#nonogram-inner-container');
  const rows = nonogramContainer.querySelectorAll('.nonogram-row');
  const cols = [];

  for (let i = 0; i < rows[0].children.length; i++) {
    const col = [];
    for (let j = 0; j < rows.length; j++) {
      col.push(rows[j].children[i]);
    }
    cols.push(col);
  }

  const rowHints = [];

  rows.forEach(row => {
    const hints = [];
    let count = 0;
    for (let i = 0; i < row.children.length; i++) {
      if (row.children[i].classList.contains('filled')) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      hints.push(count);
    }
    if (hints.length === 0) {
      hints.push(0);
    }
    rowHints.push(hints);
  });

  const colHints = [];

  cols.forEach(col => {
    const hints = [];
    let count = 0;
    for (let i = 0; i < col.length; i++) {
      if (col[i].classList.contains('filled')) {
        count++;
      } else if (count > 0) {
        hints.push(count);
        count = 0;
      }
    }
    if (count > 0) {
      hints.push(count);
    }
    if (hints.length === 0) {
      hints.push(0);
    }
    colHints.push(hints);
  });

  return [rowHints, colHints];
}

function displayHints(hints) {
  let rowHints = hints[0];
  let colHints = hints[1];

  const sideHintsContainer = document.querySelector('#nonogram-side-hints');
  const topHintsContainer = document.querySelector('#nonogram-top-hints');
  const nonogramContainer = document.querySelector('#nonogram-inner-container');

  const sideHintsContainer2 = document.querySelector('#nonogram-side-hints2');
  const topHintsContainer2 = document.querySelector('#nonogram-top-hints2');
  const nonogramContainer2 = document.querySelector('#nonogram-inner-container2');

  height = nonogramContainer.offsetWidth;

  for (let i = 0; i < rowHints.length; i++) {
    let rowName = `hint-row-${i}`;
    let rowHint = document.createElement('div');
    rowHint.id = rowName;
    rowHint.className = 'rowHint';
    sideHintsContainer.appendChild(rowHint);

    let rowName2 = `hint-row2-${i}`;
    let rowHint2 = document.createElement('div');
    rowHint2.id = rowName2;
    rowHint2.className = 'rowHint';
    sideHintsContainer2.appendChild(rowHint2);

    let hintText = '';
    rowHints[i].forEach(num => {
      hintText += num.toString();
      hintText += '&nbsp;&nbsp;';
    });
    rowHint.innerHTML = hintText;
    rowHint.setAttribute('style', `height: ${height/rowHints.length}px;`);
    
    rowHint2.innerHTML = hintText;
    rowHint2.setAttribute('style', `height: ${height/rowHints.length}px;`);

    let colName = `hint-col-${i}`;
    let colHint = document.createElement('div');
    colHint.id = colName;
    colHint.className = 'colHint';
    topHintsContainer.appendChild(colHint);

    let colName2 = `hint-col2-${i}`;
    let colHint2 = document.createElement('div');
    colHint2.id = colName2;
    colHint2.className = 'colHint';
    topHintsContainer2.appendChild(colHint2);

    hintText = '';
    colHints[i].forEach(num => {
      hintText += num.toString();
      hintText += ' ';
    });
    colHint.innerHTML = hintText;

    colHint2.innerHTML = hintText;
    //colHint.setAttribute('style', `height: ${height/rowHints.length}px;`);
    
  }
}

function markEmpty(index, size, rowOrCol) {
  for (i = 0; i < size; i++) {
    if (rowOrCol == 'row') {
      let currentCell = document.getElementById(`cell2-${index}-${i}`);
      if (currentCell.classList.contains('filled')) {
      } else {
        currentCell.classList.add('empty');
      }
    }
    if (rowOrCol == 'col') {
      let currentCell = document.getElementById(`cell2-${i}-${index}`);
      if (currentCell.classList.contains('filled')) {
      } else {
        currentCell.classList.add('empty');
      }
    }
    
  }
}

function fullCheck(rowHints, colHints, rowCells, colCells) {
  //check if row/col is totally full - all hints are fully present
  // if so, mark rest as empty
  const size = rowCells.length;
  for (let i = 0; i < size; i++) {
    let counter = 0;

    for (let j = 0; j < size; j++) {
      let rowHintSum = rowHints[i].reduce((accumulator, currentValue) => accumulator + currentValue);
      let currentCell = rowCells[i][j];
      if (currentCell.classList.contains('filled')) {
        counter++;
      }
      if (counter == rowHintSum) {
        markEmpty(i, size, 'row');
      }
    }
    counter = 0;
    for (let k = 0; k < size; k++) {
      let colHintSum = colHints[i].reduce((accumulator, currentValue) => accumulator + currentValue);
      let currentCell = colCells[i][k];
      if (currentCell.classList.contains('filled')) {
        counter++;
      }
      if (counter == colHintSum) {
        markEmpty(i, size, 'col');
      }
    }
  }
}

function checkBoardEdges(rowHints, colHints) {
  const size = rowHints.length;
  //first row
  for (i = 0; i < size; i++) {
    let currentCell = document.getElementById(`cell2-0-${i}`);
    if (currentCell.classList.contains('filled')) {
      let hint = colHints[i][0];
      for (j = 0; j < hint + 1; j++) {
        if (j == 15) {
          break;
        }
        let thisCell = document.getElementById(`cell2-${j}-${i}`);
        thisCell.classList.add('filled');
        if (j == hint) {
          thisCell.classList.remove('filled');
          thisCell.classList.add('empty');
        }
      }
    }
  }

  // last row
  for (i = 0; i < size; i++) {
    let currentCell = document.getElementById(`cell2-14-${i}`);
    if (currentCell.classList.contains('filled')) {
      let hint = colHints[i][colHints[i].length - 1];
      for (j = 14; j > 14 - hint - 1; j--) {
        if (j == 0) {
          break;
        }
        let thisCell = document.getElementById(`cell2-${j}-${i}`);
        thisCell.classList.add('filled');
        if (j == 14 - hint) {
          thisCell.classList.remove('filled');
          thisCell.classList.add('empty');
        }
      }
    }
  }

  // first col
  for (i = 0; i < size; i++) {
    let currentCell = document.getElementById(`cell2-${i}-0`);
    if (currentCell.classList.contains('filled')) {
      let hint = rowHints[i][0];
      for (j = 0; j < hint + 1; j++) {
        if (j == 15) {
          break;
        }
        let thisCell = document.getElementById(`cell2-${i}-${j}`);
        thisCell.classList.add('filled');
        if (j == hint) {
          thisCell.classList.remove('filled');
          thisCell.classList.add('empty');
        }
      }
    }
  }

  // last col
  for (i = 0; i < size; i++) {
    let currentCell = document.getElementById(`cell2-${i}-14`);
    if (currentCell.classList.contains('filled')) {
      let hint = rowHints[i][rowHints[i].length - 1];
      for (j = 14; j > 14 - hint - 1; j--) {
        if (j == 0) {
          break;
        }
        let thisCell = document.getElementById(`cell2-${i}-${j}`);
        thisCell.classList.add('filled');
        if (j == 14 - hint) {
          thisCell.classList.remove('filled');
          thisCell.classList.add('empty');
        }
      }
    }
  }
}

function calculateSolvability(hints) {
  // figure out if the nonogram has more than 1 
  // solution and how hard it will be to solve

  let rowHints = hints[0];
  let colHints = hints[1];

  const size = rowHints.length;
  
  const rowCells = [];
  const colCells = [];

  // create array of cell elements for each row
  for (let i = 0; i < size; i++) { 
    const currentRow = [];
    const cellsInRow = document.querySelectorAll(`#board-row2-${i} .nonogram-cell2`);
    cellsInRow.forEach((cell) => {
      currentRow.push(cell);
    });
    rowCells.push(currentRow);
  }

  // create array of cell elements for each col
  for (let j = 0; j < size; j++) { 
    const currentCol = [];
    for (let i = 0; i < size; i++) { // iterate through the rows
      const cell = document.getElementById(`cell2-${i}-${j}`);
      currentCol.push(cell);
    }
    colCells.push(currentCol);
  }

  // fill in rows with hint - gap
  for (let i = 0; i < size; i++) { 
    let hint = rowHints[i];
    let sum = hint.reduce((accumulator, currentValue) => accumulator + currentValue);
    let gap = size - sum - hint.length + 1;
    let row = rowCells[i]; //not used
    let start = 0;
  
    for (let h = 0; h < hint.length; h++) {
      for (let j = 0; j < size; j++) {
        const cell = document.getElementById(`cell2-${i}-${j}`);
        if (j >= start) {
          if (j < (hint[h] + start)) {
            if ((j - start) >= gap){
              cell.classList.add('filled');
            }
          } else if (j == (hint[h] + start)){
            start = j + 1;
            break;
          } else {
            break;
          }
        }
      }
    }
  }

  // Fill in cols with hint - gap
  for (let i = 0; i < size; i++) { 
    let hint = colHints[i];
    let sum = hint.reduce((accumulator, currentValue) => accumulator + currentValue);
    let gap = size - sum - hint.length + 1;
    let col = colCells[i]; //not used
    let start = 0;
  
    for (let h = 0; h < hint.length; h++) {
      for (let j = 0; j < size; j++) {
        const cell = document.getElementById(`cell2-${j}-${i}`);
        if (j >= start) {
          if (j < (hint[h] + start)) {
            if ((j - start) >= gap){
              cell.classList.add('filled');
            }
          } else if (j == (hint[h] + start)){
            start = j + 1;
            break;
          } else {
            break;
          }
        }
      }
    }
  }

  // add empty to cells that cannot be filled, row by row and col by col 

  fullCheck(rowHints, colHints, rowCells, colCells);

  checkBoardEdges(rowHints, colHints, rowCells, colCells);

  fullCheck(rowHints, colHints, rowCells, colCells);

  // add empty to both ends of block if it is already matching only possible hint


}


addSquares(15);

fillSquares(70);

const hints = generateHints();

displayHints(hints);

calculateSolvability(hints);


// Code for user filling cells
  const nonogramCells = document.querySelectorAll('.nonogram-cell2');
  let activeFill = false;

  document.addEventListener('mousedown', () => {
    activeFill = true;
  })

  document.addEventListener('mouseup', () => {
    activeFill = false;
  })

  let activeCellMode = 1;

  nonogramCells.forEach(cell => { // Fill first cell on click
    cell.addEventListener('mousedown', e => {
      e.preventDefault();
      if (e.target.classList.contains('filled')) {
        e.target.classList.remove('filled');
        e.target.classList.add('empty');
        activeCellMode = 2;
      } else if (e.target.classList.contains('empty')) {
        e.target.classList.remove('empty');
        activeCellMode = 0;
      } else {
        e.target.classList.add('filled');
        activeCellMode = 1;
      }
      
    });
  });

  nonogramCells.forEach(cell => { // continue filling cells after click
      cell.addEventListener('mouseover', e => {
        e.preventDefault();
        if (activeFill) {
          if (activeCellMode == 2) {
            e.target.classList.remove('filled');
            e.target.classList.add('empty');
          } else if (activeCellMode == 0) {
            e.target.classList.remove('filled');
            e.target.classList.remove('empty');
          } else if (activeCellMode == 1) {
            e.target.classList.add('filled');
            e.target.classList.remove('empty');
          } else {
            throw error;
          }
        }
      });
  });



