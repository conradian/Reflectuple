//---------------------------------Preliminaries--------------------------------
//Width and height of canvas
var w = window.innerWidth;
var h = window.innerHeight;

//width and height of a cell
var cellx = 50;
var celly = 50;

//How many cells there are horizontally and vertically
var cellNumbx = 9;
var cellNumby = 9;

//Where the grid starts and ends (horizontally)
var xgridstart = w*0.22;
var xgridend = xgridstart+cellNumbx*cellx;

//Where the grid starts and ends (vertically)
var ygridstart = h*0.3;
var ygridend = ygridstart+cellNumby*celly;

//Array with all of the colors
var colors = ["#9D2C38","#E43D46","#FB912F","#FFE662","#63C44E","#357347","#1F3F41","#30E7F4","#0C83D0"];

//Variable that stores the currently selected cell for later swapping
//-1 is the default meaning nothing has been selected
var tempSelect = -1;

//Grid that stores all of the data regarding whether there is an event or not
var grid = new Array(cellNumby);
for(i = 0; i < cellNumby; i++)
{
  grid[i] = new Array(cellNumbx);
  for(j = 0; j<grid[0].length; j++)
  {
    grid[i][j] = colors[i];
  }
}
console.log(grid);

//Setup
function setup()
{

}

//Runs multiple times a second - program loop
function draw()
{
  //-----------------------------Drawing Essentials-----------------------------
  //Setup
  createCanvas(windowWidth, windowHeight);
  background("#3C4666");
  textFont("Verdana");
  fill("#FFFFFF");

  //----------------------------------Drawing-----------------------------------
  //Draw horizontal lines
  for(i = 0; i < cellNumby+1;i++)
  {
  	line(xgridstart,ygridstart+i*celly,xgridend,ygridstart+i*celly);
  }

  //Draw vertical lines
  for(i = 0; i < cellNumbx+1; i++)
  {
  	line(xgridstart+i*cellx,ygridstart,xgridstart+i*cellx,ygridend);
  }

  //Draw the squares
  for(i = 0; i < grid[0].length; i++)
  {
  	for(j = 0; j<grid.length; j++)
  	{
      fill(grid[j][i]);
			rect(xgridstart+cellx*i,ygridstart+j*celly,cellx,celly);

  	}
  }

}

//------------------------------------Functions---------------------------------

//Changes the value in the grid i.e. if there's an event take it away, if not put one
function mousePressed()
{
  //Add to the grid
  var gridx = Math.floor((mouseX-xgridstart)/cellx);
  var gridy = Math.floor((mouseY-ygridstart)/celly);

  if( (0 < gridx < cellNumbx) && (0 < gridy < cellNumby))
  {
    if(tempSelect == -1)
    {
      tempSelect = [gridx,gridy];
    }
    else
    {
      swap(grid, tempSelect, [gridx, gridy]);
      tempSelect = -1;
    }
  }
}

//Clamps n between a and b
function clamp(n, a, b)
{
  if(n < a)
  {
    return(a);
  }

  if(n > b)
  {
    return(b);
  }

  return(n);
}

//Carries out the swapping operation
function swap(array, coorA, coorB)
{
  var array = [];
  if(coorA[0] == coorB[0])
  {
    for(i = 0; i < abs(coorA[1] - coorB[1]) + 1; i++)
    {
      array.push(grid[coorA[1]+i][coorA[0]]);
    }

    array.reverse();

    for(i = 0; i < abs(coorA[1] - coorB[1]) + 1; i++)
    {
      grid[coorA[1]+i][coorA[0]] = array[i];
    }

  }
  else if(coorA[1] == coorB[1])
  {
    for(i = 0; i < abs(coorA[0] - coorB[0]) + 1; i++)
    {
      array.push(grid[coorA[1]][coorA[0]+i]);
    }

    array.reverse();

    for(i = 0; i < abs(coorA[0] - coorB[0]) + 1; i++)
    {
      grid[coorA[1]][coorA[0]+i] = array[i];
    }
  }
}
