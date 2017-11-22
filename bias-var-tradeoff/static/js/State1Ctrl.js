/**
 * Created by Gursimran on 16-Apr-16.
 */
app.controller("State1Ctrl", function($scope) {
    $scope.items = ["simar1", "simar2", "simar3"];
	// ================== MAIN CODE ==================
    //alert("hello bu")

	var simar = [0.1,0.2,0.3,0.4];
	var data = {
		x:[0.1,0.2,0.3,0.4],
		y:[0.2,0.3,0.5,0.6]
	};
	w = [100,3,5] // slope
	x = linspace(0,20,0.1)
	nf = 1000 // noise factor
	model_degree = 1
	data = generateData(x,w,nf) // gives data as array of dict{x,y}
	//data_r = transformDataReg(data, model_degree)	// gives data as arrays of array [x,y]
	//rResult = fitData(data_r)
	rResult = fitDataClosedForm(data, model_degree)

	//console.log(transformData(data));
	tData = transformData(data);
	rData = transformData({x:data.x, y:rResult.yhat});

	var margin = {top:20, right:20, bottom:30, left:40}
		width = 960 - margin.left - margin.right
		height = 500 - margin.top - margin.bottom;

	var x = d3.scale.linear()
		.domain([0, d3.max(data.x)])
		.range([0, width]);

	var y = d3.scale.linear()
		.domain([0, d3.max(data.y)])
		.range([height, 0]);

	var color = d3.scale.category10();;

	var xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(y)
		.orient("left");

	var svg = d3.select("#chart_out").append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
			.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	//x.domain(d3.extent(data, function(d) { return d.dim1; })).nice();
  	//y.domain(d3.extent(data, function(d) { return d.dim2; })).nice();

	//x.domain(d3.extent(data, function(d) { return d.dim1; })).nice();
  	//y.domain(d3.extent(data, function(d) { return d.dim2; })).nice();

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

	svg.append("g")
		.selectAll(".dot")
			.data(tData)
			.enter().append("circle")
			.attr("class","dot")
			.attr("r", 3.5)
			.attr("cx", function(d) {return x(d.x);})
			.attr("cy", function(d) {return y(d.y);})
			.style("fill", function(d) { return color("Data Points"); });

	svg.append("g")
		.selectAll(".dot")
			.data(rData)
			.enter().append("circle")
			.attr("class","dot")
			.attr("r", 3.5)
			.attr("cx", function(d) {return x(d.x);})
			.attr("cy", function(d) {return y(d.y);})
			.style("fill", function(d) { return color("Regression line"); });

	var legend = svg.selectAll(".legend")
		.data(color.domain())
	.enter().append("g")
		.attr("class","legend")
		.attr("transform",function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", 0 + 60)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", 0 + 60+ 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });

});
