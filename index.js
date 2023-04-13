
function addSquares(size) {
  // add a grid to #nonogram-inner-container 
  // of width `size` and height `size`

  const nonogramContainer = document.querySelector('#nonogram-inner-container');
  width = nonogramContainer.offsetWidth;

  for (let i = 0; i < size; i++) {
    let rowName = `${i}`;
    let currentRow = document.createElement('div');
    currentRow.id = rowName;
    currentRow.className = 'nonogram-row';
    nonogramContainer.appendChild(currentRow);
    for (let j = 0; j < size; j++) {
      let squareName = `${i}-${j}`;
      let currentSquare = document.createElement('div')
      currentSquare.id = squareName;
      currentSquare.className = 'nonogram-cell';
      currentRow.appendChild(currentSquare);
      currentSquare.setAttribute('style', `height: ${width/size}px; width: ${width/size}px;`);
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

  console.log(rowHints);
  console.log(colHints);
}


function calculateSolvability() {
  // figure out if the nonogram has more than 1 
  // solution and how hard it will be to solve
}

addSquares(20);

fillSquares(50);

generateHints();