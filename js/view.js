	var STANDART_MODE = 0;
	var SELECT_POINT_MODE = 1;
	var SELECT_PATH_MODE = 2;
	

	
	var NORTH = 0;
	var EAST = 1;
	var SOUTH = 2;
	var WEST = 3;
	
	var tileStepWidth = 30;
	var tileStepHeight = 30;
	
	var lible;
	
	function getPath(rezult)
	{
		// Добавление направления движения
		let path = new Array();
		for(let n=0;n < rezult.length;n++)
		{			
			let side;
			
			if( n < rezult.length - 1)
			{				
				if(rezult[n].y - 1 ==  rezult[n + 1].y)
					side = NORTH;
				if(rezult[n].x + 1 ==  rezult[n + 1].x)
					side = EAST;
				if(rezult[n].y + 1 ==  rezult[n + 1].y)
					side = SOUTH;
				if(rezult[n].x - 1 ==  rezult[n + 1].x)
					side = WEST;
			}
			rezult[n].side = side;
		}
		
		return rezult;
	}
	

	
	
	class View 
		{ 
			constructor(gameMap)
			{	 
				this.gameMap = gameMap
				this.stageOfView = STANDART_MODE;
				
				this.startSelectPathEntity = null;
				this._tempPath = null;
				this.SelectPath = null;
				
				this.stageDiv  = document.getElementsByClassName('stage')[0];
				
				this.arreyDivs = null;
				
				
				
				this.stageDiv.onmousemove = function (event)
				{
					view.onMouseMove(event);// Разобраться  с передачей параметров 
				}
				
				this.stageDiv.onclick = function (event) 
				{
					 view.onClick(event);
				}
			}

					
			refresh()
			{
				var tileWidth = 29;
				var tiltHeight = 29;
				
				
				var WidthMap = gameMap.cells.length;
				var HeightMap = gameMap.cells[0].length;
								
				
					
				if(this.arreyDivs == null)
				{
				//	stageDiv.innerHTML ='';
					
					this.stageDiv.style.width = WidthMap * tileStepWidth;
					this.stageDiv.style.height = HeightMap * tileStepHeight;
								
					document.body.appendChild(this.stageDiv);
				
					this.arreyDivs = new Array();
					for(var i =0;i < WidthMap;i++)
					{
						this.arreyDivs[i] = new Array();
						for(var j =0;j < HeightMap;j++)
						{
							var div = document.createElement('div');
							this.arreyDivs[i][j] = div;
																					
							div.style.position = 'absolute';
							
							div.style.left = i * tileStepWidth;
							div.style.top = j * tileStepHeight;
							
							div.style.width = tileWidth;
							div.style.height = tiltHeight;
							
							this.stageDiv.appendChild(div);
							
						}
						
							lible = document.createElement('em');
																					
							lible.style.position = 'absolute';
							
							lible.style.left = 0;
							lible.style.top = (HeightMap) * tileStepHeight;
							this.stageDiv.appendChild(lible);
					}
				}
				
				
				for(let i =0;i < WidthMap;i++)
				{
					for(let j =0;j < HeightMap;j++)
					{
						this.arreyDivs[i][j].className = this.gameMap.cells[i][j].style;	

						if(this.gameMap.cells[i][j].entity != null)
						{
							this.arreyDivs[i][j].className = this.gameMap.cells[i][j].entity.style;
						}
					}
				}
			
				
			}
			
			editDiv(x,y,style)
			{			
				this.arreyDivs[x][y].className = style;
			}
			
			onMouseMove(event)
			{
				var x = Math.trunc((event.clientX   - this.stageDiv.getBoundingClientRect().left) / tileStepWidth) ;
				var y = Math.trunc((event.clientY   - this.stageDiv.getBoundingClientRect().top )/ tileStepHeight);
				
				lible.innerHTML = gameMap.cells[x][y].getDescription();
				
				if(false)
				{
					//Что-то нужно сделать с объектами. Возможно перенисти на отдельный слой.
					view.editDiv(x,y,'finish');
				}
				
				if(this.stageOfView == SELECT_PATH_MODE)
				{
					if(view.startSelectPathEntity != null)
						{
						var matrix = gameMap.getGraph();
						
						let startPoint = view.startSelectPathEntity.Point;
						
						matrix[startPoint.x][startPoint.y] = 0
										
						
						var graph = new Graph(matrix);
						
						var start = graph.grid[startPoint.x][startPoint.y];
						var end = graph.grid[x][y];
						
						var result = astar.search(graph, start, end);
						
						var path = getPath(result); 
						
						view.refresh();
						
						let AP = this.startSelectPathEntity.AP;
						
						for(var n=0;n < path.length;n++)
						{	
							AP--;
							if(AP >= 0)
							{
								switch(path[n].side)
								{
									case(NORTH):
										this.editDiv(path[n].x,path[n].y,'tile path up');
										break;
									case(EAST):
										this.editDiv(path[n].x,path[n].y,'tile path right');
										break;
									case(SOUTH):
										this.editDiv(path[n].x,path[n].y,'tile path down');
										break;
									case(WEST):
										this.editDiv(path[n].x,path[n].y,'tile path left');
										break;
								}								
								
							}
							else
							{
								switch(path[n].side)
								{
									case(NORTH):
										this.editDiv(path[n].x,path[n].y,'tile path up2');
										break;
									case(EAST):
										this.editDiv(path[n].x,path[n].y,'tile path right2');
										break;
									case(SOUTH):
										this.editDiv(path[n].x,path[n].y,'tile path down2');
										break;
									case(WEST):
										this.editDiv(path[n].x,path[n].y,'tile path left2');
										break;
								}
							}
							
						}
						
						this.tempSelectPath = path;// Перевести в свой тип


					}

				}				
			}
			
			onClick(event) 
			{
				var x = Math.trunc((event.clientX   - this.stageDiv.getBoundingClientRect().left) / tileStepWidth) ;
				var y = Math.trunc((event.clientY   - this.stageDiv.getBoundingClientRect().top )/ tileStepHeight);
				
				/*
				let entity = new Entity('finish');			
				gameMap.addEntity(entity, new Point(x,y));
				view.refresh();
				*/
				
				if(this.stageOfView == SELECT_PATH_MODE)
				{
					this.selectPath = this.tempSelectPath.slice();
					this.tempSelectPath = null;
				}
				
			}
			
			getSelectPath(startSelectPathEntity)
			{
					this.stageOfView = SELECT_PATH_MODE;
					this.startSelectPathEntity = startSelectPathEntity;
					

					
					if(this.selectPath != null && this.selectPath.length > 0)
					{
						this.stageOfView = STANDART_MODE;
						
						let path = this.selectPath.slice();
						
						this.selectPath = null;
					
						return path;
					}
					else 
					{
						return null;
					}
			}
			
		}	

				
	
		
		
		
		
		
		
		
		
		
		
		
		
		