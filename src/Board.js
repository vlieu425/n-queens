// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //declare new variable column - assign index value
      var row = this.get(rowIndex);
      //declare new value count - assign 0
      var count = 0;

      //iterate over row
      for (var i = 0; i < row.length; i++) {
        //if current item = 1
        if (row[i] === 1) {
          //count++
          count++;
        }
      }

      //if count > 1
      if (count > 1) {
        //return true
        return true;
      }

      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //declare variable n and assign to value of n
      var n = this.get('n');
      //declare conflictCount = 0
      var conflictCount = 0;

      //iterate n-times (current item = row)
      for (var i = 0; i < n; i++) {
        //if hasRowConflictAt(i)
        if (this.hasRowConflictAt(i)) {
          //increment conflictCount
          conflictCount++;
        }
      }

      //if conflictCount above 0
      if (conflictCount > 0) {
        //return true
        return true;
      }

      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // declare n and set to n count
      var n = this.get('n');
      // declare counter variable - init to 0
      var count = 0;
      // iterate over n
      for (var i = 0; i < n; i++) {
        // declare variable currRow equal to this.get(i)
        var currentRow = this.get(i);
        // if currentRow[colIndex] === 1
        if (currentRow[colIndex] === 1) {
          // increment counter
          count++;
        }
      }
      // if counter > 1
      if (count > 1) {
        // return true
        return true;
      }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // declare variable n to this.get(n)
      var n = this.get('n');
      // iterate over n
      for (var i = 0; i < n; i++) {
        // if (hasColConflictAt(i))
        if (this.hasColConflictAt(i)) {
          // return true
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      // declare variable n to this.get('n')
      var n = this.get('n');
      // declare a counter variable
      var count = 0;

      // iterate over n => n === 1, row 1; each iteration is the ROW
      for (var i = 0; i < n; i++) {
        // create variable currentRow = this.get(i)
        var currentRow = this.get(i);
        // if value at index === 1 AND isInBounds
        if (currentRow[majorDiagonalColumnIndexAtFirstRow + i] === 1 && this._isInBounds(i, majorDiagonalColumnIndexAtFirstRow + i)) {
          // increment counter variable
          count++;
        }
      }
      // if counter > 1
      if (count > 1) {
        // return true
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // // declare n to this.get('n')
      // var n = this.get('n');
      // // iterate through every row
      // for (var i = 0; i < n; i++) {
      //   // iterate through every column index
      //   for (var j = 0; j < n; j++) {
      //     // if this.hasMajorConflictAt(j - i)
      //     if (this.hasMajorDiagonalConflictAt(j - i)) {
      //       // return true
      //       return true;
      //     }
      //   }
      // }
      // return false; // fixme
      // }




      // declare n to this.get('n')
      var n = this.get('n');
      // iterate through every row
      for (var i = 0; i < n; i++) {

        // if this.hasMajorConflictAt(j - i)
        if (this.hasMajorDiagonalConflictAt(i) || this.hasMajorDiagonalConflictAt(-i)) {
          // return true
          return true;
        }
      }
      return false; // fixme

    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //declare variable n
      var n = this.get('n');
      //decalre counter variable = 0
      var count = 0;

      //iterate over each row
      for (var i = 0; i < n; i++) {
        //declare variable currentROw = this.get(i)
        var currentRow = this.get(i);
        //if currentRow[param - i] === 1 AND this._isInBounds(i, param -1)
        if (currentRow[minorDiagonalColumnIndexAtFirstRow - i] && this._isInBounds(i, minorDiagonalColumnIndexAtFirstRow - i)) {
          //increment counter
          count++;
        }
      }

      //if count greater than 1
      if (count > 1) {
        //return true
        return true;
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // //declare n = this.get('n')
      // var n = this.get('n');

      // //iterate
      // for (var i = 0; i < n; i++) {
      //   //iterate
      //   for (var j = 0; j < n; j++) {
      //     //if this.hasMinor...At(i - j)
      //     // console.log('i + j', j + i);
      //     if (this.hasMinorDiagonalConflictAt(j + i)) {
      //       //return true
      //       return true;
      //     }
      //   }
      // }

      // return false; // fixme

      //declare n = this.get('n')
      var n = this.get('n');

      //iterate
      for (var i = 0; i < n; i++) {

        //if this.hasMinor...At(i - j)
        // console.log('i + j', j + i);
        if (this.hasMinorDiagonalConflictAt(i) || this.hasMinorDiagonalConflictAt(i + n)) {
          //return true
          return true;
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
