$(function() {
		$( "#price-filter" ).slider({
			range: "min",
			value: 50,
			min: 1,
			max: 100,
			step: 10,
			slide: function( event, ui ) {
				$( "#amount" ).html( "$" + ui.value );
				maxP = ui.value;
				window.paint();
			}
		});
		$( "#amount" ).html( "$" + $( "#price-filter" ).slider( "value" ) );
});