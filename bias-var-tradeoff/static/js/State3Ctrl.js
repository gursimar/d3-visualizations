/**
 * Created by Gursimran on 16-Apr-16.
 */
app.controller("State2Ctrl", function($scope) {
    $scope.slider = {
        'options': {
            start: function(event, ui) {
                $log.info('Event: Slider start - set with slider options', event);
            },
            stop: function(event, ui) {
                $log.info('Event: Slider stop - set with slider options', event);
            }
        }
    };

	//================== FUNCTIONS ==================
    $scope.setupd3 = function(){
        var margin = {top:20, right:20, bottom:30, left:40}
            width = 960 - margin.left - margin.right
            height = 500 - margin.top - margin.bottom;

        var scale_x = d3.scale.linear()
            //.domain([0, d3.max(data.x)])
            .range([0, width]);

        var scale_y = d3.scale.linear()
            //.domain([0, d3.max(data.y)])
            .range([height, 0]);

        var scale_color = d3.scale.category10();;

        $scope.scale_x =scale_x
        $scope.scale_y=scale_y
        $scope.scale_color = scale_color

        xAxis = d3.svg.axis()
            .scale(scale_x)
            .orient("bottom");

        yAxis = d3.svg.axis()
            .scale(scale_y)
            .orient("left");

        var svg = d3.select("#chart_out").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        $scope.svg = svg

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
    }

  $scope.displayLegend = function() {
    svg = $scope.svg
    scale_x = $scope.scale_x
    scale_y = $scope.scale_y
    scale_color = $scope.scale_color

    var legend = svg.selectAll(".legend")
        .data(scale_color.domain())
    .enter().append("g")
        .attr("class","legend")
        .attr("transform",function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
      .attr("x", 0 + 60)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", scale_color);

    legend.append("text")
      .attr("x", 0 + 60+ 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(function(d) { return d; });

  }

  $scope.displayData = function(tData){
    $scope.data = generateData(x,$scope.w,$scope.nf) // gives data as array of dict{x,y}
	$scope.tData = transformData($scope.data);
    tData = $scope.tData


    svg = $scope.svg
    scale_x = $scope.scale_x
    scale_y = $scope.scale_y
    scale_color = $scope.scale_color

    /*
    svg.append("g")
        .selectAll(".dot")
            .data(tData)
            .enter().append("circle")
            .attr("class","dot")
            .attr("r", 3.5)
            .attr("cx", function(d) {return scale_x(d.x);})
            .attr("cy", function(d) {return scale_y(d.y);})
            .style("fill", function(d) { return scale_color("Data Points"); });
    $scope.displayLegend()
    */

  }

  $scope.displayRegLine = function(rData) {
    svg = $scope.svg
    scale_x = $scope.scale_x
    scale_y = $scope.scale_y
    scale_color = $scope.scale_color

    svg.append("g")
        .selectAll(".dot")
            .data(rData)
            .enter().append("circle")
            .attr("class","dot")
            .attr("r", 3.5)
            .attr("cx", function(d) {return scale_x(d.x);})
            .attr("cy", function(d) {return scale_y(d.y);})
            .style("fill", function(d) { return scale_color("Regression line"); });
    $scope.displayLegend()
  }

  $scope.displayTradeoffLine = function(rData) {
    svg = $scope.svg
    scale_x = $scope.scale_x
    scale_y = $scope.scale_y
    scale_color = $scope.scale_color

    svg.append("g")
        .selectAll(".dot")
            .data(rData)
            .enter().append("circle")
            .attr("class","dot")
            .attr("r", 3.5)
            .attr("cx", function(d) {return scale_x(d.x);})
            .attr("cy", function(d) {return scale_y(d.y);})
            .style("fill", function(d) { return scale_color("Regression line"); });
    //$scope.displayLegend()
  }


  // MAIN CODE STARTS HERE
	x = linspace(0,20,0.1)
    $scope.w = [100,3,5]
	$scope.nf = 1000 // noise factor
    y_orig = generateData(x,$scope.w,0)['y']


	$scope.setupd3();
    svg = $scope.svg
    scale_x = $scope.scale_x
    scale_y = $scope.scale_y
    scale_color = $scope.scale_color

    degrees = linspace(1,30,1)
    errors = []
    mc_iter = 10
    for(it=0;it<degrees.length;it++){
        degree = degrees[it]
        error_sum = 0
        for(mc_it = 0; mc_it<mc_iter;mc_it++) {
            data = generateData(x, $scope.w, $scope.nf) // gives data as array of dict{x,y}
            rResult = fitDataClosedForm(data, degree)
            error_sum = error_sum + compute_RMSE(y_orig, rResult['yhat'])
            //console.log(compute_RMSE(y_orig, rResult['yhat']))
        }
        errors.push(error_sum/mc_iter)
        //scale_x.domain([0, d3.max(data.x)])
        //scale_y.domain([0, d3.max(data.y)])
        //rData = transformData({x: data.x, y: rResult.yhat});
        //$scope.displayRegLine(rData)
    }

    console.log(errors)
    eData = transformData({x:degrees,y:errors})

    // Plot the degree error curve
    scale_x.domain([0, d3.max(degrees)])
    scale_y.domain([0, d3.max(errors)])
    $scope.displayTradeoffLine(eData)

	//data_r = transformDataReg(data, model_degree)	// gives data as arrays of array [x,y]
	//rResult = fitData(data_r)
	//console.log(transformData(data));
	//$scope.displayData();


    // write code to generate tradeoff line and put data in var data

	//$scope.displayTradeOffLine()
});
