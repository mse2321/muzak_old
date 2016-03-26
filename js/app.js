var demo = angular.module('demo', []);

	demo.controller('ctrl', function($scope){
		$scope.submissions = 0;

		$scope.sendArtistData = function() {
			$scope.artistName = $('#search').val(); // get the value of the tags the user submitted

			if($scope.submissions === 0) {
				$scope.findArtist($scope.artistName);
				$scope.hideInstructions();
			} else {
				location.reload();
			}
			++$scope.submissions;
		};

		$scope.hideInstructions = function() {
			$("header > p").hide();

			if ( $(window).width() < 1000) {
				$("#search_form").css("margin", "0 auto 2em auto");
			}
		};

		$scope.findArtist =  function(artistName) {
		
			$.ajax({
		 	 	url: 'https://api.spotify.com/v1/search/',
		 	 	data: {
			  		q: artistName,
			  		type: "artist"
		  		}
		  	})
		  	.done(function (results) {
		  		$scope.getSongs(results);
		  	})
		  	.fail(function(jqXHR, error, errorThrown){
				alert("Something went wrong! - " + errorThrown);
			});

		};

		$scope.getSongs = function(results) {
				
			$.ajax({
		 	 	url: 'https://api.spotify.com/v1/artists/' + results.artists.items[0].id + '/top-tracks?country=US',
		  		method: 'GET',
		  	})
		  	.done(function (results) {

		  		$scope.data = results;
		  		$scope.tracks_list = [];

		  		for(i = 0; i < 10; i++) {

		  			$scope.songName = $scope.data.tracks[i].name;
		  			$scope.albumArt = $scope.data.tracks[i].album.images[1].url;
		  			$scope.track_url = $scope.data.tracks[i].preview_url;
		  			$scope.albumName = $scope.data.tracks[i].album.name;
		  			
		  			$scope.track_item = {
						name: $scope.songName,
						albumName: $scope.albumName,
						track_url: $scope.track_url,
						albumArt: $scope.albumArt
					}; 

					$scope.tracks_list.push($scope.track_item);

		  		};
				/* $scope.playSongs($scope.track_url, $scope.albumArt, $scope.songName, $scope.albumName);
				$scope.showPlayer();
			  	$scope.hidePlayer();	
			  	$scope.pauseSongs();
			  	$scope.replaySongs(); */
		  		
		  	})
		  	.fail(function(jqXHR, error, errorThrown){
				alert("Please type in an artist's name.");
			});
			console.log($scope.tracks_list);

		};

	$scope.showPlayer = function() {

		$(".fa-play-circle").click(function(){
			$("#audioPlayer").show("slide", { direction: "right" });

			if ( $(window).width() < 1000) {
				$("#search_form, #results, header > p").hide("slide", { direction: "left" });
			}
			
			$("header").css("padding", "20px 20px 0px 20px");
		});

	};

	$scope.hidePlayer = function() {

		$("#mobile_back > p").click(function(){
			$("#audioPlayer").hide("slide", { direction: "right" });
			
			if ( $(window).width() < 1000) {
				$("#search_form, #results").show("slide", { direction: "left" });
			}

			$("header").css("padding", "20px");
		});

	};

	$scope.playSongs = function(track_url, albumArt, songName, albumName) {

		console.log(track_url);

		$("source").attr("src", track_url);
		$(".album_art").attr('src', albumArt);
		$("#song_name_display").html("<p>" + songName + "</p><p class='album'>" + albumName + "</p>");
		$("audio").load();
		$("audio").trigger('play');
		$(".fa-pause").removeClass("active");
		$(".fa-play").addClass("active");
		//$(this).track.track_url;

	};

	$scope.pauseSongs = function() {

		$(".fa-pause").on("click", function() {
			$(".fa-play").removeClass("active");
			$(".fa-pause").addClass("active");	
			$("audio").trigger('pause');
		});

	};

	$scope.replaySongs = function() {

		$(".fa-play").on("click", function() {
			$(".fa-pause").removeClass("active");
			$(".fa-play").addClass("active");
			$("audio").trigger('play');
		});

	};

});