$(document).ready(function() {
  $('#concerts .btn').draggable({revert: "invalid", // when not dropped, the item will revert back to its initial position
  			helper: "clone",
  			cursor: "move"});
			
  $('#concertsbar').droppable({
  	accept: "#concerts .btn",
  	activeClass: "ui-state-highlight",
  	drop: function(event, ui) {
  		addPreference(ui.draggable);
  	}
  });
  
  function addPreference (item) {
    // get the concert id
    var id = /\d+/.exec(item.attr('href'))[0];
    // set the user id to 1
    var info = JSON.stringify({'concert_id':id,'user_id':1});
    // add to the list on success
    var success = function() {
      item.draggable('disable');
      var list = $('#concerts-list');
      item.clone().appendTo(list).fadeIn();
      list.append('<br>');
    }
    // send to the server: {concert_id: xx, user_id: 1}, method = POST, url = concertsusers/create
    var options = {url : '/concertsusers', type: 'POST', // URL and method to call 
      contentType : 'application/json', dataType: 'json', // send and receive data from the server as JSON}
      data: info, success:success};
    
    $.ajax(options);
  }
});