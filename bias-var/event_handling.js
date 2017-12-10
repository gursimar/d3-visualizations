// EVENT HANDLING
$("#data_1").click(function() {
	x = linspace(-7,10,0.1)
	w = [-5,50,1]
	nf = 100
	data = generateData(x,w,nf)
	drawData();
});

$("#data_2").click(function() {
	x = linspace(-7,10,0.1)
	nf = 100
	w = [5, 6, 2, 3] // 5 + 6x + 2x_2 + 3x_3
	//w = [-95,126,-61,10,-1]
	data = generateData(x,w,nf)
	drawData();
});


$("#data_3").click(function() {
	x = linspace(-7,10,0.1)
	nf = 100
	w = [7,4,-1,10,-1]
	data = generateData(x,w,nf)
	drawData();
});