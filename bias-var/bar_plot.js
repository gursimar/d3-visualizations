// Setup d3
WIDTH = 540
HEIGHT = 350

var y0_min = 0
var y1_min = 0

var bar_data = [{
      'model':2005,
      'bias':1200,
      'variance':8343
      },
      {
      'model':2006,
      'bias':1750,
      'variance':8544
      },
      {
      'model':2007,
      'bias':1720,
      'variance':8222
      },
      {
      'model':2008,
      'bias':1710,
      'variance':8214

      }
    ]

var margin = {top:5, right:60, bottom:50, left:60}
  width = WIDTH - margin.left - margin.right
  height = HEIGHT - margin.top - margin.bottom;

var x_scale_bar = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y0_bar = d3.scale.linear().domain([500, 1100]).range([height, 0]),
y1_bar = d3.scale.linear().domain([20, 80]).range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x_scale_bar)
    .orient("bottom");

// create left yAxis
var yAxisLeft = d3.svg.axis().scale(y0_bar).ticks(4).orient("left");
// create right yAxis
var yAxisRight = d3.svg.axis().scale(y1_bar).ticks(6).orient("right");

var svg_bar = d3.select("#plot-3").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("class", "graph")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  reDrawBars()    

function reDrawBars() {
  WIDTH = 540
  HEIGHT = 350

  var margin = {top:5, right:60, bottom:50, left:60}
    width = WIDTH - margin.left - margin.right
    height = HEIGHT - margin.top - margin.bottom;

  //console.log(data)
  d3.select("#plot-3").selectAll("svg").selectAll("*").selectAll("*").remove();
  x_scale_bar.domain(bar_data.map(function(d) { return d.model; }));
  y0_bar.domain([y0_min, d3.max(bar_data, function(d) { return d.bias; })]);
  y1_bar.domain([y1_min, d3.max(bar_data, function(d) { return d.variance; })]);
  
  svg_bar.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg_bar.append("g")
    .attr("class", "y axis axisLeft")
    .attr("transform", "translate(0,0)")
    .call(yAxisLeft)

  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .style("text-anchor", "end")
    .style("text-anchor", "end")
    .text("Bias");
  
  svg_bar.append("g")
    .attr("class", "y axis axisRight")
    .attr("fill", "orange") // custom choice
    .attr("transform", "translate(" + (width) + ",0)")
    .call(yAxisRight)

  .append("text")
    .attr("y", 6)
    .attr("dy", "-2em")
    .attr("dx", "2em")
    .style("text-anchor", "end")
    .text("Variance");

  bars = svg_bar.selectAll(".bar").data(bar_data).enter();
  bars.append("rect")
      .attr("class", "bar1")
      .attr("x", function(d) { return x_scale_bar(d.model); })
      .attr("width", x_scale_bar.rangeBand()/2)
      .attr("y", function(d) { return y0_bar(d.bias); })
    .attr("height", function(d,i,j) { return height - y0_bar(d.bias); }); 

  bars.append("rect")
      .attr("class", "bar2")
      .attr("x", function(d) { return x_scale_bar(d.model) + x_scale_bar.rangeBand()/2; })
      .attr("width", x_scale_bar.rangeBand() / 2)
      .attr("y", function(d) { return y1_bar(d.variance); })
    .attr("height", function(d,i,j) { return height - y1_bar(d.variance); });   
}

function clearBars() {
  bar_data = []
  d3.select("#plot-3").selectAll("svg").selectAll("g").selectAll("*").remove();
}