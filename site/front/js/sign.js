function call() {
	var msg   = $('#forr').serialize();
	    $.ajax({
	    	type: 'POST',
		    url: 'http://localhost/sign', // url страницы
		    data: msg,
		    success: function(data) {
		        $('#results').html(data);
		    },
		    error:  function(xhr, str){
			    alert('Возникла ошибка: ' + xhr.responseCode);
		    }
		}); 
}
