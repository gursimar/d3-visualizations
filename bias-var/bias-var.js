function computeBiasVar(y_hats_a, y_orig_t_a){
  mc_runs = y_hats_a.length
  x_no = y_hats_a[0].length
  yhats_new = []


  for (i=0;i<x_no;i++){
    yhats_new.push([])
    for (j=0;j<mc_runs;j++){
      yhats_new[i].push(y_hats_a[j][i][0])
    }
  }

  biases = []
  variances = []
  residuals_simar = []
  for (i=0; i<x_no;i++) {
    mean_yhats_new_i = d3.mean(yhats_new[i])
    bias_t = Math.abs(mean_yhats_new_i - y_orig_t_a[i]) // bias is always +ve
    //bias_t = (mean_yhats_new_i - y_orig_t_a[i]) // bias is always +ve
    //console.log(mean_yhats_new_i - y_orig_t_a[i])
    biases.push(bias_t)

    residuals_st = [] 
    residuals_t = []
    for (j=0;j<mc_runs;j++){
      var term = Math.pow(yhats_new[i][j] - mean_yhats_new_i,2)
      residuals_t.push(term)
      residuals_st.push(yhats_new[i][j] - y_orig_t_a[i])
    }
    //console.log(residuals_t)
    residuals_simar.push(residuals_st)
    variances.push(d3.mean(residuals_t))
  }

  residuals_simar_avg = []
  for (j=0;j<mc_runs;j++){
    var summer_v = []
    for (i=0;i<x_no;i++){
      //summer_v.push(residuals_simar[i][j])
      summer_v.push(Math.abs(residuals_simar[i][j]))
    }
    residuals_simar_avg.push(d3.mean(summer_v))
  }


  result = {
    'yhats': residuals_simar_avg,
    'biases': biases,
    'variances': variances
  }
  return result

}


function generateBiasVarData(){
  // learn multiple models and aggregate their errors
  var errors = []
  var y_hats = []
  var mc_iter = 100
  nf_t = nf

  var y_orig_t = generateData(x,w,nf_t)['y']

  for(it=0;it<mc_iter;it++){
      var data_t = generateData(x, w, nf_t)
      //y_orig_t = data_t['y'] // BE CAREFUL FOR THIS
      var rResult_t = fitDataClosedForm(data_t, model_degree)
      var y_hat_t = rResult_t['yhat']
      
      // compute errors
      errors.push(compute_RMSE(y_orig_t, y_hat_t))

      // 
      y_hats.push(y_hat_t)
  }

  bv_arr = computeBiasVar(y_hats, y_orig_t)
  //console.log(bv_arr['biases'])
  var avg_bias = Math.abs(d3.mean(bv_arr['biases']))
  var avg_var = Math.abs(d3.mean(bv_arr['variances']))


  // max no of errors cant be more than 4
  if (b_data.length >=4) {
    // remove the first element
    b_data.splice(0,1)
  }

  errors = bv_arr['yhats']
  console.log(bv_arr['yhats'])
  // STUFF FOR BOX PLOT
  b_data.push(errors)

  if (d3.max(errors) > max){
    max = d3.max(errors)
  }
  if (d3.min(errors) < min){
    min = d3.min(errors)
  }
  reDrawBoxes()

  // STUFF FOR BAR PLOT
  if (bar_data.length >=4) {
    // remove the first element
    bar_data.splice(0,1)
  }

    bar_data.push({
    'model':'simar' + model_degree,
    'bias':Math.round(avg_bias),
    'variance':Math.round(avg_var)
    })

/*
  if (avg_bias > y0_max){
    y0_max = avg_bias
  }
  if (avg_var > y1_max){
    y1_max = avg_var
  }
  */
  //console.log(bar_data)
  reDrawBars()

  // to display stuff
  var stats = computeMeanStd([errors])
  //console.log(stats)
  console.log("Mean (bias) -> " + stats[0])
  console.log("Variance (var) -> " + stats[1])
  console.log("Mean (bias) -> " + avg_bias)
  console.log("Variance (var) -> " + avg_var)
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

function generateBiasVarData2(){
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

function generateBiasVarData3(){
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