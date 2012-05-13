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
    .charge(-250)
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

							if(d.price <= $('#price-filter').slider('value')/2 )
								{ val = "rgb(255,156,75)";}
							else if (d.price <= $('#price-filter').slider('value'))
								{ val ="rgb(255,211,79)";}
							else
								{ val = "lightgray";}

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
			d3.select(this).style("border-color","maroon");
		}
	})

	.on("mouseout", function (d)
	{
		if(d.group > 0) {
			d3.select(this).style("border-style","solid")
			d3.select(this).style("border-color",
			function (d)
			{
				if(selected.indexOf(d.concert_id)<0)
				{
					return "transparent";
				}
				else
				{
					return "maroon";
				}
			})
		}
	})

	.on("mousedown", function (d)
	{
		if(d.group > 0  && selected.indexOf(d.concert_id)<0)
		{
			d3.select(this).style("border-color", "maroon");
			selected.push( d.concert_id );
		}
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
});

