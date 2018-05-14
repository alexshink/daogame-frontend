$(document).ready(function(){

  ws = new WebSocket('ws://api.dao.ping1111.com:3000/websocket');
  var wsData;

  ws.onopen = function(){
    console.log('Соединение установлено');
    ws.send('reset');
  };

  ws.onmessage = function(e){
    console.log('Получаем reset: ' + e.data);
    wsData = JSON.parse(e.data);
    $('.daohero').css('left', wsData.player.x);
    Game();
    console.log('Игра запущена');
  };

  function Game(){

    ws.onmessage = function(e){
      wsData = JSON.parse(e.data);
      $('.daohero').animate({left: wsData.player.x}, 200, 'linear');
      console.log(wsData.player.x)
    }

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
    var initMove = function(){
      $(document).keydown(function(e){ 
        if ( e.keyCode == 39 || e.keyCode == 37 ) {
          switch(e.keyCode){
            case 39:
              daohero.move('right');
            break;
            case 37:
              daohero.move('left');
            break;
          }
        }
      });
      
      daohero = new Character(5);

    };                                
    
    initMove();

  } // end Game()

})
