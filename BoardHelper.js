var Life = Life || {};

Life.BoardHelper = function (options) {

    this.size = options.size;
    this.indexSize = this.size - 1;
};

Life.BoardHelper.prototype = (function () {

    var isValidPosition = function (position) {

        return position.x > -1 && position.x <= this.indexSize
            && position.y > -1 && position.y <= this.indexSize;
    };

    var isSamePositionOrgs = function (org1, org2) {

        var pos1 = org1.getPosition();
        var pos2 = org2.getPosition();

        return isSamePosition(pos1, pos2);
    };

    var isSamePosition = function (pos1, pos2) {
        return pos1.x === pos2.x && pos1.y === pos2.y;
    };

    /**     From Wikipedia:
     Any live cell with fewer than two live neighbours dies, as if caused by under-population.
     Any live cell with two or three live neighbours lives on to the next generation.
     Any live cell with more than three live neighbours dies, as if by overcrowding.
     Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
     **/
    var getLifeState = function (org) {

        var livingNeighbors = countLivingNeighbors(org);
        var isAlive = org.isAlive();
        var lifeValue = (isAlive ? 1 : 0) + livingNeighbors;

        var lifeState = lifeValue === 3 || (isAlive && lifeValue === 4)

        return lifeState;
    };

    var countLivingNeighbors = function (org) {

        var neighbors = org.getNeighbors();
        var nbor;
        var living = 0;

        for (var key in neighbors) {

            nbor = neighbors[key];

            living = nbor.isAlive() ? living + 1 : living;
        }

        return living;
    };

    var getPositionId = function(pos){

        return "pos" + pos.x + "_" + pos.y;
    };

    var getRandomBool=  function(){
        return (Math.round(Math.random()*10)%2) === 0;
    };

    return{
        isValidPosition: isValidPosition,
        isSamePosition: isSamePosition,
        isSamePositionOrgs: isSamePositionOrgs,
        getLifeState: getLifeState,
        getPositionId: getPositionId,
        getRandomBool: getRandomBool
    }
})();