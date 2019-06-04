// returns a random number between selected indexes
const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

// returns a board of sizes between 3 and 50 with values between 1 and 10
// changed values to section from 1 to 10 to make a riddle more reasonable
const createBoard = () => {
    var matrix = [];
    var height = getRandomArbitrary(3, 50);
    var width = getRandomArbitrary(3, 50);
    for (var i = 0; i < width; i++) {
        matrix[i] = [];
        for (var j = 0; j < height; j++) {
            matrix[i][j] = parseInt(getRandomArbitrary(1, 10));
        }
    }
    return matrix;
}

// takes a board and returns a solved board
// both boards are being logged in the browser when launching the script
const riddleSolver = (board) => { 
    iterate = true;

    // only result i found to log the initial board
    console.log("Given board:");
    var board2 = [];
    var height = board[0].length;
    var width = board.length;
    for (var i = 0; i < width; i++) {
        board2[i] = [];
        for (var j = 0; j < height; j++) {
            board2[i][j] = board[i][j];
        }
    }
    console.dir(board2);

    // if three or more in a row are found continue iterating, else return the board in current state
    while(iterate) {
        var count = 0;
        for(var i=0; i<board.length; i++) {
            for(var j=0; j<board[0].length; j++) {
                if(board[i][j]!=0) {
                    if (i+2 < board.length) {
                        if (board[i][j] == board[i+1][j] && board[i][j] == board[i+2][j]) {
                            
                            // count items to drop
                            var licz = 3;
                            for(var g=i+3; g<board.length; g++) {
                                if(board[i][j]==board[g][j]) licz++;
                            }

                            // drop from the top
                            for(var l=i+2; l>0; l--) {
                                if(l-licz>=0) {
                                    board[l][j] = board[l-licz][j];
                                } else 
                                board[l][j] = 0;
                            }

                            // top are zeros
                            for (var m = 0; m < licz; m++) {
                                board[0+m][j] = 0;
                            }

                            // dont stop iterating from the top of the board
                            count=1;
                            i = board.length;
                            j = board[0].length;
                        }
                    }
                    if (j + 2 < board[0].length) {
                        if (board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2]) {

                            // count items to drop
                            var licz = 3;
                            for (var g=j+3; g<board[0].length; g++) {
                                if (board[i][j] == board[i][g]) licz++;
                            }

                            // drop from the top
                            for (var l = i; l > 0; l--) {
                                for (var m = 0; m < licz; m++) {
                                    board[l][j+m] = board[l-1][j+m];
                                }
                            }

                            // top are zeros
                            for (var m = 0; m < licz; m++) {
                                board[0][m+j] = 0;
                            }

                            // dont stop iterating from the top of the board
                            count=1;
                            i = board.length;
                            j = board[0].length;
                        }
                    }
                }
            }
        }
        // dont stop iterating from the top of the board 
        // if at least three items in a row with the same values were found
        if (count == 0) {
            iterate = false;
        }
    }
    console.log("Solved board:");
    console.dir(board);
    return board;
};

// board from exercise example to check if it works well

const boardExample = [
    [7, 7, 7, 5, 1, 7],
    [1, 8, 1, 1, 1, 4],
    [3, 2, 3, 9, 7, 6],
    [9, 9, 3, 3, 6, 2],
    [1, 9, 3, 1, 8, 7],
    [5, 9, 2, 2, 4, 8]
];

// randomly generate a board
const boardCreated = createBoard();

console.log("Board from the example: ");
// riddleSolver for board from example given in the content of the task
riddleSolver(boardExample);

console.log("Randomly generated board: ");
// riddleSolver for board created randomly by a function above
riddleSolver(boardCreated);