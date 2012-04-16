$(document).ready(function() {
  var w = 800,
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
        .style("background", function(d) { if(d.group >0) { return "lightblue"} else {return "lightgreen"}; })
        .style("border-color", function(d) {  if(d.group >0) { return "lightblue"} else {return "lightgreen"};})
  	  .attr("r", function(d) { return d.value+20; })
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
});