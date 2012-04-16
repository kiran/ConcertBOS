var r = 500 / 2;

var midP = 15; //price range cutoff 1 (lower)
var maxP = 50; //range between mid price and max price
var mouseIsDown = false; 
var selected = []; //array of selected concert id's
var eighteen = true; //over 18
var twentyOne = true; //over 21

var tree = d3.layout.tree()
    .size([360, r - 120])
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });

var diagonal = d3.svg.diagonal.radial()
    .projection(function(d) { return [d.y, d.x / 180 * Math.PI]; });

var vis = d3.select("#chart").append("svg")
    .attr("width", r * 2)
    //.attr("height", r * 2 - 150)
    .attr("height", r * 2)
  .append("g")
    .attr("transform", "translate(" + r + "," + r + ")");

d3.json("assets/dummydata.json", function(json) {
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
      .attr("r", 7.5)
	  .style("stroke", function(d) { if(d.top >0) {return "darkorange"}})
	  .style("fill", function(d) 
		{ 
		  var val = "lightgray";
		  
		if(d.price <= midP ) 
			{ val = "deepskyblue";} 
			else if (d.price <= maxP) 
			{ val = "royalblue";} 
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
		
		return val;
		
		})
	  
	  .on("mouseover", function (d) 
	{
		d3.select(this).style("stroke","darkblue");
	})
	  .on("mouseout", function (d)
	{
		d3.select(this).style("stroke",
		function (d) 
		{
			if(selected.indexOf(d.concert_id)<0)
			{
				return "white"
			}
			else
			{
				return "red"
			}
		});
	})
	  .on("mousedown", function (d) 
	{
		d3.select(this).style("stroke", "red");
		selected.push( d.concert_id )
		console.log(d.concert_id)
	});

  node.append("text")
      .attr("dx", function(d) { return d.x < 180 ? 8 : -8; })
      .attr("dy", ".31em")
      .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
      .attr("transform", function(d) { return d.x < 180 ? null : "rotate(180)"; })
      .text(function(d) { return d.name; });
});
