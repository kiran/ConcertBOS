$(function() {
		$( "#price-filter" ).slider({
			range: "min",
			value: 37,
			min: 1,
			max: 100,
			slide: function( event, ui ) {
				$( "#amount" ).html( "$" + ui.value );
			}
		});
		$( "#amount" ).html( "$" + $( "#price-filter" ).slider( "value" ) );
});