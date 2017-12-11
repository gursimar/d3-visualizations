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
    
  var min = 100000//d3.min(errors)
  var max = 0//d3.max(errors)


function generateBiasVarData(){
  // learn multiple models and aggregate their errors
  var errors = []
  var mc_iter = 500
  nf_t = nf*10
  // it uses same x and nf
  var y_orig_t = generateData(x,w,nf_t)['y']
  for(it=0;it<mc_iter;it++){
      var data_t = generateData(x, w, nf_t) // gives data as array of dict{x,y}
      y_orig_t = data_t['y'] // BE CAREFUL FOR THIS
      var rResult_t = fitDataClosedForm(data_t, model_degree)
      var y_hat_t = rResult_t['yhat']
      errors.push(compute_RMSE(y_orig_t, y_hat_t))
  }
  // max no of errors cant be more than 4
  if (b_data.length >=4) {
    // remove the first element
    b_data.splice(0,1)
  }
  b_data.push(errors)

  if (d3.max(errors) > max){
    max = d3.max(errors)
  }
  if (d3.min(errors) < min){
    min = d3.min(errors)
  }

  reDrawBoxes()

  // to display stuff
  var stats = computeMeanStd(b_data)
  console.log(stats)
  console.log("Mean (bias) -> " + stats[0])
  console.log("Variance (var) -> " + stats[1])
}

function generateBiasVarData2(){
  // learn multiple models and aggregate their errors
  var errors = []
  var mc_iter = 100

  var x_new = linspace(-4,12,0.1)
  var y_test_gen = generateData(x_new,w,0)['y']
  nf_t = nf*20

  // it uses same x and nf
  for(it=0;it<mc_iter;it++){
      var data_ta = generateData(x, w, nf_t) // gives data as array of dict{x,y}
      var rResult_t = fitDataClosedForm(data_ta, model_degree)
      var y_hat_t = generateData(x_new,rResult_t.model,0)['y'] 
      errors.push(compute_RMSE(y_test_gen, y_hat_t))
  }
  
  // max no of errors cant be more than 4
  if (b_data.length >=4) {
    // remove the first element
    b_data.splice(0,1)
  }
  b_data.push(errors)

  var max_sub = d3.max(errors)
  var min_sub = d3.min(errors)
  
  //var err_st = findDistStats(errors)
  //var max_sub = err_st['95']
  //var min_sub = err_st['5']

  if (max_sub > max){
    max = max_sub
  }
  if (min_sub < min){
    min = min_sub
  }

  reDrawBoxes()

  // to display stuff
  var stats = computeMeanStd(b_data)
  //console.log(errors)
  console.log("Mean (bias) -> " + stats[0])
  console.log("Variance (var) -> " + stats[1])
}

function reDrawBoxes() {

  d3.select("#plot-2").selectAll("svg").remove();
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
  var result_mean = []
  var result_var = []
  for (i=0; i<errors.length; i++){
    result_mean.push(d3.mean(errors[i]))
    result_var.push(d3.variance(errors[i]))    
  }
  return [result_mean, result_var]
}

function clearBoxes() {
  max = 0
  min = 100000
  b_data = []
  d3.select("#plot-2").selectAll("svg").remove();
}