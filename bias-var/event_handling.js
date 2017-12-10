// EVENT HANDLING
$("#data_1").click(function() {
	w_ind = 0
	data = createData()
	drawData(data);
});

$("#data_2").click(function() {
	w_ind = 1
	data = createData()
	drawData(data);
});


$("#data_3").click(function() {
	w_ind = 2
	data = createData()
	drawData(data);
});