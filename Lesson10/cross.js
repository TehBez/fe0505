const EMTY_CELL = ' ';
const X_CELL = 'x';
const O_CELL = 'O';
const USERS = ['X', 'O'];
const CELLS = {
    [USERS[0]]: X_CELL,
    [USERS[1]]: O_CELL
};
const DELIMITER = ' | ';

console.log( CELLS );

// 0 | 1 | 2
// --|---|--
// 3 | 4 | 5
// --|---|--
// 6 | 7 | 8

class CrossGame {
    constructor() {
        // this = {}
        this.board = new Array(9).fill(EMTY_CELL);
        this.currentUser = USERS[0];
        // this.__proto__ = CrossGame.prototype
        // return this;
    }

    step( cellNumber ) {
        if (this.board[cellNumber] === EMTY_CELL) {
            this.board[cellNumber] = CELLS[this.currentUser];

            const isWin = this.isWin();

            this.currentUser = USERS.find(u => u !== this.currentUser);
            this.render();

            if (isWin) {
                console.log('win: ', this.currentUser);
            }
        } else {
            console.error('wrong step');
        }
    }

    isWin() {
        // homework
        if (this.currentUser === USERS[0]) {
            switch (this.currentUser) {
                case (this.board[0] === this.board[1] && this.board[0] === this.board[2]):
                    return true;
                    break;
                case (this.board[3] === this.board[4] && this.board[3] === this.board[5]):
                    return true;
                    break;
                case (this.board[6] === this.board[7] && this.board[6] === this.board[8]):
                    return true;
                    break;
                case (this.board[0] === this.board[3] && this.board[0] === this.board[6]):
                    return true;
                    break;
                case (this.board[1] === this.board[4] && this.board[1] === this.board[7]):
                    return true;
                    break;
                case (this.board[2] === this.board[5] && this.board[2] === this.board[8]):
                    return true;
                    break;
                case (this.board[0] === this.board[4] && this.board[0] === this.board[8]):
                    return true;
                    break;
                case (this.board[2] === this.board[4] && this.board[2] === this.board[6]):
                    return true;
                    break;
                default:
                    return false;
                    break;
                }
            } else if (this.currentUser === USERS[1]) {
                switch (this.currentUser) {
                case (this.board[0] === this.board[1] && this.board[0] === this.board[2]):
                    return true;
                    break;
                case (this.board[3] === this.board[4] && this.board[3] === this.board[5]):
                    return true;
                    break;
                case (this.board[6] === this.board[7] && this.board[6] === this.board[8]):
                    return true;
                    break;
                case (this.board[0] === this.board[3] && this.board[0] === this.board[6]):
                    return true;
                    break;
                case (this.board[1] === this.board[4] && this.board[1] === this.board[7]):
                    return true;
                    break;
                case (this.board[2] === this.board[5] && this.board[2] === this.board[8]):
                    return true;
                    break;
                case (this.board[0] === this.board[4] && this.board[0] === this.board[8]):
                    return true;
                    break;
                case (this.board[2] === this.board[4] && this.board[2] === this.board[6]):
                    return true;
                    break;
                default:
                    return false;
                    break;
                }
            }
        }

    render() {
        let result = ``;

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                if (col !== 0) {
                    result += DELIMITER; // result = result + DELIMITER
                }

                result += this.board[col + row*3];
            }

            if (row !== 2) {
                result += '\n--|---|--\n';
            }
        }

        console.log( result );
    }
}

const game = new CrossGame();

console.dir( CrossGame );
console.log( game );

game.render(); // this = game
game.step(0); // this = game
game.step(4); // error
game.step(1);
game.step(6);
game.step(2);

console.log( game );
