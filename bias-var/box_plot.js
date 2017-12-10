  // Setup d3
  WIDTH = 200
  HEIGHT = 350

  var b_data = []
  var errors = []

  b_HEIGHT = HEIGHT
  var b_margin = {top: 20, right: 50, bottom: 30, left: 50},
    b_width = 120 - b_margin.left - b_margin.right,
    b_height = b_HEIGHT - b_margin.top - b_margin.bottom;

  var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(b_width)
    .height(b_height);
    
    var min = d3.min(errors)
    var max = d3.max(errors)
    chart.domain([min, max]);

  var svg = d3.select("#plot-2").selectAll("svg")
      .data(b_data)
      .enter().append("svg")
      .attr("class", "box")
      .attr("width", b_width + b_margin.left + b_margin.right)
      .attr("height", b_height + b_margin.bottom + b_margin.top)
      .append("g")
      .attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")")
      .call(chart);


function generateBiasVarData(){
  // learn multiple models and aggregate their errors
  errors = []
  mc_iter = 100
  y_orig = generateData(x,w,0)['y']
  for(it=0;it<mc_iter;it++){
      data = generateData(x, w, nf) // gives data as array of dict{x,y}
      rResult = fitDataClosedForm(data, model_degree)
      y_hat = rResult['yhat']
      errors.push(compute_RMSE(y_orig, y_hat))
  }
  b_data.push(errors)
}





/*
  // Setup d3
  WIDTH = 200
  HEIGHT = 350

  var b_data = []
  b_data.push(linspace(1,50,1))
  //b_data.push(linspace(50,150,1))  

  var margin = {top:20, right:20, bottom:30, left:50}
    width = WIDTH - margin.left - margin.right
    height = HEIGHT - margin.top - margin.bottom;

  var scale_x = d3.scale.linear() // convert this into an ordinal scale
    .domain([0, d3.max(b_data.length)])
    .range([0, width]);

  var scale_y = d3.scale.linear()
    .domain([0, d3.max(b_data[0])+5])
    .range([height, 0]);

  var color = d3.scale.category10();;

  var xAxis = d3.svg.axis()
    .scale(scale_x)
    .orient("bottom");

  var yAxis = d3.svg.axis()
    .scale(scale_y)
    .orient("left");

  var svg = d3.select("#plot-2").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
      .attr("class","label")
      .attr("x", width)
      .attr("y", -6)
      .style("text-anchor", "end")
      .text("x axis");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
      .attr("class","label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("y axis");


  b_HEIGHT = height
  var b_margin = {top: 10, right: 50, bottom: 20, left: 50},
    b_width = 120 - b_margin.left - b_margin.right,
    b_height = b_HEIGHT - b_margin.top - b_margin.bottom;

  var chart = d3.box()
    .whiskers(iqr(1.5))
    .width(b_width)
    .height(b_height);
    
    var min = 0
    var max = 102
    chart.domain([min, max]);

  var svg_box = svg.append("g").attr("class", "svg_box")
  svg_box.selectAll("box")
  //d3.select("#plot-2").selectAll("svg")

      .data(b_data)
      .enter().append("svg")
      .attr("class", "box")
      .attr("width", b_width + b_margin.left + b_margin.right)
      .attr("height", b_height + b_margin.bottom + b_margin.top)
      .append("g")
      .attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")")
      .call(chart);

*/