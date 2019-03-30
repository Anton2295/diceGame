
class TypeOfCell
{
	constructor(name, style, close)
	{
		this.name = name;
		this.style = style;
		this.close = close;
	}
}


var freeCell = new TypeOfCell('пол', 'tile', false); 
var tree = new TypeOfCell('дерево', 'cell', true); 


class GameMap
		{ 
			constructor(width, height)
			{
				this.width = width;
				this.height = height;
				
				this.isPlayerContrоl = false;
				
				this.entitys = new Array();
				
				this.cells = new Array();
				
				for(let i =0; i< this.width;i++)
				{
					this.cells[i] = new Array();
					for(let j =0 ;j < this.height; j++)
					{
						this.cells[i][j] = new Cell(freeCell);
					}
				}
				
				for(let n =0; n< this.width + this.height;n++)
				{
					let i = Math.round(Math.random() * (WidthMap - 1));
					let j = Math.round(Math.random() * (HeightMap - 1));
					
					this.cells[i][j] = new Cell(tree);
				}
				
				for(let n = 0; n < 5;n++)
				{
		
					var finshEntity = new Entity('finish');
					
					finshEntity.shortDescription = 'Нейтральное существо';
			
					finshEntity.isPlayerContrоl = false;
			
					{
						let x = Math.round(Math.random() * (this.width - 1));
						let y = Math.round(Math.random() * (this.height - 1));
				
						this.addEntity(finshEntity , new Point(x,y));
					}
				}
		

			}
			
			
			getGraph()
			{
			var graf = new Array();
			
			for(var i =0; i< this.width;i++)
			{
				graf[i] = new Array();
				for(var j =0 ;j < this.height; j++)
				{
					if(this.cells[i][j].isClose() == false)graf[i][j] = 1;
					else graf[i][j] = 0;
				}
			}
			
			return graf;
			}
			
			
			addEntity(entity,point)
			{
				entity.gameMap = this;
				entity.Point = point;
				
				this.entitys[this.entitys.length] = entity;		
			}
		}
		
		
		class Point
		{
			constructor(x,y)
			{	
				this.x = x;
				this.y = y;
			}
		}
		

		class Cell
		{
			constructor(typeOfCell)
			{
				this.entity = null;
				this.typeOfCell = typeOfCell;
				this.style = typeOfCell.style;
				this.close = typeOfCell.close;
			}

			isClose()
			{
				if(this.close == false && this.entity == null)
					return false;
				else
					return true;
			}
			
			getDescription()
			{
				if(this.entity != null)
					return this.entity.shortDescription;
				else
					return this.typeOfCell.name;
			}
		}
		
		
		
		
		