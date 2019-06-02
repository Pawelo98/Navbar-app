// returns a random number between selected indexes
const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

// returns a board of sizes between 3 and 50 with values between 1 and 1000
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
    console.dir(matrix);
    return matrix;
}

// takes a board and returns a solved board
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
                            var g = i + 3;
                            var licz = 3;
                            if (i + 3 < board.length) {
                                while(board[i][j]==board[g][j]) {
                                    licz++;
                                    g++;
                                }
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
                            count=1;
                            i = board.length;
                            j = board[0].length;
                        }
                    }
                    if (j + 2 < board[0].length) {
                        if (board[i][j] == board[i][j + 1] && board[i][j] == board[i][j + 2]) {

                            // count items to drop
                            var g = j + 3;
                            var licz = 3;
                            if(j+3<board[0].length) {
                                while (board[i][j] == board[i][g]) {
                                    licz++;
                                    g++;
                                }
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
                            count=1;
                            i = board.length;
                            j = board[0].length;
                        }
                    }
                }
            }
        }
        if (count == 0) {
            iterate = false;
        }
    }
    console.log("Solved board:");
    console.dir(board);
    return board;
};
/*
const board = [
    [7, 7, 7, 5, 1, 7],
    [1, 8, 1, 1, 1, 4],
    [3, 2, 3, 9, 7, 6],
    [9, 9, 3, 3, 6, 2],
    [1, 9, 3, 1, 8, 7],
    [5, 9, 2, 2, 4, 8]
];
*/

const boardCreated = createBoard();

// usage of functions written above
riddleSolver(boardCreated);