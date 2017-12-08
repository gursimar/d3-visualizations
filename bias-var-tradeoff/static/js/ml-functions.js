/**
 * Created by simar on 21/11/17.
 */
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
		var tData = []
		for (i=0; i< data.x.length; i++){
			tData[i] = {
				x:data.x[i],
				y:data.y[i]
			}
		}
		return tData
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

	// data generation functions
	function polyBasis(x,n){
		var resultMat = math.ones(x.length,1)
		for (i=1;i<=n;i++){
			nthBasis = math.matrix(x).map(function(d){return Math.pow(d,i)})
			math.reshape(nthBasis,[x.length,1])
			resultMat = math.concat(resultMat, nthBasis)
		}
		return resultMat;
	}

	function generateData(x,w,nf){
		noise = math.ones(x.length).map(function(d){return Math.random()*nf})

		var xDataMat = polyBasis(x,w.length-1)

		//const yDataMat = math.add(math.multiply(xDataMat,w),b)	//wx+b
		var yDataMat = math.multiply(xDataMat,w)	//wx+b
		var yDataMatNoise = math.add(yDataMat, noise)

		result = {
			x:x,
			y:yDataMatNoise.valueOf()
		}
		return result
	}

	function generateRandomData(){

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

	function fitDataClosedForm(data, model_degree){
		x = data.x
		y = data.y
		xDataMat = polyBasis(x,model_degree)
		yDataMat = math.matrix(y)
		math.reshape(yDataMat,[y.length,1])
		//console.log(xDataMat)
		//console.log(yDataMat)

		var tr = math.transpose(xDataMat);
		var tr_X = math.multiply(tr, xDataMat);
		var tr_y = math.multiply(tr, yDataMat);
		var theta = math.multiply( math.inv(tr_X), tr_y );
		yhat = math.multiply(xDataMat,theta)
		//console.log	(yhat)
		//console.log	(theta)
		result = {
			model:theta.valueOf(),
			yhat:yhat.valueOf()
		}
		return result
    }

    function compute_RMSE(y_orig, y_hat){
	    error = 0
	    for(i=0;i<y_orig.length;i++){
	        error = error + Math.pow((y_orig[i] - y_hat[i]),2)
        }
        return Math.sqrt(error)/y_orig.length
    }