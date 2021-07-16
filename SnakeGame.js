function init(){
    var canvas = document.getElementById("bg");
    W = canvas.width = 1300;
    H = canvas.height = 700;
    block = canvas.getContext('2d');
    cellSize = 40;
    GameOver = false;
    food = getRandomFood();
    score = 5;
    
    food_img = new Image();
    food_img.src = "pics/apple.png";

    snake_img = new Image();
    snake_img.src = "pics/s6.png";

    trophy = new Image();
    trophy.src = "pics/trophy.png";

    snake = {
        len : 5,
        color : "darkorange",
        cells : [],
        direction : "right",
        createSnake : function(){
            for (var i = this.len; i > 0; i --){
            this.cells.push({x : i, y : 0});
            }
        },

        drawSnake : function(){ 
            for (var i = 0; i < this.cells.length; i ++){
              //block.fillStyle = this.color;
             // block.fillRect(this.cells[i].x * cellSize, this.cells[i].y * cellSize, cellSize - 2, cellSize - 2);
              block.drawImage(snake_img, this.cells[i].x * cellSize, this.cells[i].y * cellSize, cellSize - 2, cellSize - 2);
            }

        },
        updateSnake : function(){
            
             var X = this.cells[0].x;
             var Y = this.cells[0].y;
             
             if (X == food.x && Y == food.y){
                 food = getRandomFood();
                 score ++;
             }
             else{
                this.cells.pop();
             }
             var nx, ny;
             
             if (this.direction == "right"){
                 nx = X + 1;
                 ny = Y;
             }
             else if (this.direction == "left"){
                 nx = X - 1;
                 ny = Y;
             }
             else if (this.direction == "up"){
                 nx = X;
                 ny = Y - 1;
             }
             else if (this.direction == "down"){
                 nx = X;
                 ny = Y + 1;
             }

             this.cells.unshift({x : nx, y: ny});
              
             var last_x = Math.round(W / cellSize);
             var last_y = Math.round(H / cellSize);

             if (this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x > last_x || this.cells[0].y > last_y)
             GameOver = true;
        },
    };
    snake.createSnake();

    function movement(e){
        if (e.key == "ArrowRight"){
            snake.direction = "right";
        }
        else if (e.key == "ArrowLeft"){
            snake.direction = "left";
        }
        else if (e.key == "ArrowUp"){
            snake.direction = "up";
        }
        else if (e.key == "ArrowDown"){
            snake.direction = "down";
        }
        
    }

    document.addEventListener("keydown", movement);
}

function draw(){
   block.clearRect(0, 0, W, H);
   snake.drawSnake();
   block.fillStyle = food.color;
   block.drawImage(food_img, food.x * cellSize, food.y * cellSize, cellSize, cellSize);   
   
   block.drawImage(trophy, 35, 30, cellSize, cellSize);
   block.fillStyle = "blue";
   block.font = "17px Roboto";
   block.fillText(score, 50, 50);
}

function update(){
    snake.updateSnake();
}

function getRandomFood(){
    var foodX = Math.round(Math.random() * (W - cellSize) / cellSize);
    var foodY = Math.round(Math.random() * (H - cellSize) / cellSize);

    var food = {
        x : foodX, 
        y : foodY,
        color : "red",
    }
    return food;
}

function gameloop(){
   if (GameOver == true){
       clearInterval(start);
       alert("Game Over!! Your Score is : " + score);
       return; 
   }
   draw();
   update();
}


init();
var start = setInterval(gameloop, 100);