var Life = Life || {};

Life.BoardUiHelper = function (options) {

    this.container = options.container;
    this.size = options.size;
    this.indexSize = this.size - 1;
    this.tableElement = null;

    this.helper = new Life.BoardHelper({size: options.size});
};

Life.BoardUiHelper.prototype = (function () {

    var drawBoardUi = function (callback) {

        var i = 0, j = 0, pos, tds;
        var table = $("<table/>");
        var rows = "";
        var isAlive = false;

        for (; i < this.size; i++) {

            rows += "<tr class=\"game-row\">";
            tds = "";

            for (j = 0; j < this.size; j++) {

                pos = {x: j, y: i};

                isAlive = false;

                if (callback) {
                    isAlive = callback(pos);
                }

                tds += "<td class=\"game-cell " + this.helper.getPositionId(pos) + (isAlive ? " cell-alive" : "") + " \" data-posX=\"" + j + "\" data-posY=\"" + i + "\" />";
            }

            rows += tds + "</tr>";
        }

        clearBoardUi.call(this);

        this.tableElement = table.append(rows);

        this.container.append(table);
    };

    var drawBoardUiWithOrgs = function(orgs){

        var helper = this.helper;

        drawBoardUi.call(this, function(pos){

            var org = orgs[helper.getPositionId(pos)];

            return org.isAlive();
        });
    };

    var clearBoardUi = function () {

        this.container.empty();

        if (this.tableElement) {
            this.tableElement = null;
        }
    };

    return {
        drawBoardUi: drawBoardUi,
        clearBoardUi: clearBoardUi,
        drawBoardUiWithOrgs: drawBoardUiWithOrgs
    };
})();