$(document).ready(function(){

  ws = new WebSocket('ws://api.dao.ping1111.com:3000/websocket');
  var wsData;

  ws.onopen = function(){
    console.log('Соединение установлено');
    ws.send('player+map');
  };

  ws.onmessage = function(e){
    console.log('Получаем reset: ' + e.data);
    wsData = JSON.parse(e.data);
  // player geo
    $('.daohero').css('left', wsData.player.x);
  // map
    $('.page').css('width', wsData.map.size);
    var obj = wsData.map.objects; 
    for ( var i=0; i<obj.length; i++ ) {
      $('.page').append('<div class="object object_' + obj[i].type + '"' 
                          + 'passable="' + obj[i].passable + '"'
                          + 'style="left:' + obj[i].x + 'px;'
                          + 'width:' + obj[i].size + 'px;'
                          + 'height:' + obj[i].height + 'px;"></div>');
    }
  // run game
    Game();
    console.log('Игра запущена');
  };

  function Game(){

    var keyState = {};    
    window.addEventListener('keydown',function(e){
      keyState[e.keyCode] = true;
    },true);    
    window.addEventListener('keyup',function(e){
      keyState[e.keyCode] = false;
      if ( e.keyCode == 37 || e.keyCode == 39 ) {
        setTimeout(function(){
          $('.daohero').removeClass('daohero_run_right daohero_run_left');
        }, 200)
      }
    },true);

    function Character(movespeed){
      this.speed = movespeed;
      var player = this;
      var lastMove = new Date();
      this.move = function(direction){
        var newMove = new Date();
        if ( (newMove - lastMove) / 1000 > 1/player.speed ){ 
          ws.send(direction);
          lastMove = newMove;
        }
      };
    }

    var jumpDistantion;

    function jump(direction){
      ws.onmessage = function(e){
        console.log('jump' + e.data)
        wsData = JSON.parse(e.data);
        if ( direction == 'jumpright' ) {
          jumpDistantion = wsData.player.x-5;
        } else {
          jumpDistantion = wsData.player.x+5;
        }
        $('.daohero_jump').animate({left: jumpDistantion, bottom: wsData.player.jumpHeight}, 100, 'linear', function(){
          $('.daohero_jump').animate({left: wsData.player.x, bottom: 0}, 100);
        });
      }
      daohero.move(direction);
    }

    var initMove = function(){
      if ( !keyState[38] && keyState[39] || keyState[37] ){
        ws.onmessage = function(e){
          console.log(e.data)
          wsData = JSON.parse(e.data);
          $('.daohero').animate({left: wsData.player.x}, 100, 'linear');
        }
        if ( keyState[39] ){
          daohero.move('right');
          $('.daohero').addClass('daohero_run_right');
        } else if ( keyState[37] ){
          daohero.move('left');
          $('.daohero').addClass('daohero_run_left');
        }
      }
      if ( keyState[38] && keyState[39] || keyState[38] ){
        $('.daohero').addClass('daohero_jump');
        jump('jumpright');
      } else if ( keyState[38] && keyState[37] ){
        $('.daohero').addClass('daohero_jump');
        jump('jumpleft');
      }

      setTimeout(initMove, 130);
      
      daohero = new Character(11);

    };                                
    
    initMove();

  } // end Game()

})
