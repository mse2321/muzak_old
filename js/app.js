$(function(){

	$("#audioplayer, #results").css("display", "none");

	$('#submit').click( function(event){
		// zero out results if previous search has run
		$('.results').html('');
		// get the value of the tags the user submitted
		var artistName = $('#search').val();
		findArtist(artistName);
	});

	var findArtist = function(artistName) {
		
		// need to figure out how to get the ID from Spotify that matches the artist name the user types in
		$.ajax({
	 	 	url: 'https://api.spotify.com/v1/search/',
	 	 	data: {
		  		q: artistName,
		  		type: "artist"
	  		}
	  	})
	  	.done(function (results1) {

	  		console.log(JSON.stringify(results1.artists.items[0].name));
	  		getSongs(results1);
	  	})
	  	.fail(function(jqXHR, error, errorThrown){
			alert("Something went wrong! - " + errorThrown);
		});

		/*
		 */

	};

	function getSongs(results1) {
				
		// need to figure out how to get the ID from Spotify that matches the artist name the user types in
		$.ajax({
	 	 	url: 'https://api.spotify.com/v1/artists/' + results1.artists.items[0].id + '/top-tracks?country=US',
	  		method: 'GET',
	  	})
	  	.done(function (results2) {
	  		$("#results").css("display", "block");

	  		for(i = 0; i < 11; i++) {
	  			var trackURL = JSON.stringify(results2.tracks[i].preview_url).replace(/\"/g, "");

		  		$('#resultsHeadings').after("<tr>" + "<td>" + JSON.stringify(results2.tracks[i].name).replace(/\"/g, "") + "</td>"
		  		+ "<td>" + JSON.stringify(results2.tracks[i].album.name).replace(/\"/g, "") + "</td>" +	"<td><a href='" + trackURL + "' target='_blank'><i class='fa fa-play-circle'></i></a></td></tr>");
		  		//playSongs(trackURL);
	  		}
	  		
	  	})
	  	.fail(function(jqXHR, error, errorThrown){
			alert("Something went wrong! - " + errorThrown);
		});

	};

	// need to figure out how to play the individual files within Muzak
	/* function playSongs(trackURL) {
		$(".fa-play-circle").each(function(){
		  	$(this).on("click", function() {
				console.log(trackURL);
		  		$("source").attr("src", trackURL); //Need to be able to remove spaces from url when request is sent to retrieve file
				$("#audioplayer").css("display", "block");
				$("audio").load();
				$("audio").trigger('play');

			});
		});
	} */

});
