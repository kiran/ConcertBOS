$(function() {
		$("input[name='age']").change(radioValueChanged);

		function radioValueChanged(event)
    {
			window.paint();
			window.fpaint();
			fixCalendar();
    }

    function fixCalendar(event) {
        eighteen = ($('#eighteen').attr('checked') == 'checked'); //under 18
        twentyOne = ($('#twentyone').attr('checked') == 'checked'); //under 21

        if (eighteen) {
            $('.over18').css('background-color', 'lightgray');
            $('.over21').css('background-color', 'lightgray');
        } else if (twentyOne) {
            $('.over18').css('background-color', '');
            $('.over21').css('background-color', 'lightgray');
        } else {
            $('.over18, .over21').css('background-color','');
        }
    }
});

