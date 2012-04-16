window.paint = function() {
  $('#chart').empty();
  var r = 500 / 2;

  maxP = $( "#price-filter" ).slider( "value" ); //range between mid price and max price
  midP = maxP/3; //price range cutoff 1 (lower)
  var mouseIsDown = false; 
  var selected = []; //array of selected concert id's
  eighteen = true; //over 18
  twentyOne = true; //over 21

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
  	  if (d.concert_id >= 5000) return;
  		d3.select(this).style("stroke", "red");
  		selected.push( d.concert_id )
  		console.log(d.concert_id)
		
  	  var id = d.concert_id;
      // set the user id to 1
      var info = JSON.stringify({'concert_id':id,'user_id':1});
      // add to the list on success
      var success = function(e) {
        var list = $('#concerts-list');
        var marker = "<div class='btn'></div>";
        $(marker).attr('id', e.id)
          .text(d.name+" "+d.when)
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
$(document).ready(function() {
  window.paint();
});