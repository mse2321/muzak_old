$(function(){

	$("#audioplayer, #results").css("display", "none");

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
		
		// need to figure out how to get the ID from Spotify that matches the artist name the user types in
		$.ajax({
	 	 	url: 'https://api.spotify.com/v1/artists/' + '43ZHCT0cAZBISjO8DG9PnE' + '/top-tracks?country=US',
	  		method: 'GET',
	  	})
	  	.done(function (results) {
	  		var audioURL = JSON.stringify(results.tracks[1].preview_url);
	  		console.log(audioURL);


	  		$("#results").css("display", "block");

	  		$("#resultsData").each(function() {
	  			$('#resultsData').html("<td>" + JSON.stringify(results.tracks[1].artists[0].name) + "</td>" + "<td>" + JSON.stringify(results.tracks[1].name) + "</td>"
	  			+ "<td>" + JSON.stringify(results.tracks[1].album.name) + "</td>" +	"<td><i class='fa fa-play-circle'></i></td>");
	  			$("source").attr("src", audioURL); //Need to be able to remove spaces from url when request is sent to retrieve file
	  			$(".fa-play-circle").on("click", function() { 
		  			$("#audioplayer").css("display", "block");
		  			$("audio").load();
				    $("audio").trigger('play');
				})
	  		})
	  	})
	  	.fail(function(jqXHR, error, errorThrown){
			var errorElem = showError(error);
			$('#ResultsData').append(errorElem);
		});

		/*
		 */

	};

});
