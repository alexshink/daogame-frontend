$(document).ready(function(){

  ws = new WebSocket('ws://api.dao.ping1111.com:3000/websocket');
  var wsData;

  ws.onopen = function(){
    console.log('Соединение установлено');
    ws.send('reset');
    ws.send('map');
  };

  ws.onmessage = function(e){
    console.log('Получаем reset: ' + e.data);
    wsData = JSON.parse(e.data);
  // player geo
    if ( wsData.player != undefined ) {
      $('.daohero').css('left', wsData.player.x);
    }
  // map
    if ( wsData.map != undefined ) {
      $('.page').css('width', wsData.map.size);
      var obj = wsData.map.objects; 
      for ( var i=0; i<wsData.map.objects.length; i++ ) {
        $('.page').append('<div class="object object_' + obj[i].type + '"' 
                            + 'passable="' + obj[i].passable + '"'
                            + 'style="left:' + obj[i].x + 'px"></div>');
      }
    }
    setTimeout(function(){
      Game();
    }, 500)

    console.log('Игра запущена');
  };

  function Game(){

    var keyState = {};    
    window.addEventListener('keydown',function(e){
        keyState[e.keyCode || e.which] = true;
    },true);    
    window.addEventListener('keyup',function(e){
        keyState[e.keyCode || e.which] = false;
        if ( e.keyCode == 37 || e.keyCode == 39 ) {
          setTimeout(function(){
            $('.daohero').removeClass('daohero_run_right daohero_run_left');
          }, 200)
        }
    },true);

    ws.onmessage = function(e){
      wsData = JSON.parse(e.data);
      $('.daohero').animate({left: wsData.player.x}, 100, 'linear');
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

      setTimeout(initMove, 130);
      
      daohero = new Character(11);

    };                                
    
    initMove();

  } // end Game()

})
