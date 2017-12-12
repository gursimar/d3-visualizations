  // Setup d3
  WIDTH = 200
  HEIGHT = 350

  var b_data = []
  var b_data_scaled = []

  var errors = []

  b_HEIGHT = HEIGHT
  var b_margin = {top: 20, right: 45, bottom: 30, left: 45},
    b_width = 110 - b_margin.left - b_margin.right,
    b_height = b_HEIGHT - b_margin.top - b_margin.bottom;

  var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(b_width)
    .height(b_height);
    
  var min = 100000//d3.min(errors)
  var max = 0//d3.max(errors)
  d3.select("#plot-2").append("g")


function reDrawBoxes() {

  d3.select("#plot-2").selectAll("svg").remove();
  chart.domain([min, max]); // CHECK THIS
  var svg = d3.select("#plot-2").selectAll("g").selectAll("svg")
      .data(b_data_scaled)
      .enter().append("svg")
      .attr("class", "box")
      .attr("width", b_width + b_margin.left + b_margin.right)
      .attr("height", b_height + b_margin.bottom + b_margin.top)
      .append("g")
      .attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")")
      .call(chart);

//  var x_axis = svg.append("g").attr("class", "x axis")
  /*
  var y_axis = d3.select("#plot-2").select("g").append("g").attr("class", "y axis")
  

  scale_y = d3.scale.linear()
    .domain([min, max])
    .range([b_height, 0]);

  var yAxis = d3.svg.axis()
    .scale(scale_y)
    .orient("left");


  y_axis.call(yAxis)
    .append("text")
      .attr("class","label_chart")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Dependent variable (y)");
    */

/*
  scale_x = d3.scale.linear()
    .domain([x_min, x_max])
    .range([0, width_curve]);

  var xAxis = d3.svg.axis()
    .scale(scale_x)
    .orient("bottom");

  x_axis.attr("transform", "translate(0," + height_curve + ")")
    .call(xAxis)
    .append("text")
      .attr("class","label_chart")
      .attr("x", width_curve)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("Independent variable (x)");
*/
}

function clearBoxes() {
  max = 0
  min = 100000
  b_data = []
  b_data_scaled = []
  d3.select("#plot-2").selectAll("svg").remove();
}

