const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board = new Board();
    const humanPlayer = new HumanPlayer(board);
    const computerPlayer = new ComputerPlayer(board);
    let turn = 0;
    this.start = function () {
        const config = { childList: true };
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }
    function takeTurn() {
        //console.log("somthing change")
        if (board.checkForWinner()) {
            return;
        }
        if (turn % 2 === 0) {
            humanPlayer.takeTurn();
        } else {
            computerPlayer.takeTurn();
        }
        turn++;
    }
}

function Board() {
    this.positions = Array.from(document.querySelectorAll('.col'));
    //console.log(this.positions)
    let winner = false;
    this.checkForWinner = function () {
        const winingCombinantions =[
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
            ];

    const position = this.positions;
    winingCombinantions.forEach((winingcombo)=>{
        const post0InnerText = this.positions[winingcombo[0]].innerText;
        const post1InnerText = this.positions[winingcombo[1]].innerText;
        const post2InnerText = this.positions[winingcombo[2]].innerText;
        const isWningCombo = post0InnerText != ''&&
        post0InnerText === post1InnerText &&
         post1InnerText === post2InnerText;
         if(isWningCombo){
             winner =true;
             winingcombo.forEach((index)=>{
                 this.positions[index].className+= 'winner';
             })
         }
    })
  return winner;
    }
}
function HumanPlayer(board) {
    this.takeTurn = function () {
        // console.log("Human player turn")
        board.positions
            .forEach(el => el.addEventListener('click', handleTurnTaken))
    }
    function handleTurnTaken() {
        //console.log("turn taken")
        event.target.innerText = 'X';
        board.positions.
            forEach(el => el.removeEventListener('click', handleTurnTaken));

    }
}

function ComputerPlayer(board) {
    this.takeTurn = function () {
        // console.log("computer player turn")
        const availablePositions =
            board.positions.filter((p) => p.innerText === '');
        // console.log(availablePositions)
        const move = Math.floor(Math.random() * availablePositions.length);
        availablePositions[move].innerText = 'O'
    }
}