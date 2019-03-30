
var GT = 0;
var PRESREP = 1;
var STEP = 2;
var END_MOVE = 3;


class Game {
	constructor(gameMap) {
		this.gameMap = gameMap;
	}

	run() {
		setInterval(this.gameStep, interval);
	}

	gameStep() {
		var moveEntity = gameMap.entitys[namberEntityToMove];


		switch (moveEntity.stepState) {
			case (GT):
				{
					moveEntity.findMoveList();
				} break;
			case (PRESREP):
				{
					
					var movePoint = moveEntity.moveList[0];					
					moveEntity.moveList.shift();

					moveEntity.make(movePoint);

					view.refresh();// Для отображения анимации хода

					if (moveEntity.moveList.length == 0 && moveEntity.AP > 0) {
						//Если еще остались очки действий, то заплапнировать еще что-то
						moveEntity.stepState = GT;
					}

					if (moveEntity.AP == 0) {
						moveEntity.stepState = END_MOVE;
					}
				} break;
			case (END_MOVE):
				{
					moveEntity.endMove();

					//Выбор следующей сущности
					namberEntityToMove++;

					if (namberEntityToMove >= gameMap.entitys.length) namberEntityToMove = 0;

				} break;
		}



	}
}