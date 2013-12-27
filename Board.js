var Life = Life || {};

Life.Board = function(options){

    this.size = options.size;
    this.organisms = {}
    this.helper = new Life.BoardHelper({size: options.size});
    this.uiHelper = new Life.BoardUiHelper({size: options.size, container: options.container});

    this.cycleCount = 0;
};

Life.Board.prototype = (function(){

    var create = function(){

        var c= this;

        reset.call(this);

        this.uiHelper.drawBoardUi(function(pos){
            var org = createOrganism.call(c,pos);
            var id = c.helper.getPositionId(pos);

            c.organisms[id] = org;

            return org.isAlive();
        });

        setupNeighbors.call(this);
    };

    var setupNeighbors = function(){

        var org, pos;

        for (var key in this.organisms){

            org = this.organisms[key];

            setOrgNeighbors.call(this,org);
        }
    };

    var setOrgNeighbors = function(org){

        var pos = org.getPosition();
        var x = pos.x- 1, y = pos.y-1;
        var xEnd = x+ 3, yEnd = y+3;
        var i= y, j, neighbor, neighborPosition;

        for(;i<yEnd; i++){
            for (j=x; j<xEnd; j++){

                neighborPosition = {x: j, y:i};

                if (this.helper.isValidPosition(neighborPosition)){
                    if (!this.helper.isSamePosition(pos, neighborPosition)){

                        neighbor = getOrganism.call(this, neighborPosition);
                        org.addNeighbor(neighbor);
                    }
                }
            }
        }
    };

    var createOrganism = function(pos){

        var isAlive = this.helper.getRandomBool();

        var age = isAlive ? 0 : -1;

        var org = new Life.Organism({age: age, position: pos});

        return org;
    };

    var getOrganism = function(pos){

        return this.organisms[this.helper.getPositionId(pos)];
    };

    var cycle = function(){

        var org, lifeState;

        for (var key in this.organisms){

            org = this.organisms[key];
            lifeState =this.helper.getLifeState(org);

            org.cycleState(lifeState);
        }

        this.uiHelper.drawBoardUiWithOrgs(this.organisms); //redraw the entire table with the new organisms states

        this.cycleCount += 1;
    };

    var getCycleCount = function(){
        return this.cycleCount;
    };

    var getOldestOrganismAge = function(){

        var oldest = -1, age = -1;

        for (var key in this.organisms){
            age =this.organisms[key].getAge();
            oldest = age>oldest ? age : oldest;
        }

        return oldest;
    };

    var reset = function(){

        this.uiHelper.clearBoardUi();
        this.organisms = {};
        this.cycleCount = 0;
    };

    return {
        create: create,
        cycle: cycle,
        getCycleCount: getCycleCount,
        getOldestOrganismAge: getOldestOrganismAge
    };
})();