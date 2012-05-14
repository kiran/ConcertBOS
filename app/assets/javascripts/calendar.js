$(document).ready(function() {
  $('#calendar .concert-node').live('click', function(e, ui) {
    e.preventDefault();
    addPreference($(e.target));
  });

    function addPreference (item) {
        // get the concert id
        var id =item.attr('id');

        // set the user id to 1
        var info = JSON.stringify({'concert_id':id,'user_id':1});
        // add to the list on success
        var success = function(e) {
          var list = $('#concerts-list');
          var marker = item.clone();
          marker.attr('id', e.id);
          marker.text(item.text() + '\n' + item.data('date'));
          marker.appendTo(list);
          list.append("<i class='icon-remove'></i>");
        }
        // send to the server: {concert_id: xx, user_id: 1}, method = POST, url = concertsusers/create
        var options = {url : '/concertsusers', type: 'POST', // URL and method to call
          contentType : 'application/json', dataType: 'json', // send and receive data from the server as JSON}
          data: info, success:success};

        $.ajax(options);
      }
});

