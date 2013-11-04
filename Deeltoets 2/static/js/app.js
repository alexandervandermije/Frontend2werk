var AUA = AUA || {};

(function () { 
'use strict';
AUA.dataObject = {
	gameScores : 'https://api.leaguevine.com/v1/game_scores',
	gamesSchedule : 'https://api.leaguevine.com/v1/games/?pool_id=19222&access_token=c1ca9f3ab3',
	rankingData : 'https://api.leaguevine.com/v1/stats/ultimate/team_stats_per_tournament/?tournament_ids=%5B19389%5D&order_by=%5Blosses%2Cpoints_allowed%5D&access_token=4eb9dfd6ff',
	// niet mooi
	basicGames : 'https://api.leaguevine.com/v1/games/?game_ids=%5B',
	basicGames2: '%5D&access_token=c1ca9f3ab3'
}
AUA.functionObject = {
	updateScore: function(id){/*
	$.ajax({
  type:'POST',
  url:'https://api.leaguevine.com/v1/game_scores?',
  // post payload:
  contentType: 'application/json',
  dataType: 'json',
  accept:'json',
  authorization: 'bearer 82996312dc',
  data: JSON.stringify({game_id:'127233',team_1_score:input1,team_2_score: input2,is_final: 'False' }),
  success : function()
  {
	console.log(data); 
  }
})
*/console.log(id);
			//get input data for PostData
			var	team1Score = document.getElementById("team1Score").value,
			team2Score = document.getElementById("team2Score").value,
			type 		=  'POST',
			url  		=  "https://api.leaguevine.com/v1/game_scores/",
			postData 	= JSON.stringify({game_id: id.innerHTML,team_1_score: team1Score,team_2_score: team2Score,is_final: 'True'});
			
			
			// Create request
			console.log(postData);
			var xhr = new XMLHttpRequest();

			// Open request
			xhr.open(type,url,false);

			// Set request headers
			xhr.setRequestHeader('Content-type','application/json');
			xhr.setRequestHeader('Authorization','bearer 82996312dc');

			// Send request (with data as a json string)
			xhr.send(postData);
			
			AUA.functionObject.getData(AUA.dataObject.basicGames+id.innerHTML+AUA.dataObject.basicGames2,"updateGame");	
	},
	getData: function(url,route){
				$.ajax({
  				type: 'GET',
 				url: url,
  				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				accepts: 'application/json',		
 				success: function(data){
					console.log(data);
					Transparency.render(qwery('[data-route='+route+']')[0], data);
										},	
						})},
	getGameID:function(id){
		var gameID = id.innerHTML;
		console.log(gameID);
		AUA.functionObject.getData(AUA.dataObject.basicGames+gameID+AUA.dataObject.basicGames2,"updatePage");
	}
	}
	
	
	// Controller 
	AUA.controller = {
		init: function () {
			// start de router
			AUA.router.init();
		}
	};

	// Router
	AUA.router = {
		init: function () {
	// checkt de url voor de volgende strings ( event listener)
		routie('/:pageID', function(pageID) {
				AUA.page.render(pageID);
				console.log(pageID);
			});
		routie({
			'*':function(){
			AUA.functionObject.getData(AUA.dataObject.gamesSchedule, "games");
			}
			})
		},

		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Toon active section, hide all other
            if (section) {
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
            }

            // Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}
	};

	// Pages
	AUA.page = {
	render: function (route) {
		window.mySwipe = Swipe(document.getElementById('slider'));
		if (route == "ranking")
		{
			AUA.functionObject.getData(AUA.dataObject.rankingData, route);
		}
		else if( route == "games")
		{
			AUA.functionObject.getData(AUA.dataObject.gamesSchedule, route);
		}
		else if (route == "schedule")
		{
			AUA.functionObject.getData(AUA.dataObject.gamesSchedule,route)
		}
			AUA.router.change();
	}}
	// DOM ready
	domready(function () {
		// Kickstart AUAlication
		AUA.controller.init();
	});
	
})();