// DRAWING FUNCTIONS
function drawXY(x_min, x_max, y_min, y_max) {
	scale_x = d3.scale.linear()
		.domain([x_min, x_max])
		.range([0, width_curve]);

	scale_y = d3.scale.linear()
		.domain([y_min, y_max])
		.range([height_curve, 0]);

	var xAxis = d3.svg.axis()
		.scale(scale_x)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(scale_y)
		.orient("left");

	x_axis.attr("transform", "translate(0," + height_curve + ")")
		.call(xAxis)
		.append("text")
			.attr("class","label_chart")
			.attr("x", width_curve)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text("x axis");

	y_axis.call(yAxis)
		.append("text")
			.attr("class","label_chart")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("y axis");	
}

function drawData(data_t){
	tData = transformData(data_t);
	//console.log(tData)
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
	clearCurve()
}

function drawCurve(data_t) {
	rData = transformData(data_t);
	clearCurve()

	// Draw curve
	lineFunction = d3.svg.line()
		.x(function(d) { return scale_x(d.x); })
		.y(function(d) { return scale_y(d.y); })
		.interpolate("linear");		

	var lineGraph = svg_curve.append("path")
				.attr("class", "curve-path")
                .attr("d", lineFunction(rData))
                .attr("stroke", function(d) { return color("Regression line"); })
                //.attr("stroke", "red")
                .attr("stroke-width", 3)
                .attr("fill", "none");
}


function makeLegend() {
	var legend = legend_main.selectAll(".legend")
		.data(color.domain())
		.enter().append("g")
			.attr("class","legend")
			.attr("transform",function(d, i) { return "translate(-20," + i * 20 + ")"; });

	legend.append("rect")
	  .attr("x", 0 + 60)
	  .attr("width", 18)
	  .attr("height", 18)
	  .style("fill", color)
      //.attr("fill-opacity", "0.9") // custom choice      

	legend.append("text")
	  .attr("x", 0 + 60+ 24)
	  .attr("y", 9)
	  //.attr("class","label")
	  .attr("dy", ".35em")
	  .style("text-anchor", "start")
	  .text(function(d) { return d; });	

}


// Data generation functions
function createData(){
	w = w_all[w_ind]
	var data_t = generateData(x,w,nf)
	return data_t
}

function learnDrawCurve(p){
	model_degree = p
	rResult = fitDataClosedForm(data, model_degree)	
	drawCurve({x:data.x, y:rResult.yhat})

	// i can remove it afterwards
	generateBiasVarData()
	makeLegend()
	//console.log("Model -> " + rResult.model)
	//console.log("Train error -> " + computeErrorTrain())
	//console.log("Train error (/w noise) -> " + computeErrorTrainWN())
	//console.log("Test error - " + computeErrorTest())
	//console.log("Generalization error -> " + computeErrorGeneralization())
}


function showActualPicture() {
	// Draw things on canvas
	clearCanvas()
	x_min = d3.min(x)
	x_max = d3.max(x)
	y_min = -1000
	y_max = +1000
	drawXY(x_min, x_max, y_min, y_max)
	drawData(data);	
	if (rResult.length != 0) { //hack to handle the opening case
		drawCurve({x:data.x, y:rResult.yhat})
	}
	makeLegend();
}


function showBigPicture(){
	// Draw things on canvas
	clearCanvas()
	var big_x = linspace(-50,50,1)

	data_big = generateData(big_x,w,nf)
	big_yhat = generateData(big_x,rResult.model,0)['y']
	data_y_big = {x:big_x, y:big_yhat}

	x_min = d3.min(big_x)
	x_max = d3.max(big_x)
	y_min = d3.min(big_yhat)
	y_max = d3.max(big_yhat)
	drawXY(x_min, x_max, y_min, y_max)
	drawData(data_big)
	drawCurve(data_y_big)

	makeLegend();

}

// Clearing functions
function clearData(){
	svg_data.selectAll("*").remove()
}

function clearCurve(){
	svg_curve.selectAll("*").remove()	
}

function clearXY(){
	x_axis.selectAll("*").remove()
}

function clearLegend(){
	legend_main.selectAll("*").remove()	
}

function clearCanvas() {
	clearData()
	clearCurve()
	clearXY()
	clearLegend()
}

