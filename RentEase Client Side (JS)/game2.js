window.onload = function(){
  let c = document.querySelector("canvas");
  let canvas = document.querySelector("canvas");
  c.width = innerWidth;
  c.height = innerHeight;
  c = c.getContext("2d");

  function startGame(){
  mouse = {
    x: innerWidth/2,
    y: innerHeight-33
  };
    
  touch = {
    x: innerWidth/2,
    y: innerHeight-33
  };
    
  canvas.addEventListener("mousemove", function(event){
  mouse.x = event.clientX;
  });
  canvas.addEventListener("touchmove", function(event){
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let touch = event.changedTouches[0];
    let touchX = parseInt(touch.clientX);
    let touchY = parseInt(touch.clientY) - rect.top - root.scrollTop;
    event.preventDefault();
    mouse.x = touchX;
    mouse.y = touchY;
  });
  let player_width = 32;
  let player_height = 32;
  let playerImg = new Image();
  let score = 0;
  let health = 100;
  playerImg.src = "https://image.ibb.co/dfbD1U/heroShip.png";
  
  let _bullets = []; 
  let bullet_width = 6;
  let bullet_height = 8;
  let bullet_speed = 10;

  let _enemies = []; 
  let enemyImg = new Image();
  enemyImg.src = "https://i.ibb.co/0YgHvmx/enemy-fotor-20230927153748.png"
  let enemy_width = 32;
  let enemy_height = 32;

  let _healthkits = []; 
  let healthkitImg = new Image();
  healthkitImg.src = "https://image.ibb.co/gFvSEU/first_aid_kit.png";
  let healthkit_width = 32;
  let healthkit_height = 32;
  
  function Player(x, y, width, height){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    
    this.draw = function(){
      c.beginPath();
      c.drawImage(playerImg, mouse.x-player_width, mouse.y-player_height); 
    };
    
    this.update = function(){
      this.draw();
    };
  }
  
  function Bullet(x, y, width, height, speed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    
    this.draw = function(){
      c.beginPath();
      c.rect(this.x, this.y, this.width, this.height);
      c.fillStyle = "white";
      c.fill();
    };
    
    this.update = function(){
      this.y -= this.speed;
      this.draw();
    };
  }
  
  function Enemy(x, y, width, height, speed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    
    this.draw = function(){
      c.beginPath();
      c.drawImage(enemyImg, this.x, this.y);
    };
    
    this.update = function(){
      this.y += this.speed;
      this.draw();
    };
  }
  
  function Healthkit(x, y, width, height, speed){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    
    this.draw = function(){
      c.beginPath();
      c.drawImage(healthkitImg, this.x, this.y);
    };
    
    this.update = function(){
      this.y += this.speed;
      this.draw();
    };
  }
    
  let __player = new Player(mouse.x, mouse.y, player_width, player_height);
  
  function drawEnemies(){
    for (let _ = 0; _<4; _++){ 
      let x = Math.random()*(innerWidth-enemy_width);
      let y = -enemy_height; 
      let width = enemy_width;
      let height = enemy_height;
      let speed = Math.random()*2;
      let __enemy = new Enemy(x, y, width, height, speed);
      _enemies.push(__enemy);
    }
  }setInterval(drawEnemies, 1234);
    
  function drawHealthkits(){
    for (let _ = 0; _<1; _++){   
      let x = Math.random()*(innerWidth-enemy_width);
      let y = -enemy_height; 
      let width = healthkit_width;
      let height = healthkit_height;
      let speed = Math.random()*2.6;
      let __healthkit = new Healthkit(x, y, width, height, speed);
      _healthkits.push(__healthkit); 
    }
  }setInterval(drawHealthkits, 15000);

  function fire(){ 
    for (let _ = 0; _<1; _++){
      let x = mouse.x-bullet_width/2;
      let y = mouse.y-player_height;
      let __bullet = new Bullet(x, y, bullet_width, bullet_height, bullet_speed);
      _bullets.push(__bullet);
    }
  }setInterval(fire, 200);
    
  canvas.addEventListener("click", function(){
  });
    
  function collision(a,b){
    return a.x < b.x + b.width &&
           a.x + a.width > b.x &&
           a.y < b.y + b.height &&
           a.y + a.height > b.y;
  }
  c.font = "1em Arial";
  
  function stoperror() {
    return true;
  }  
  window.onerror = stoperror;

  function animate(){
    requestAnimationFrame(animate); 
    c.beginPath(); 
    c.clearRect(0,0,innerWidth,innerHeight); 
    c.fillStyle = 'white';
    c.fillText("Health: " + health, 5, 20); 
    c.fillText("Score: " + score, innerWidth-100, 20); 
    
    __player.update();

    for (let i=0; i < _bullets.length; i++){
      _bullets[i].update();
      if (_bullets[i].y < 0){
        _bullets.splice(i, 1);
      }
    }

    for (let k=0; k < _enemies.length; k++){
      _enemies[k].update();
      if(_enemies[k].y > innerHeight){
        _enemies.splice(k, 1);
        health -= 10;
      if(health == 0){
        alert("You DIED!\nYour score was " + score);
        let playAgain = confirm("Do you want to play again?");
        if (playAgain) {
            startGame();
        } else {
            window.location.href = "login.html";
        }
        startGame();
      }
        
      }
    }
  
    for(let j = _enemies.length-1; j >= 0; j--){
      for(let l = _bullets.length-1; l >= 0; l--){
        if(collision(_enemies[j], _bullets[l])){
          _enemies.splice(j, 1);
          _bullets.splice(l, 1);
          score++;
        }
      }
    }
    
    for(let h=0; h < _healthkits.length; h++){
      _healthkits[h].update();
    }
    for(let hh = _healthkits.length-1; hh >= 0; hh--){
      for(let hhh = _bullets.length-1; hhh >= 0; hhh--){
        if(collision(_healthkits[hh], _bullets[hhh])){
          _healthkits.splice(hh, 1);
          _bullets.splice(hhh, 1);
          health += 10;
        }
      }
    } 
    
  }
  animate();
  }startGame();
  }; 