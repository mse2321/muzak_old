$(function(){

	//loads song
	var song = $("#song")[0];

	//play controls
	$(".glyphicon-pause").on("click", function() {
	    $(".glyphicon-pause").blur();
	    $(".glyphicon-pause").addClass("active");
	    $(".glyphicon-play").removeClass("active");
	    audioElement.pause();
	});

	$(".glyphicon-play, .fa-play-circle").on("click", function() { 
	    $(".glyphicon-play").blur();
	    $(".glyphicon-play").addClass("active");
	    $(".glyphicon-pause").removeClass("active");
	    audioElement.play();
	});

	$(".glyphicon-stop").on("click", function() {
	    $(".glyphicon-stop").blur();
	    $(".glyphicon-play").removeClass("active");
	    $(".glyphicon-pause").removeClass("active");
	    song.pause();
	    song.currentTime = 0;
	});

	$('#submit').click( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var artistName = $('#search').val();
		getResults(artistName);
	});

	var getResults = function(artistName) {
		
		var q = {
								name: artistName,
								type: 'artist'};

		var nameURL = encodeURI(q.name);
		
		$.ajax({
	 	 	url: 'https://api.spotify.com/v1/search?q=' + nameURL + '&type=' + q.type,
	  		method: 'GET',
	  		})
	  		.done(function (results) {
	  		//console.log(JSON.stringify(results));
	  		$('#resultsData').html("<td>" + (JSON.stringify(results)) + "</td>");
	  	});

		/*
		.fail(function(jqXHR, error, errorThrown){
			var errorElem = showError(error);
			$('.search-results').append(errorElem);
		}); */

	};

});
