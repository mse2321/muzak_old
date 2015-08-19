$(function(){
	var submissions = 0;

	//On load hiding the audio play and results table
	$("#audioplayer, #results").css("display", "none");

	//Search Submission Handler
	$('#submit').click(SendArtistData); 


	function SendArtistData() {
		var artistName = $('#search').val(); // get the value of the tags the user submitted
		console.log(artistName);

		if(submissions === 0) {
			findArtist(artistName);
		} else {
			location.reload();
		}
		++submissions;
	}

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

		  		$('#resultsHeadings').after("<tr class='tracks'>" + "<td>" + JSON.stringify(results2.tracks[i].name).replace(/\"/g, "") + "</td>"
		  		+ "<td>" + JSON.stringify(results2.tracks[i].album.name).replace(/\"/g, "") + "</td>" +	"<td class='hidden'>" + trackURL + "</td>" + "<td><i class='fa fa-play-circle'></i></td></tr>");
		  		playSongs(trackURL);
	  		}
	  		
	  	})
	  	.fail(function(jqXHR, error, errorThrown){
			alert("Please type in an artist's name.");
		});

	};

	// need to figure out how to play the individual files within Muzak
	function playSongs(trackURL) {
		$(".fa-play-circle").each(function(){
		  	$(this).on("click", function() {
				console.log(trackURL);
		  		$("source").attr("src", trackURL); //Need to be able to remove spaces from url when request is sent to retrieve file
				$("#audioplayer").css("display", "block");
				$("audio").load();
				$("audio").trigger('play');
				$(this)[0].cells[1].innerText;
			});
		});
	}

});
