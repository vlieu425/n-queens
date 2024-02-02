/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = new Board({n: n}); //fixme

  //Recursive function (rowIndex, columnIndex)
  var placeRooks = function (rowIndex) {
    //base case
    //end recrusion when we solved --> when we row = n
    if (rowIndex === n) {
      return solution.rows();
    }

    //Iterate through n, iterate through column
    for (var col = 0; col < n; col++) {
      //Place a rook at parameters
      solution.togglePiece(rowIndex, col);

      //check to see if there's a conflict, if no conflict
      if (!solution.hasAnyRooksConflicts()) {
        //new rowIndex = row + 1
        //new colIndex = i
        //recursive case on next square(when we have no conflict with placed piece)
        var r = placeRooks(rowIndex + 1);
        return r;
      }
      //Backtrack - retoggle to nothing
      solution.togglePiece(rowIndex, col);

    }
  };

  //invoke the recursive function at (0)
  var result = placeRooks(0);


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(result));
  return result;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n, rowIndex) {
  var solutionCount = 0; //fixme
  var solution = new Board({n: n});
  //Recursive function (rowIndex, columnIndex)
  var findSolutions = function (rowIndex) {
    //base case
    //end recrusion when we solved --> when we row = n
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    //Iterate through n, iterate through column
    for (var col = 0; col < n; col++) {
      //Place a rook at parameters
      solution.togglePiece(rowIndex, col);

      //check to see if there's a conflict, if no conflict
      if (!solution.hasAnyRooksConflicts()) {
        //new rowIndex = row + 1
        //new colIndex = i
        //recursive case on next square(when we have no conflict with placed piece)
        findSolutions(rowIndex + 1);
      }
      //Backtrack - retoggle to nothing
      solution.togglePiece(rowIndex, col);
    }
  };
  findSolutions(0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n}); //fixme

  //Recursive function (rowIndex, columnIndex)
  var placeQueens = function (rowIndex) {
    //base case
    //end recrusion when we solved --> when we row = n
    if (rowIndex === n) {
      return solution.rows();
    }

    //Iterate through n, iterate through column
    for (var col = 0; col < n; col++) {
      //Place a Queens at parameters
      solution.togglePiece(rowIndex, col);

      //check to see if there's a conflict, if no conflict
      if (!solution.hasAnyQueensConflicts()) {
        //new rowIndex = row + 1
        //new colIndex = i
        //recursive case on next square(when we have no conflict with placed piece)
        var r = placeQueens(rowIndex + 1);
        if (r) {
          return r;
        }
      }
      //Backtrack - retoggle to nothing
      solution.togglePiece(rowIndex, col);

    }
  };

  //invoke the recursive function at (0)
  var result = placeQueens(0);


  console.log('Single solution for ' + n + ' queens:', JSON.stringify(result));

  return result || solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var solution = new Board({n: n});
  var findSolutions = function (rowIndex) {
    if (rowIndex === n) {
      solutionCount++;
      return;
    }

    for (var col = 0; col < n; col++) {
      //Place a rook at parameters
      solution.togglePiece(rowIndex, col);

      //check to see if there's a conflict, if no conflict
      if (!solution.hasAnyQueensConflicts()) {
        //new rowIndex = row + 1
        //new colIndex = i
        //recursive case on next square(when we have no conflict with placed piece)
        findSolutions(rowIndex + 1);
      }
      //Backtrack - retoggle to nothing
      solution.togglePiece(rowIndex, col);
    }
  };
  findSolutions(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
