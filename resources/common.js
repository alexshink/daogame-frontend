$(document).ready(function(){

  var moveKeys = [39, 37, 38, 40]

  function move(id, distance){
    var matrix = $.map(
      $(id).css('transform')
          .slice(7, -1)
          .split(', '),
      Number
    );
    matrix[4] += distance;
    $(id).css('transform', 'matrix(' + matrix.join(', ') + ')');
  }

  $(document).bind('keydown', function(e){
    if ( $.inArray(e.keyCode, moveKeys) !== -1 ) {
      console.log('Отправим через ws: номер нажатой стрелки: ' + e.keyCode);
      
      switch(e.keyCode) { 
        case 39:
          move(daohero, 20);
          break

        case 37:
          move(daohero, -20);
          break

        case 38:
          break

        case 40:
          break
      }
    }
  });

})
