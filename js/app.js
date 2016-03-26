$(function(){
	var submissions = 0;

	//On load hiding the audio play and results table
	$("#results").css("display", "none");

	//Search Submission Handler
	$('#submit').click(SendArtistData);

	function SendArtistData() {
		var artistName = $('#search').val(); // get the value of the tags the user submitted

		if(submissions === 0) {
			findArtist(artistName);
			hideInstructions();
		} else {
			location.reload();
		}
		++submissions;

	}

	function hideInstructions() {
		$("header > p").hide();

		if ( $(window).width() < 1000) {
			$("#search_form").css("margin", "0 auto 2em auto");
		}
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
	  	.done(function (results) {
	  		getSongs(results);
	  	})
	  	.fail(function(jqXHR, error, errorThrown){
			alert("Something went wrong! - " + errorThrown);
		});

	};

	function getSongs(results) {
				
		// need to figure out how to get the ID from Spotify that matches the artist name the user types in
		$.ajax({
	 	 	url: 'https://api.spotify.com/v1/artists/' + results.artists.items[0].id + '/top-tracks?country=US',
	  		method: 'GET',
	  	})
	  	.done(function (results) {
	  		$("#results").css("display", "block");

	  		for(i = 0; i < 10; i++) {
	  			var trackURL = results.tracks[i].preview_url;
	  			//var trackURL = JSON.stringify(results.tracks[i].preview_url).replace(/\"/g, "");
	  			if($(window).width() < 1000) {
	  				var albumArt = results.tracks[i].album.images[0].url;
	  			} else {
	  				var albumArt = results.tracks[i].album.images[1].url;
	  			}

	  			var songName = results.tracks[i].name;
	  			var albumName = results.tracks[i].album.name;

				$('#resultsHeadings').after("<tr class='tracks'>" + "<td>" + songName + "</td>" + "<td class='hidden'>" + trackURL + "</td>" + "<td class='play_button'><i class='fa fa-play-circle'></i></td></tr>");  

				playSongs(trackURL, albumArt, songName, albumName);
				showPlayer();
		  		hidePlayer();	
		  		pauseSongs();
		  		replaySongs();
	  		}
	  		
	  	})
	  	.fail(function(jqXHR, error, errorThrown){
			alert("Please type in an artist's name.");
		});

	};

	function showPlayer() {

		$(".fa-play-circle").click(function(){
			$("#audioPlayer").show("slide", { direction: "right" });

			if ( $(window).width() < 1000) {
				$("#search_form, #results, header > p").hide("slide", { direction: "left" });
			}
			
			$("header").css("padding", "20px 20px 0px 20px");
		});

	}

	function hidePlayer() {

		$("#mobile_back > p").click(function(){
			$("#audioPlayer").hide("slide", { direction: "right" });
			
			if ( $(window).width() < 1000) {
				$("#search_form, #results").show("slide", { direction: "left" });
			}

			$("header").css("padding", "20px");
		});

	}

	function playSongs(trackURL, albumArt, songName, albumName) {

			  			console.log(trackURL);

		$("tr").each(function(){
		  	$(this).on("click", function() {			
		  		$("source").attr("src", trackURL);
		  		$(".album_art").attr('src', albumArt);
		  		$("#song_name_display").html("<p>" + songName + "</p><p class='album'>" + albumName + "</p>");
				$("audio").load();
				//console.log('Results: ' + ($(this).html()));
				$("audio").trigger('play');
				$(".fa-pause").removeClass("active");
				$(".fa-play").addClass("active");
				$(this).cells[1].text();

			});
		});

	}

	function pauseSongs() {

		$(".fa-pause").on("click", function() {
			$(".fa-play").removeClass("active");
			$(".fa-pause").addClass("active");	
			$("audio").trigger('pause');
		});

	}

	function replaySongs() {

		$(".fa-play").on("click", function() {
			$(".fa-pause").removeClass("active");
			$(".fa-play").addClass("active");
			$("audio").trigger('play');
		});

	}


});
