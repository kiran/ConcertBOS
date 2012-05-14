window.paint = function() {
  $('#chart').empty();
  var r = 800 / 2;

  maxP = $( "#price-filter" ).slider( "value" ); //range between mid price and max price
  var mouseIsDown = false;
  var selected = []; //array of selected concert id's
  var eighteen = ($('#eighteen').attr('checked') === 'checked'); // under 18
  var twentyOne = ($('#twentyone').attr('checked') === 'checked'); // under 21

  var tree = d3.layout.tree()
      .size([360, r - 120])
      .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

  var diagonal = d3.svg.diagonal.radial()
      .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

  var vis = d3.select("#chart").append("svg")
      .attr("width", r * 2)
      .attr("height", r * 2)
    .append("g")
      .attr("transform", "translate(" + r + "," + r + ")");

  d3.json("assets/realdata.json", function(json) {
    var nodes = tree.nodes(json);

    var link = vis.selectAll("path.link")
        .data(tree.links(nodes))
      .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = vis.selectAll("g.node")
        .data(nodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })

    node.append("circle")
        .attr("r", 10)
  	  .style("stroke", function(d) { if(d.top >0) {return "darkorange"}})
  	  .style("fill", function(d)
  		{
  		  var val = "lightgray";
  		  var desatred = "#795A5A";

  		if(d.price <= 10 )
  			{ val = "#FFFFD4";}
  	    else if (d.price <= 20)
  			{ val = "#FED98E";}
  	    else if (d.price <= 30)
  			{ val = "#FE9929";}
  	    else if (d.price <= 40)
  			{ val = "#D95F0E";}
  	    else
  			{ val = "#993404";}


  		 if(eighteen) {
  			if (d.age!=0) {
  				val = '#C9F5FF';
  			}
  		  }
  		  else if(twentyOne) {
  			if (d.age===21) {
  				val = '#C9F5FF';
  			}
  		  }
        if (d.concert_id >= 5000) {val = 'lightgray';}
      		return val;
  		})

  	  .on("mouseover", function (d)
  	{
  		d3.select(this).style("stroke","#993404");
  	})
  	  .on("mouseout", function (d)
  	{
  		d3.select(this).style("stroke", '#FE9929');
  	})
  	  .on("click", function (d)
  	{
  	  if (d.concert_id >= 5000) return;
  		d3.select(this).style("stroke", "red");
  		selected.push( d.concert_id )

        var id = d.concert_id;
        // set the user id to 1
        var info = JSON.stringify({'concert_id':id,'user_id':1});
        // add to the list on success
        var success = function(e) {
            // add a div with a remove button and a more link
            var list = $('#concerts-list');
            var marker = "<a href=concerts/"+d.concert_id+" class='btn btn-inverse btn-mini'></div>";
            marker = $(marker).text(d.name+" "+d.when);
            var div = "<div class='concerts'></div>";

            var x = "<br><i class='icon-remove'></i>"
            x = $(x).attr('id', e.id);
            console.log(e.id);

            $(div).append(marker)
              .append(x)
              .appendTo(list).fadeIn();
        }
        // send to the server: {concert_id: xx, user_id: 1}, method = POST, url = concertsusers/create
        var options = {url : '/concertsusers', type: 'POST', // URL and method to call
            contentType : 'application/json', dataType: 'json', // send and receive data from the server as JSON}
            data: info, success:success};

        $.ajax(options);
  	});

    node.append("text")
        .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
        .attr("dy", ".31em")
        .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
        .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
        .text(function(d) { return d.name; });

  });

};
$(function() {
    window.paint();
    $('#chart').tooltip({
        selector: 'svg circle',
        title: function() {
           var d = this.__data__;
           if (d.concert_id >= 5000) return d.name;
           return d.name+'<br>'+d.when+"<br>$"+d.price;
        }
    });
});

