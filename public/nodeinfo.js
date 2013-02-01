var NodeInfo = {

  init: function(){
    var socket = io.connect('/');
    socket.on('onconnected', function( data ) {

        var length = data.keys.length,
            el = null;

        for (var i = 0; i < length; i++) {
          el = "<a href='/" + data.keys[i] + "'>" + data.keys[i] + "</a>";
          $("#navigation").append(el);
        }

        $("#navigation a").click(function(e){
            e.preventDefault();
            NodeInfo.load_page(this);
        })

    });
  },

  load_page: function(e){
    var path = $(e).attr("href");
    $("#info").load(path);
  }

}
