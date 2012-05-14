window.fpaint = function() {
$('#friends-chart').empty();

var maxP = $('#price-filter').slider('value'); //range between mid price and max price
var midP = maxP/2; //price range cutoff 1 (lower)
var mouseIsDown = false;
var selected = []; //array of selected concert id's
var eighteen = ($('#eighteen').attr('checked') != 'checked'); //over 18
var twentyOne = ($('#twentyone').attr('checked') != 'checked'); //over 21

var w = 700,
    h = 400,
    r = 6,
    fill = d3.scale.category20();

var force = d3.layout.force()
    .charge(-450)
    .linkDistance(70)
    .size([w, h]);

var vis = d3.select("#friends-chart").append("div")
    .style("width", w + "px")
    .style("height", h + "px");

d3.json("assets/friendData.json", function(json) {
  var link = vis.selectAll("div.link")
      .data(json.links)
    .enter().append("div")
      .attr("class", "link");

  var node = vis.selectAll("div.node")
      .data(json.nodes)
    .enter().append("div")
      .attr("class", "node")
      .style("background",
					function(d) {
						if(d.group === 0) {
							return "#91E0F2"
							}
						else {
							var val = "lightgray"

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

							 if(!eighteen)
							  {
								if (d.age!=0)
								{
									val = "lightgray";
								}
							  }
							  else if(!twentyOne)
							  {
								if (d.age===21)
								{
									val = "lightgray"
								}
							  }

                            if (d.concert_id >= 5000) {val = 'lightgray';}
							return val;

							};
						})

	  .attr("r", function(d) { return d.value+20; })
	.on("mouseover", function (d)
	{
		if(d.group > 0) {
			d3.select(this).style("border-style","solid");
  		    d3.select(this).style("border-color","#993404");
		}
	})

	.on("mouseout", function (d)
	{
		if(d.group > 0) {
			d3.select(this).style("border-style","solid");
  		    d3.select(this).style("border-color", 'transparent');
		}
	})

	.on("click", function (d)
	{
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
	})


      .call(force.drag);


  force
      .nodes(json.nodes)
      .links(json.links)
      .on("tick", tick)
      .start();

	node.append("text")
	      .attr("dx", function(d) { return d.x < 180 ? 20 : -20; })
	      .attr("dy", ".41em")
	      .attr("text-anchor", function(d) { return d.x < 180 ? 100 : "end"; })
	      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
	      .text(function(d) { return d.name; });


  function tick() {
    node.style("left", function(d) { return (d.x = Math.max(r, Math.min(w - r, d.x))) + "px"; })
        .style("top", function(d) { return (d.y = Math.max(r, Math.min(h - r, d.y))) + "px"; });

    link.style("left", function(d) { return d.source.x + "px"; })
        .style("top", function(d) { return d.source.y + "px"; })
        .style("width", length)
        .style("-webkit-transform", transform)
        .style("-moz-transform", transform)
        .style("-ms-transform", transform)
        .style("-o-transform", transform)
        .style("transform", transform);
  }

  function transform(d) {
    return "rotate(" + Math.atan2(d.target.y - d.source.y, d.target.x - d.source.x) * 180 / Math.PI + "deg)";
  }

  function length(d) {
    var dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y;
    return Math.sqrt(dx * dx + dy * dy) + "px";
  }
});
}

$(document).ready( function() {
    window.fpaint();
    $('#friends-chart').tooltip({
        selector: '.node',
        title: function() {
           var d = this.__data__;
           if (d.group == 0) return;
           if (d.concert_id >= 5000) return;
           return d.name+'<br>'+d.when+"<br>$"+d.price;
        }
    });
});

