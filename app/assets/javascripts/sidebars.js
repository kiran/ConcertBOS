$(function() {
		$("input[name='age']").change(radioValueChanged);

		function radioValueChanged(event)
    {
			window.paint();
			window.fpaint();
    }
});

