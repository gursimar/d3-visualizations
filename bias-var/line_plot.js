// DRAWING FUNCTIONS
function drawXY(x_min, x_max, y_min, y_max) {
	scale_x = d3.scale.linear()
		.domain([x_min, x_max])
		.range([0, width]);

	scale_y = d3.scale.linear()
		.domain([y_min, y_max])
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(scale_x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(scale_y)
		.orient("left");

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
}

function drawData(){
	tData = transformData(data);
	// Update	
	var simar = svg_data.selectAll(".dot")
				.data(tData)			
				.attr("class","dot")
				.attr("r", 3.5)
				.attr("cx", function(d) {return scale_x(d.x);})
				.attr("cy", function(d) {return scale_y(d.y);})
				.style("fill", function(d) { return color("Data Points"); });

	//Enter
	simar.enter().append("circle")
				.attr("class","dot")
				.attr("r", 3.5)
				.attr("cx", function(d) {return scale_x(d.x);})
				.attr("cy", function(d) {return scale_y(d.y);})
				.style("fill", function(d) { return color("Data Points"); });

	
	// Exit
	simar.exit().remove();

	// remove if there is any curve
	d3.selectAll(".curve-path").remove()
}

function drawCurve(){
	// we just have one element here so no update/ enter/ exit
	// ref - https://www.dashingd3js.com/svg-paths-and-d3js
	d3.selectAll(".curve-path").remove()

	lineFunction = d3.svg.line()
		.x(function(d) { return scale_x(d.x); })
		.y(function(d) { return scale_y(d.y); })
		.interpolate("linear");		

	var lineGraph = svg_curve.append("path")
				.attr("class", "curve-path")
                .attr("d", lineFunction(rData))
                .attr("stroke", "red")
                .attr("stroke-width", 2)
                .attr("fill", "none");
}

function makeCurve(p) {
	model_degree = p
	rResult = fitDataClosedForm(data, model_degree)
	rData = transformData({x:data.x, y:rResult.yhat});
	drawCurve()
	console.log("Model -> " + rResult.model)
	console.log("Train error -> " + computeErrorTrain())
	console.log("Train error (/w noise) -> " + computeErrorTrainWN())
	//console.log("Test error - " + computeErrorTest())
	console.log("Generalization error -> " + computeErrorGeneralization())
}


function makeLegend() {
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

}

function fixScales(){
	scale_x.domain([0, d3.max(data.x)])
	scale_y.domain([0, d3.max(data.y)])
}

function bigPicture(){

}