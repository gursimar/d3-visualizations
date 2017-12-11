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
    
  var min = 0//d3.min(errors)
  var max = 50//d3.max(errors)


function generateBiasVarData2(){
  // learn multiple models and aggregate their errors
  var errors = []
  var mc_iter = 100

  // it uses same x and nf
  var y_orig_t = generateData(x,w,0)['y']
  for(it=0;it<mc_iter;it++){
      var data_t = generateData(x, w, nf) // gives data as array of dict{x,y}
      var rResult_t = fitDataClosedForm(data_t, model_degree)
      var y_hat_t = rResult_t['yhat']
      errors.push(compute_RMSE(y_orig_t, y_hat_t))
  }
  b_data.push(errors)
  reDrawBoxes()

  // to display stuff
  console.log(b_data)
  var stats = computeMeanStd(errors)
  console.log("Mean (bias) -> " + stats[0])
  console.log("Variance (var) -> " + stats[1])
}

function generateBiasVarData(){
  // learn multiple models and aggregate their errors
  var errors = []
  var mc_iter = 100

  var x_new = linspace(-50,50,1)
  var y_test_gen = generateData(x_new,w,0)['y']

  // it uses same x and nf
  for(it=0;it<mc_iter;it++){
      var data_t = generateData(x, w, nf) // gives data as array of dict{x,y}
      var rResult_t = fitDataClosedForm(data_t, model_degree)

      var y_hat_t = generateData(x_new,rResult.model,0)['y'] 
      errors.push(compute_RMSE(y_test_gen, y_hat_t))
  }
  b_data.push(errors)
  if (d3.max(errors) > max){
    max = d3.max(errors)
  }
  reDrawBoxes()

  // to display stuff
  var stats = computeMeanStd(errors)
  console.log(errors)
  console.log("Mean (bias) -> " + stats[0])
  console.log("Variance (var) -> " + stats[1])
}

function reDrawBoxes() {
  chart.domain([min, max]); // CHECK THIS
  var svg = d3.select("#plot-2").selectAll("svg")
      .data(b_data)
      .enter().append("svg")
      .attr("class", "box")
      .attr("width", b_width + b_margin.left + b_margin.right)
      .attr("height", b_height + b_margin.bottom + b_margin.top)
      .append("g")
      .attr("transform", "translate(" + b_margin.left + "," + b_margin.top + ")")
      .call(chart);
}

function computeMeanStd(errors){
  var result = []
  result.push(d3.mean(errors))
  result.push(d3.variance(errors))
  return result
}

function clearBoxes() {
  b_data = []
  d3.select("#plot-2").selectAll("svg").remove();
}