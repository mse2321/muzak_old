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
		var tags = $(this).find("input[name='tags']").val();
		getResults(tags);
	});


// ************** code from stackerAJAX ****************

	// this function takes the question object returned by StackOverflow 
	// and creates new result to be appended to DOM
	var showQuestion = function(question) {
	
	// clone our result template code
	var result = $('.templates .question').clone();
	//var resultAnswerers = $('.templates .question').clone();
	
	// Set the question properties in result
	var questionElem = result.find('.question-text a');
	questionElem.attr('href', question.link);
	questionElem.text(question.title);

	return result;
	};

	// this function takes the results object from StackOverflow
	// and creates info about search results to be appended to DOM
	var showSearchResults = function(query, resultNum) {
		var results = resultNum + ' results for <strong>' + query;
		return results;
	};

	// takes error string and turns it into displayable DOM element
	var showError = function(error){
		var errorElem = $('.templates .error').clone();
		var errorText = '<p>' + error + '</p>';
		errorElem.append(errorText);
	};

	// takes a string of semi-colon separated tags to be searched
	// for on StackOverflow
	var getResults = function(tags) {
		
		// the parameters we need to pass in our request to StackOverflow's API
		/* var q = {
								name: 'korn',
								type: 'artist, album, playlist, track'}; */
	
		/*var result = $.ajax({
			url: "https://api.spotify.com/v1/search",
			data: q,
			dataType: "jsonp",
			type: "GET",
			}) */

		
		$.ajax({
	 	 	url: 'https://api.spotify.com/v1/search?q=name:' + 'korn' + '&type=' + 'track',
	  		method: 'GET',
	  		})
	  		.done(function (results) {
	  		alert(JSON.stringify(results));
	  	});
	  		encodeURI('marcus eubanks');

		/* .done(function(result){
			var searchResults = showSearchResults(request.tagged, result.items.length);

			$('.search-results').html(searchResults);

			$.each(result.items, function(i, item) {
				var question = showQuestion(item);
				$('.results').append(question);
			});
		})
		.fail(function(jqXHR, error, errorThrown){
			var errorElem = showError(error);
			$('.search-results').append(errorElem);
		}); */

	};

});
