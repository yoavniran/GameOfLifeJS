var board;

(function(){

    var boardSize = 50;
    var counter, gameHandler = -1;

    function initialize(){

        var container = $("#gameContainer").empty();
        counter = $("#gameCycles");

        board = new Life.Board({size: boardSize, container: container});

        board.create();

        $("#btnStart").on("click", function(){
            startGame();
            return false;
        });

        $("#btnStop").on("click", function(){
            stopGame();
            return false;
        });

        $("#btnReset").on("click", function(){
            resetBoard();
            return false;
        });
    }

    function startGame(){

        gameHandler = setInterval(function(){
            board.cycle();
            updateCycleCounter();
        }  ,400);
    };

    function stopGame(){

        if (gameHandler > -1){
            clearInterval(gameHandler);
            gameHandler = -1;
        }
    };

    function resetBoard(){

        stopGame();
        board.create();
        updateCycleCounter();
    };

    function updateCycleCounter(){
        counter.text(board.getCycleCount());
    };

    initialize();
})();