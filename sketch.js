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
var xgridstart = w*0.1;
var xgridend = xgridstart+cellNumbx*cellx;

//Where the grid starts and ends (vertically)
var ygridstart = h*0.2;
var ygridend = ygridstart+cellNumby*celly;

//Array with all of the colors
var colors = ["#9D2C38","#E43D46","#FB912F","#FFE662","#63C44E","#357347","#1F3F41","#30E7F4","#0C83D0"];

//Variable that stores the currently selected cell for later swapping
//-1 is the default meaning nothing has been selected
var tempSelect = -1;

//Grid that stores all of the cell colors
var grid = new Array(cellNumby);
for(i = 0; i < cellNumby; i++)
{
  grid[i] = new Array(cellNumbx);
  for(j = 0; j<grid[0].length; j++)
  {
    grid[i][j] = colors[i];
  }
}

//-----------------------------------Stats--------------------------------------

//Score variables
var moves = 0;
var time = 0;
var timeAtStart;

//Setup
function setup()
{
  //Button that runs scramble function (easy)
  scrambleBtEasy = createButton("Easy Scramble");
  scrambleBtEasy.class("button");
  scrambleBtEasy.position(w*0.1, h*0.8+scrambleBtEasy.height*0.5-2);
  scrambleBtEasy.mousePressed(scrambleEasy);

  //Button that runs scramble function (normal)
  scrambleBtNormal = createButton("Normal Scramble");
  scrambleBtNormal.class("button");
  scrambleBtNormal.position(w*0.2, h*0.8+scrambleBtNormal.height*0.5-2);
  scrambleBtNormal.mousePressed(scrambleNormal);

  //Button that runs scramble function (hard)
  scrambleBtHard = createButton("Hard Scramble");
  scrambleBtHard.class("button");
  scrambleBtHard.position(w*0.315, h*0.8+scrambleBtHard.height*0.5-2);
  scrambleBtHard.mousePressed(scrambleHard);

  //Button that resets grid
  scrambleBtHard = createButton("Reset");
  scrambleBtHard.class("reset");
  scrambleBtHard.position(w*0.225, h*0.87+scrambleBtHard.height*0.5-2);
  scrambleBtHard.mousePressed(reset);

}

//Runs multiple times a second - program loop
function draw()
{
  //-----------------------------Drawing Essentials-----------------------------
  //Setup
  createCanvas(windowWidth, windowHeight);
  background("#3C4666");
  textFont("Helvetica");
  fill("#c0cbdc");

  //-----------------------------Drawing text-----------------------------------

  //Drawing heading
   textSize(52);
   text("Reflectuple",w*0.1,h*0.15);

   //Drawing answer key
   textSize(17);
   text("Answer", xgridend + cellx*1.98, ygridstart - 3);

  //-----------------------------Drawing Grid-----------------------------------
  //Draw horizontal lines
  for(i = 0; i < cellNumby+1; i++)
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

  //----------------------------Drawing Answer Key------------------------------
  //Draw horizontal lines
  for(i = 0; i < cellNumby + 1; i++)
  {
  	line(xgridend + cellx*2,ygridstart+i*celly,xgridend + cellx*3,ygridstart+i*celly);
  }

  //Draw vertical lines
  for(i = 0; i < 2; i++)
  {
  	line(xgridend + cellx*2 + i*cellx, ygridstart, xgridend + cellx*2 + i*cellx, ygridend);
  }

  //Filling in the squares
  for(i = 0; i < colors.length; i++)
  {
    fill(colors[i]);
    rect(xgridend + cellx*2,ygridstart+i*celly,cellx,celly);
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
      mirror(grid, tempSelect, [gridx, gridy]);
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

//Carries out the mirroring operation
function mirror(array, coorA, coorB)
{

  //All temporary manipulation will be handled in this array (reflection).
  var array = [];

  if(coorA[0] == coorB[0])
  {
    //Since this function only works when you select the left/topmost cell at
    //First, if this isn't the case then swap them.
    if( (coorB[1] < coorA[1]) )
    {
      var temp = coorB[1];
      coorB[1] = coorA[1];
      coorA[1] = temp;
    }

    for(i = 0; i < abs(coorA[1] - coorB[1]) + 1; i++)
    {
      array.push(grid[coorA[1]+i][coorA[0]]);
    }

    array.reverse();

    for(i = 0; i < Math.abs(coorA[1] - coorB[1]) + 1; i++)
    {
      grid[coorA[1]+i][coorA[0]] = array[i];
    }

  }
  else if(coorA[1] == coorB[1])
  {
    //Since this function only works when you select the left/topmost cell at
    //First, if this isn't the case then swap them.
    if( (coorB[0] < coorA[0]) )
    {
      var temp = coorB[0];
      coorB[0] = coorA[0];
      coorA[0] = temp;
    }

    for(i = 0; i < Math.abs(coorA[0] - coorB[0]) + 1; i++)
    {
      array.push(grid[coorA[1]][coorA[0]+i]);
    }

    array.reverse();

    for(i = 0; i < Math.abs(coorA[0] - coorB[0]) + 1; i++)
    {
      grid[coorA[1]][coorA[0]+i] = array[i];
    }
  }
}


//Scrambles the reflectuple
function scrambleEasy()
{
  var array = grid;

  for(i = 0; i < 20; i++)
  {
    mirror(array, [randomRange(0,cellNumbx-1),randomRange(0,cellNumby-1)], [randomRange(0,cellNumbx-1),randomRange(0,cellNumby-1)]);
  }

}

function scrambleNormal()
{
  var array = grid;

  for(i = 0; i < 30; i++)
  {
    mirror(array, [randomRange(0,cellNumbx-1),randomRange(0,cellNumby-1)], [randomRange(0,cellNumbx-1),randomRange(0,cellNumby-1)]);
  }

}

function scrambleHard()
{
  var array = grid;

  for(i = 0; i < 60; i++)
  {
    mirror(array, [randomRange(0,cellNumbx-1),randomRange(0,cellNumby-1)], [randomRange(0,cellNumbx-1),randomRange(0,cellNumby-1)]);
  }

}

function reset()
{
  location.reload();
}

//Random range function
//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
function randomRange(min, max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
