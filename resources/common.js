$(document).ready(function(){

  var moveKeys = [37, 38, 39, 40];

  function move(eClass, distance, jump){
  // TRANSLATE MATRIX MOVE
    // var matrix = $.map(
    //   $('.' + eClass).css('transform').slice(7, -1).split(', '), Number
    // );
    // if ( jump !== undefined ) {
    //   var matrixJump = [];
    //   for ( var i=0; i<matrix.length; i++ ) {
    //     matrixJump.push(matrix[i]);
    //   };
    //   matrixJump[5] -= distance;
    //   $('.' + eClass).css('transform', 'matrix(' + matrixJump.join(', ') + ')');
    //   setTimeout(function(){
    //     matrix[5] = 0;
    //     $('.' + eClass).css('transform', 'matrix(' + matrix.join(', ') + ')');
    //   }, 150)
    // } else {
    //   matrix[4] += distance;
    //   $('.' + eClass).css('transform', 'matrix(' + matrix.join(', ') + ')');
    // }

  // ABSOLUTE MOVE
    if ( jump !== undefined ) {
      $('.' + eClass)
        .addClass('daohero_jump')
        .css('bottom', '+=' + distance);
      setTimeout(function(){
        $('.' + eClass).css('bottom', '0' )
      }, 200)
    } else {
      $('.' + eClass).addClass('daohero_run');
      if ( keyPressed == 39 ) {
        $('.' + eClass).addClass('daohero_run_right');
      } else {
        $('.' + eClass).addClass('daohero_run_left');
      }
      $('.' + eClass).css('left', '+=' + distance);
    }
  }

  $(document).bind('keydown', function(e){
    if ( $.inArray(e.keyCode, moveKeys) !== -1 ) {
      console.log('Отправим через ws: номер нажатой стрелки: ' + e.keyCode);
      
      window.keyPressed = e.keyCode;

      switch(e.keyCode) { 
        case 39:
          move('daohero', 60);
          break

        case 37:
          move('daohero', -60);
          break

        case 38:
          move('daohero', 60, 1);
          break

        case 40:
          break
      }
    }
  });

  $(document).keyup(function(e) {   
     if ( $.inArray(e.which, moveKeys) !== -1 ){
        $('.daohero').removeClass('daohero_jump daohero_run daohero_run_left daohero_run_right')
     }
  });

})
