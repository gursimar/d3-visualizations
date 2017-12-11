  // Setup d3
  WIDTH = 200
  HEIGHT = 350

  var b_data = []
  var b_data_scaled = []

  var errors = []

  b_HEIGHT = HEIGHT
  var b_margin = {top: 20, right: 50, bottom: 30, left: 50},
    b_width = 120 - b_margin.left - b_margin.right,
    b_height = b_HEIGHT - b_margin.top - b_margin.bottom;

  var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(b_width)
    .height(b_height);
    
  var min = 100000//d3.min(errors)
  var max = 0//d3.max(errors)


function reDrawBoxes() {

  d3.select("#plot-2").selectAll("svg").remove();
  chart.domain([min, max]); // CHECK THIS
  var svg = d3.select("#plot-2").selectAll("svg")
      .data(b_data_scaled)
      .enter().append("svg")
      .attr("class", "box")
      .attr("width", b_width + b_margin.left + b_margin.right)
      .attr("height", b_height + b_margin.bottom + b_margin.top)
      .append("g")
      .attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")")
      .call(chart);
}

function clearBoxes() {
  max = 0
  min = 100000
  b_data = []
  b_data_scaled = []
  d3.select("#plot-2").selectAll("svg").remove();
}

