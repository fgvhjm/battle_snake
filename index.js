// Welcome to
// __________         __    __  .__                               __
// \______   \_____ _/  |__/  |_|  |   ____   ______ ____ _____  |  | __ ____
//  |    |  _/\__  \\   __\   __\  | _/ __ \ /  ___//    \\__  \ |  |/ // __ \
//  |    |   \ / __ \|  |  |  | |  |_\  ___/ \___ \|   |  \/ __ \|    <\  ___/
//  |________/(______/__|  |__| |____/\_____>______>___|__(______/__|__\\_____>
//
// This file can be a nice home for your Battlesnake logic and helper functions.
//
// To get you started we've included code to prevent your Battlesnake from moving backwards.
// For more info see docs.battlesnake.com

import runServer from './server.js';

// info is called when you create your Battlesnake on play.battlesnake.com
// and controls your Battlesnake's appearance
// TIP: If you open your Battlesnake URL in a browser you should see this data
function info() {
  console.log("INFO");

  return {
    apiversion: "1",
    author: "",       // TODO: Your Battlesnake Username
    color: "blue", // TODO: Choose color
    head: "bonhomme",  // TODO: Choose head
    tail: "default",  // TODO: Choose tail
  };
}

// start is called when your Battlesnake begins a game
function start(gameState) {
  console.log("GAME START");
}

// end is called when your Battlesnake finishes a game
function end(gameState) {
 
}

// move is called on every turn and returns your next move
// Valid moves are "up", "down", "left", or "right"
// See https://docs.battlesnake.com/api/example-move for available data
function move(gameState) {
 
  let isMoveSafe = {
    up: true,
    down: true,
    left: true,
    right: true
  };

  // We've included code to prevent your Battlesnake from moving backwards
  let myHead = gameState.you.body[0];
  let myNeck = gameState.you.body[1];
  let boardWidth=gameState.board.width;
  let boardHeight=gameState.board.height;

  // if ((myNeck.x < myHead.x)||myHead.x==0) {        // Neck is left of head, don't move left
  //   isMoveSafe.left = false;

  // }  if ((myNeck.x > myHead.x)||myHead.x==boardWidth-1) { // Neck is right of head, don't move right
  //   isMoveSafe.right = false;

  // }  if ((myNeck.y < myHead.y)||myHead.y==0) { // Neck is below head, don't move down
  //   isMoveSafe.down = false;

  // }  if ((myNeck.y > myHead.y)||myHead.y==boardHeight-1) { // Neck is above head, don't move up
  //   isMoveSafe.up = false;
  // }

  // TODO: Step 1 - Prevent your Battlesnake from moving out of bounds
  // boardWidth = gameState.board.width;
  // boardHeight = gameState.board.height;

  if(myHead.x==boardWidth-1){
    isMoveSafe.right=false;
  }
  if(myHead.x==0){
    isMoveSafe.left=false;
  }
  if(myHead.y==boardHeight-1){
    isMoveSafe.up=false;
  }
  if(myHead.y==0){
    isMoveSafe.down=false;
  }
  
  

  // TODO: Step 2 - Prevent your Battlesnake from colliding with itself
  // myBody = gameState.you.body;
  let myBody=gameState.you.body;
 
    let r=myHead.x+1;
    let l=myHead.x-1;
    let u=myHead.y+1;
    let d=myHead.y-1;
    
    for(let i=1;i<myBody.length;i++){
     if(r==myBody[i].x&&myBody[i].y==myHead.y){
      isMoveSafe.right=false;
     }
     if(l==myBody[i].x&&myBody[i].y==myHead.y){
      isMoveSafe.left=false;
     }
     if(u==myBody[i].y&&myBody[i].x==myHead.x){
      isMoveSafe.up=false;
     }
     if(d==myBody[i].y&&myBody[i].x==myHead.x){
      isMoveSafe.down=false;
     }
    }
    // console.log(isMoveSafe);

  // TODO: Step 3 - Prevent your Battlesnake from colliding with other Battlesnakes
  // opponents = gameState.board.snakes;

  // Are there any safe moves left?
  const safeMoves = Object.keys(isMoveSafe).filter(key => isMoveSafe[key]);
  if (safeMoves.length == 0) {
    console.log(`MOVE ${gameState.turn}: No safe moves detected! Moving down`);
    return { move: "down" };
  }

  // Choose a random move from the safe moves
  const nextMove = safeMoves[Math.floor(Math.random() * safeMoves.length)];

  // TODO: Step 4 - Move towards food instead of random, to regain health and survive longer
  // food = gameState.board.food;

  console.log(`MOVE ${gameState.turn}: ${nextMove}`)
  return { move: nextMove };
}

runServer({
  info: info,
  start: start,
  move: move,
  end: end
});
