$(document).ready(function(){

  ws = new WebSocket('ws://api.dao.ping1111.com:3000/websocket');
  var wsData;

  ws.onopen = function(){
    console.log('Соединение установлено');
    ws.send('reset');
    Game();
  };

  ws.onmessage = function(e){
    console.log('Получены данные: ' + e.data);
    wsData = JSON.parse(e.data);
    // reset
    // $('.daohero').css('left', wsData.x)
    console.log('Игра запущена');
  };

  function Game(){

    var moveKeys = [37, 38, 39, 40];

    function move(eClass, distance, jump){

    // ABSOLUTE MOVE
      if ( jump !== undefined && $('.' + eClass).css('bottom').replace('px', '') == 0) {
        $('.' + eClass)
          .addClass('daohero_jump')
          .css('bottom', '+=' + distance);
        setTimeout(function(){
          $('.' + eClass).css('bottom', '0' )
        }, 200)
      } else if ( keyPressed == 39 ) {
        $('.' + eClass).addClass('daohero_run');
        $('.' + eClass).css('left', distance);
        $('.' + eClass).addClass('daohero_run_right');
      } else if ( keyPressed == 37 ) {
        $('.' + eClass).addClass('daohero_run');
        $('.' + eClass).css('left', distance);
        $('.' + eClass).addClass('daohero_run_left');
      }
    }

    $(document).bind('keydown', function(e){

      ws.onmessage = function(e){
        wsData = JSON.parse(e.data);
        console.log(wsData.X)
        if ( keyPressed == 39 || keyPressed == 37 ) {
          move('daohero', wsData.X);
        }
        setTimeout(function(){
          $('.daohero').removeClass('daohero_jump daohero_run daohero_run_left daohero_run_right')
        }, 200)
      }

      if ( $.inArray(e.keyCode, moveKeys) !== -1 ) {
        
        window.keyPressed = e.keyCode;

        switch(keyPressed) { 
          case 39:
            ws.send('right');
            break

          case 37:
            ws.send('left');
            break

          case 38:
            move('daohero', 60, 1);
            break
        }
      }
    });

  } // end Game()

})
