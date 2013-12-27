var Life = Life || {};

Life.Organism = function(options){

    this.position = {x: options.position.x, y: options.position.y};
    this.age = (typeof options.age === "number" && options.age > -1) ? options.age : -1;
    this.neighbors = {};
}

Life.Organism.prototype = ( function(){

    var isAlive= function(){
        return this.age > -1;
    };

    var getPosition = function(){
        return this.position;
    };

    var addNeighbor = function(org){

        var pos = org.getPosition();
        this.neighbors["pos" + pos.x + "_" + pos.y] = org;

        return this;
    };

    var getNeighbors = function(){

        return this.neighbors;
    };

    var getAge = function(){
        return this.age;
    };

    var cycle = function(){

        this.age += 1;
        return this;
    };

    var kill = function(){

        this.age =-1;
        return this;
    };

    var cycleState = function(keepAlive){

        if (keepAlive){
            cycle.call(this);
        }
        else{
            kill.call(this);
        }
    };

    return {
        isAlive: isAlive,
        getPosition: getPosition,
        addNeighbor: addNeighbor,
        getNeighbors: getNeighbors,
        getAge: getAge,
        cycleState: cycleState
    };
})();