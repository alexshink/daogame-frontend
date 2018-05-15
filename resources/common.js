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

    var keyState = {};    
    window.addEventListener('keydown',function(e){
        keyState[e.keyCode || e.which] = true;
    },true);    
    window.addEventListener('keyup',function(e){
        keyState[e.keyCode || e.which] = false;
        setTimeout(function(){
          $('.daohero').removeClass('daohero_run daohero_run_right daohero_run_left');
        }, 400)
    },true);

    ws.onmessage = function(e){
      wsData = JSON.parse(e.data);
      $('.daohero').animate({left: wsData.player.x}, 250, 'linear');
      console.log(wsData)
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
      if (keyState[39] || keyState[68]){
        daohero.move('right');
        $('.daohero').addClass('daohero_run_right');
      } else if (keyState[37] || keyState[65]){
        daohero.move('left');
        $('.daohero').addClass('daohero_run_left');
      }

      setTimeout(initMove, 250);
      
      daohero = new Character(5);

    };                                
    
    initMove();

    // $(document).keyup(function(e){ 
    //   if ( e.keyCode == 39 || e.keyCode == 37 ) {
    //     setTimeout(function(){
    //       $('.daohero').removeClass('daohero_run daohero_run_right daohero_run_left');
    //     }, 500)
    //   }
    // })

  } // end Game()

})
