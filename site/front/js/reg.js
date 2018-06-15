function call() {
	var msg   = $('#formx').serialize();
	    $.ajax({
	    	type: 'POST',
			url: 'http://localhost/reg', // url страницы
		    data: msg,
		    success: function(data) {
		        $('#results').html(data);
		    },
		    error:  function(xhr, str){
			    alert('Возникла ошибка: ' + xhr.responseCode);
		    }
		});
		 
}

function valid() {
	var state = $("input[name='dock']:checked").val();
	if (!state) return $("#messg").html("<font style='color:red'>Укажите документ</font><br />")
	else alert(state)
}

