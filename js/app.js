var demo = angular.module('demo', []);


	// gets artist
	demo.factory('artist', function($http){
	            return function(artistName){
	              return $http ({ 
	                method: 'GET', 
	                url: 'https://api.spotify.com/v1/search/',
	                params: {
			  			q: artistName,
			  			type: "artist"
		  			}
	              })
	            };
	}); // end of artist

	// gets songs
	demo.factory('songs', function($http){
	            return function(artist_id){
	              return $http ({ 
	                method: 'GET', 
	                url: 'https://api.spotify.com/v1/artists/' + artist_id + '/top-tracks?country=US'
	                //params: {callback: 'JSON_CALLBACK'}
	              })
	            };
	}); // end of songs

	demo.controller('ctrl', function($scope, artist, songs){
		$scope.submissions = 0;

		$scope.sendArtistData = function() {
			$scope.artistName = $('#search').val(); // get the value of the tags the user submitted

			if($scope.submissions === 0) {
				$scope.findArtist($scope.artistName);
			} else {
				location.reload();
			}
			++$scope.submissions;
		};

		$scope.findArtist =  function(artistName) {

			//$scope.artistName = artistName.;
			console.log(artistName);

		  	artist(artistName).success(function (results) {
		  		console.log(results);
		  		$scope.getSongs(results);
		  	})
		  	.error(function(results){
				console.log("Error!");
				console.log(results);
			});

			$("#results").show();

		};

		$scope.getSongs = function(results) {

			$scope.artist_id = results.artists.items[0].id;
			console.log($scope.artist_id);
				
		  	songs($scope.artist_id).success(function (results2) {

		  		console.log(results2);
		  	
		  		$scope.tracks_list = [];

		  		for(i = 0; i < 10; i++) {

		  			$scope.songName = results2.tracks[i].name;
		  			$scope.albumArt = results2.tracks[i].album.images[1].url;
		  			$scope.track_url = results2.tracks[i].preview_url;
		  			$scope.albumName = results2.tracks[i].album.name;
		  			$scope.song_index = i;
		  			
		  			$scope.track_item = {
						name: $scope.songName,
						albumName: $scope.albumName,
						track_url: $scope.track_url,
						albumArt: $scope.albumArt,
						id: $scope.song_index
					}; 

					$scope.tracks_list.push($scope.track_item);

		  		};
		  		
		  	})
		  	.error(function(results){
				console.log("Error!" + results);
			});

		};

	$scope.showPlayer = function() {

		if ( $(window).width() < 1000) {
				$("#audioPlayer").show("slide", { direction: "right" });
				$("#search_form, #results, header > p").hide("slide", { direction: "left" });
			}
			
			$("header").css("padding", "20px 20px 0px 20px");
	};

	$scope.hidePlayer = function() {

		if ( $(window).width() < 1000) {
				$("#audioPlayer").hide("slide", { direction: "right" });
				$("#search_form, #results").show("slide", { direction: "left" });
			}

			$("header").css("padding", "20px");

	};

	$scope.playSongs = function(id) {

		$scope.itemNumber = id;
		console.log($scope.itemNumber);

		$("source").attr("src", $scope.tracks_list[$scope.itemNumber].track_url);
		$(".album_art").attr('src', $scope.tracks_list[$scope.itemNumber].albumArt);
		$("#song_name_display").html("<p>" + $scope.tracks_list[$scope.itemNumber].name + "</p><p class='album'>" + $scope.tracks_list[$scope.itemNumber].albumName + "</p>");
		$("audio").load();
		$("#audioPlayer").show();
		$("#music").trigger('play');
		$(".fa-pause").removeClass("active");
		$(".fa-play").addClass("active");
	};

	$scope.pauseSongs = function() {
		$(".fa-play").removeClass("active");
		$(".fa-pause").addClass("active");	
		$("#music").trigger("pause");
	};

	$scope.replaySongs = function() {
		$(".fa-pause").removeClass("active");
		$(".fa-play").addClass("active");
		$("#music").trigger("play");
	};

})
demo.directive('audioPlayer', function() {
	return {
		templateUrl: 'audioPlayer.html',
		restrict: 'E',
		scope: true,
		transclude: true
	}
});