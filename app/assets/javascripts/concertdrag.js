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
    list = $('#concerts-list');
    item.clone().appendTo(list).fadeIn();
    list.append('<br>');
    
    // get the concert id
    id = /\d+/.exec(item.attr('href'))[0];
    console.log(id);
    // set the user id to 1
    info = JSON.stringify({'concert_id':id,'user_id':1});
    console.log(info);
    // send to the server: {concert_id: xx, user_id: 1}, method = POST, url = concertsusers/create
    options = {url : '/concertsusers', type: 'POST', // URL and method to call 
      contentType : 'application/json', dataType: 'json', // send and receive data from the server as JSON}
      data: info};
    
    $.ajax(options);
  }
});