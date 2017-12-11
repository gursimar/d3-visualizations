// some utility functions
function linspace(a,b,d){
	var result = []
	var no = (b-a)/d + 1;
	for (i=0;i<no;i++){
		result[i] = a + i*d;
	}
	return result
}

function transformData(data){
	// takes an array of two dictionaries x:[],y:[]
	// returns array of dictionaries of [{x,y}]
	var tData = []
	for (i=0; i< data.x.length; i++){
		tData[i] = {
			x:data.x[i],
			y:data.y[i]
		}
	}
	return tData
}

// data generation functions
function _polyBasis(x,n){
	var resultMat = math.ones(x.length,1)
	for (i=1;i<=n;i++){
		var nthBasis = math.matrix(x).map(function(d){return Math.pow(d,i)})
		math.reshape(nthBasis,[x.length,1])
		resultMat = math.concat(resultMat, nthBasis)
	}
	return resultMat;
}

function generateData(x,w,nf){
	var noise = math.ones(x.length).map(function(d){return Math.random()*nf})
	var xDataMat = _polyBasis(x,w.length-1)

	//const yDataMat = math.add(math.multiply(xDataMat,w),b)	//wx+b
	const yDataMat = math.multiply(xDataMat,w)	//wx+b
	var yDataMatNoise = math.add(yDataMat, noise)

	var result = {
		x:x,
		y:yDataMatNoise.valueOf()
	}
	return result
}

function fitDataClosedForm(data, model_degree){
	var x = data.x
	var y = data.y
	var xDataMat = _polyBasis(x,model_degree)
	var yDataMat = math.matrix(y)
	math.reshape(yDataMat,[y.length,1])
	//console.log(xDataMat)
	//console.log(yDataMat)

	var tr = math.transpose(xDataMat);
	var tr_X = math.multiply(tr, xDataMat);
	var tr_y = math.multiply(tr, yDataMat);
	var theta = math.multiply( math.inv(tr_X), tr_y );
	var yhat = math.multiply(xDataMat,theta)
	//console.log	(yhat)

	// some transformation required
	var newTheta = []
	var simar = theta.valueOf()
	//console.log(simar)
	for (i = 0; i<simar.length; i++){
		newTheta.push(simar[i][0])
	}
	//console.log(newTheta)

	var result = {
		model:newTheta,
		yhat:yhat.valueOf()
	}
	return result
}	

function splitData(data, r){
	// splits data into train and test

}


// Error functions

function compute_RMSE(y_orig_temp, y_hat){
    var error = 0
    for(i=0;i<y_orig_temp.length;i++){
        error = error + Math.pow((y_orig_temp[i] - y_hat[i]),2)
    }
    return Math.sqrt(error)/y_orig_temp.length
}

function computeErrorTrain(){
	// computes error between y_orig_with_noise and y_predicted
	var y_orig_noise = data['y']
	var y_hat = rResult['yhat']
	var error = compute_RMSE(y_orig_noise, y_hat)
	return error
}

function computeErrorTrainWN(){ //WRONG
	// computes error between y_orig_with_noise and y_predicted
	var y_orig =  generateData(x,w,0)['y']
	var y_hat = rResult['yhat'] 
	var error = compute_RMSE(y_orig, y_hat)
	return error
}

function computeErrorTest(){
	// resamples distribution 
	//// will have to think over it
	var y_test_noise = generateData(x,w,nf)['y']
	var y_hat = rResult['yhat']
	var error = compute_RMSE(y_test_noise, y_hat)
	return error
}

function computeErrorGeneralization(){
	// resamples distribution 
	var x_new = linspace(-50,50,1)
	var y_test_gen = generateData(x_new,w,0)['y']
	var y_hat = generateData(x_new,rResult.model,0)['y']
	var error = compute_RMSE(y_test_gen, y_hat)
	return error
}


function standardizeData(data_simar) {
	var mean_simar = d3.mean(data_simar)
	for (i=0;i<data_simar.length; i++) {

	}
}

function findDistStats(data_simar){
	data_sim = data_simar.slice()
	data_sim.sort()
	var result = {
		'95': d3.quantile(data_sim, 1),
		'80': d3.quantile(data_sim, .80),
		'20': d3.quantile(data_sim, .20),
		'5': d3.quantile(data_sim, 0)
	}

	return result
}

////////////////////////////////// UNSED FUNCTIONS ///////////////////////////////

function gradientDescent (xDataMat, yDataMat) {
    var N = data.length, X = [], Y = [];
    this.dim = data[0].length;

    console.log(X)
    console.log(Y)
    
    this.theta = [];
    
    for (var d = 0; d < this.dim; ++d) {
        this.theta.push(Math.random());
    }
    
    for (var k = 0; k < this.iterations; ++k) {
        var Vx = this.grad(X, Y, this.theta);
        
        for(var d = 0; d < this.dim; ++d) {
            this.theta[d] = this.theta[d] - this.alpha * Vx[d];
        }
        
        if(this.trace) {
            console.log('cost at iteration ' + k + ': ' + this.cost(X, Y, this.theta));
            console.log(this.theta)
        }
    }
    
    return {
        theta: this.theta,
        dim: this.dim,
        cost: this.cost(X, Y, this.theta),
        config: {
            alpha: this.alpha,
            lambda: this.lambda,
            iterations: this.iterations 
        }
    };
}

function leastSquaresGradient(X,y,theta){
	// https://www.robinwieruch.de/linear-algebra-matrix-javascript/
	// This link has simple idea to code the gradient
	// Then I will have to modify the above GD function

}

function transformDataReg(data,n){
	length = data.x.length
	result = []
	//result = {x:[],xy:[]}

	// not using polybasis intentionally
	for (i=0;i<length;i++){
		x = data.x[i]
		y = data.y[i]
		//basis = [1]
		basis = []
		for (j=1;j<=n;j++){
			basis.push(Math.pow(x,j))
		}
		//result.x.push(basis)
		basis.push(y)
		//result.xy.push(basis)
		result.push(basis)
	}
	return result
}

// regression function
function fitData(data){
	var regressor = new jsregression.LinearRegression({
		alpha: 0.001,
		iterations: 1000,
		lambda: 0.0,
		trace: true
	});
	var model = regressor.fit(data)
	console.log(model)
	//x_data = data.map()
	yhat = regressor.transform(data)
	result = {
		model:model,
		yhat:yhat
	}
	return result
}



