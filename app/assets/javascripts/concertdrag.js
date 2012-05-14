$(document).ready(function() {
  $('#concerts .drag').draggable({//revert: "invalid", // when not dropped, the item will revert back to its initial position
  			helper: "clone",
  			cursor: "move"});

  $('#concertsbar').droppable({
  	accept: "#concerts .drag",
  	activeClass: "ui-state-highlight",
  	drop: function(event, ui) {
  		addPreference(ui.draggable);
  	}
  });

  $('#concerts .drag').live('click', function(e, ui) {
    addPreference($(e.target));
  });

  $('#concerts-list .icon-remove').live('click', function(e){
    e.preventDefault();
    deletePreference($(e.target));
  });

  function addPreference (item) {
    //item.draggable('disable');
    // get the concert id
    var id =item.attr('id');

    // set the user id to 1
    var info = JSON.stringify({'concert_id':id,'user_id':1});
    // add to the list on success
    var success = function(e) {
      var list = $('#concerts-list');
      var marker = item.clone();
      var div = '<div></div>';
      div = $(div);
      marker.attr('id', e.id);
      marker.text(item.text());
      div = div.append(marker);
      div = $(div).append("<i class='icon-remove' id="+e.id+"></i>");
      list.append(div);
    }
    // send to the server: {concert_id: xx, user_id: 1}, method = POST, url = concertsusers/create
    var options = {url : '/concertsusers', type: 'POST', // URL and method to call
      contentType : 'application/json', dataType: 'json', // send and receive data from the server as JSON}
      data: info, success:success};

    $.ajax(options);
  }

  function deletePreference (item) {
    // get the concert id
    var id = item.attr('id');
    // set the user id to 1
    var info = JSON.stringify({'concert_id':id,'user_id':1});
    // add to the list on success
    var success = function() {
      var marker = item.parent().fadeOut();
      item.parent().remove();
    }
    // send to the server: {concert_id: xx, user_id: 1}, method = POST, url = concertsusers/create
    var options = {url : '/concertsusers/'+id, type: 'DELETE', // URL and method to call
      contentType : 'application/json', dataType: 'json', // send and receive data from the server as JSON}
      data: info, success:success};

    $.ajax(options);
  }
});

