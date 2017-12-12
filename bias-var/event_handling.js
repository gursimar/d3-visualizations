// EVENT HANDLING
//$("#data_1").click(function() {
$("#DS_c").click(function() {
	//this.className+=' selected'
	$( "#DS_c" ).addClass("selected" );
	$( "#DS_b" ).removeClass("selected" );
	$( "#DS_a" ).removeClass("selected" );
	w_ind = 0
	data = createData()
	clearBoxes()
	clearBars()
	drawData(data);
});

//$("#data_2").click(function() {
$("#DS_a").click(function() {
	$( "#DS_b" ).removeClass("selected" );
	$( "#DS_a" ).addClass("selected" );
	$( "#DS_c" ).removeClass("selected" );
	w_ind = 1
	data = createData()
	clearBoxes()
	clearBars()
	drawData(data);
});


//$("#data_3").click(function() {
$("#DS_b").click(function() {
	$( "#DS_a" ).removeClass("selected" );
	$( "#DS_c" ).removeClass("selected" );
	$( "#DS_b" ).addClass("selected" );
	w_ind = 2
	data = createData()
	clearBoxes()
	clearBars()
	drawData(data);
});

$("#zoom").hover(function(){
	//this.font-size = 25px;
	showBigPicture()
},function(){
	showActualPicture()	
});


// we can capture events d3 way as well!!
d3.select('#polydegree').on('change', function() {
    console.log("NEW P", this.value)
    var new_text = 'POLYNOMIAL DEGREE (' + this.value + ')'
    $('#poly_text').text(new_text)
    learnDrawCurve(this.value)
})
