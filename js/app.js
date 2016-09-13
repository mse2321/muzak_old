var demo = angular.module("demo", []);

// gets artist from Spotify
demo.factory("artist", function($http){
	return function(artistName){
	    return $http ({ 
	        method: "GET", 
	        url: "https://api.spotify.com/v1/search/",
	        params: {
			  	q: artistName,
			  	type: "artist"
		  	}
	    })
	};
}); // end of artist

// gets songs from Spotify. Need to have some kind of placeholder for artist_id when a value is not present
demo.factory("songs", function($http){
	return function(artist_id){
	    return $http ({ 
	        method: "GET", 
	        url: "https://api.spotify.com/v1/artists/" + artist_id + "/top-tracks?country=US"
	    })
	};
}); // end of songs

// gets artist from Discogs
demo.factory("artist2", function($http){
	return function(artistName){
	    var secret_key = "OcuHHDfOEJrlKlNaLVAFCjBLzQqPfmvq";
	    return $http ({ 
	        method: "GET", 
	        url: "https://api.discogs.com//database/search?",
	        params: {
			  	q: artistName,
			  	type: "artist",
			  	key: "FrEJfCEeKbnHxmsEAvJA",
			  	secret: secret_key
		  	}
	    })
	};
}); // end of artist

// gets artist info from Discogs
demo.factory("info", function($http){
	return function(artist_id){
	    return $http ({ 
	        method: "GET", 
	        url: "https://api.discogs.com/artists/" + artist_id
	    })
	};
}); // end of songs

demo.controller("ctrl", function($scope, artist, songs, artist2, info){
	$scope.submissions = 0;

	$scope.sendArtistData = function(artistName) {
		$scope.artistName = artistName; // get the value of the tags the user submitted
		if($scope.submissions === 0 ) {
			$scope.findArtist($scope.artistName);
		} else {
			location.reload();
		}
		++$scope.submissions;
	};

	$scope.enterKeyPress = function(e) {
		$(document).keypress(function(e){
			if (e.which == 13) {
				$scope.sendArtistData();
			}
		})
	};

	$scope.findArtist =  function(artistName, newArtistId) {			
		artist(artistName).success(function (results) {
		  		//console.log(results);
		  		$scope.artist_list = results.artists.items;
		  		//console.log($scope.artist_list);
		  		$scope.artist_list_length = $scope.artist_list.length;
		  		if($scope.artist_list_length >= 1) {
		  			$scope.multipleResults($scope.artist_list);
		  		} else {
		  			alert("That artist was not found!");
		  		}
		  		$scope.getSongs(results, newArtistId);
		})
		artist2(artistName).success(function (artistInfo_results) {
		  	$scope.artistNames = [];
		  	$scope.result_length = artistInfo_results.results.length;
		  	for(i = 0; i < $scope.result_length; i++) {
		  		$scope.paren = artistInfo_results.results[i].title.indexOf("(");
		  		$scope.artistNames_item = {
		  			name: artistInfo_results.results[i].title,
		  			id: artistInfo_results.results[i].id
		  		};
		  		if($scope.paren != -1) {
			  		$scope.artistNames_item = {
			  			name: artistInfo_results.results[i].title.slice(0, -4),
			  			id: artistInfo_results.results[i].id
			  		};
		  			$scope.artistNames.push($scope.artistNames_item);
		  		} else {
		  			$scope.artistNames.push($scope.artistNames_item);
		  		};
		  		if (artistName === $scope.artistNames[i].name) {
                    $scope.newId = $scope.artistNames[i].id;
                    $("#artist_info img").attr("src", artistInfo_results.results[i].thumb);
                    $scope.getInfo($scope.newId);
                    break;
				};
		  	};
		});
	};

	$scope.getSongs = function(results, newArtistId) {
		$scope.artist_id = newArtistId;
		songs($scope.artist_id).success(function (song_results) {
		  	$scope.tracks_list = [];
		  	for(i = 0; i < 10; i++) {
		  		$scope.track_item = {
					name: song_results.tracks[i].name,
					albumName: song_results.tracks[i].album.name,
					track_url: song_results.tracks[i].preview_url,
					albumArt: song_results.tracks[i].album.images[1].url,
					id: i
				}; 
				$scope.tracks_list.push($scope.track_item);
		  	};
		});
	};

	$scope.getInfo = function(newId, artistName) {
		info(newId).success(function (artist_bio) {
		  	$scope.name = $scope.artistName;
		  	$scope.bio = artist_bio.uri;
		  	$scope.artist_urls = artist_bio.urls;
		});
	};

	$scope.showPlayer = function() {
		if ( window.innerWidth < 1099 || window.innerHeight < 500 ) {
			$("#audioPlayer").show("slide", { direction: "right" });
			$("section").css("opacity", "0.2");
		} else {
			$("#mobile_back").css("display", "none");
		}
		$("header").css("padding", "20px 20px 0px 20px");
	};

	$scope.hidePlayer = function() {
		if ( window.innerWidth < 1099 || window.innerHeight < 500 ) {
			$("#audioPlayer").hide("slide", { direction: "right" });
			$("section").css("opacity", "1");
		}
		$("header").css("padding", "20px");
	};

	$scope.playSongs = function(id) {
		$scope.itemNumber = id;
		$("source").attr("src", $scope.tracks_list[$scope.itemNumber].track_url);
		$(".album_art").attr("src", $scope.tracks_list[$scope.itemNumber].albumArt);
		$("#song_name_display").html("<p>" + $scope.tracks_list[$scope.itemNumber].name + "</p><p class='album'>" + $scope.tracks_list[$scope.itemNumber].albumName + "</p>");
		$("audio").load();
		$("#audioPlayer").show();
		$("#music").trigger("play");
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

	$scope.showInfo = function() {
		$("#artist_info").toggle("slide", { direction: "right" });
	};

	$scope.multipleResults = function() {
		$("#multi_results").toggle("slide", { direction: "left" });
	};

	$scope.newArtistSearch = function(){
		$scope.artistName = this.item.name;
		$scope.newArtistId = this.item.id;
		$("#search").val($scope.artistName);
		$scope.findArtist($scope.artistName, $scope.newArtistId);
		$(".fa-info-circle").show();
		$("#results").show();
	};

})
demo.directive("audioPlayer", function() {
	return {
		templateUrl: "audioPlayer.html",
		restrict: "E",
		scope: true,
		transclude: true
	}
});