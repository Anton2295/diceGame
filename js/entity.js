class Entity {
	constructor(style) {
		this.style = style;

		this.moveList = null;

		this.stepState = GT;

		this.maxAP = 6;
		this.AP = this.maxAP;

		this.gameMap = null;


		this.shortDescription = "Без описания";
	}

	get Point() {
		return this.point;
	}

	set Point(value) {
		if (this.point != undefined) {
			this.gameMap.cells[this.point.x][this.point.y].entity = null;
		}

		this.gameMap.cells[value.x][value.y].entity = this;
		this.point = value;
	}


	make(point) {

					this.Point = point;
					this.AP--;
	}

	endMove(){
		this.AP = this.maxAP;
		this.stepState = GT;
	}

	findMoveList() {
		// Расчет действий на ход

		if (this.isPlayerContrоl) {
			let moveList = view.getSelectPath(this);

			if (moveList != null && moveList.length > 0) {

				this.moveList = moveList;
				this.stepState = PRESREP;
			}
		}
		else {
			//Прописать для ИИ
			var matrix = this.gameMap.getGraph();

			var graph = new Graph(matrix);

			var start = graph.grid[this.point.x][this.point.y];

			do {
				var x = Math.round(Math.random() * (this.gameMap.width - 1));
				var y = Math.round(Math.random() * (this.gameMap.height - 1));
			}
			while (this.gameMap.cells[x][y].isClose() == true);



			var end = graph.grid[x][y];

			var result = astar.search(graph, start, end);
			//Возможно следует заменить на менее ресурсозатратный алгоритм поиска пути

			this.moveList = result;

			this.stepState = PRESREP;
		}
	}


}


function getActionList(pointList, gameMap)
{
	let actionList = new Array();

	for(let n = 0;n < pointList.length;n++)
	{
		let point = pointList[n];

		if(gameMap.cells[point.x][point.y].isClose == false)
		{
			actionList[n] = new Action(MOVE,point)
		}
		else
		{
			//дописать атаку или использование
			// или еще что-то как-то ¯\_(ツ)_/¯
		}
	}
	
}

var MOVE = 0;
var ATTACK = 1;
var USE = 2;

class Action {
	constructor(typeAction, point) {
		this.typeAction = typeAction;
		this.point = point;

		if(this.typeAction == MOVE)
		this.cost = 0;
	}
}
