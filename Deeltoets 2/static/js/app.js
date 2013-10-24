var AUA = AUA || {};

(function () { 
'use strict';
var gameName1;
var input1;
var input2;
// Data objecten
	AUA.game = {
		title:'Pool A - Score: Boomsquad vs. Burning Snow', 
		team1: gameName1
		
	};

	AUA.ranking = {
		title:'Ranking',
		
	};
	

	AUA.schedule = {
		title:'Pool A - Schedule',
		
	};
	AUA.updateObject = {
	updateScore: function()
	
	{/*
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
*/
var type 		=  'POST',
				url  		=  "https://api.leaguevine.com/v1/game_scores/",
				postData 	= JSON.stringify({
				game_id: '127165'.toString(),team_1_score: input1.toString(),team_2_score: input2.toString(),is_final: 'False'
				});
				
			// Create request
			var xhr = new XMLHttpRequest();

			// Open request
			xhr.open(type,url,false);

			// Set request headers
			xhr.setRequestHeader('Content-type','application/json');
			xhr.setRequestHeader('Authorization','bearer 82996312dc');

			// Send request (with data as a json string)
			xhr.send(postData);
			
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
			});
		routie({
			'/update':function()
			{
			input1 = prompt("team 1 score =", "")
			input2 = prompt("team 2 score =", "")
			AUA.updateObject.updateScore();
			console.log(input1);
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
		var data;
		
		/*
		if (route == "ranking")
		{
			$.ajax({
  				type: 'GET',
 url: 'https://api.leaguevine.com/v1/teams/?season_id=20167&access_token=34d407bac8',
  				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				accepts: 'application/json',		
 				 success: function(data){
				console.log(data.objects);
				Transparency.render(qwery('[data-route='+route+']')[0], data.objects);
					},
				})
			}
			*/
			if( route == "games")
			{
							$.ajax({
  				type: 'GET',
 url: 'https://api.leaguevine.com/v1/games/?season_id=20167&access_token=81a6a00da5',
  				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				accepts: 'application/json',		
 				 success: function(data){
					 var directives = {
					
						}
				Transparency.render(qwery('[data-route='+route+']')[0], data.objects, directives);
				console.log(data)
			
 			 		},
				})
			}
		else if (route == "schedule")
		{
					$.ajax({
  				type: 'GET',
 url: 'https://api.leaguevine.com/v1/games/?season_id=20167&access_token=1da50d0118',
  				dataType: 'json',
				contentType: 'application/x-www-form-urlencoded',
				accepts: 'application/json',		
 				 success: function(data){
					 console.log(data.objects);
				Transparency.render(qwery('[data-route='+route+']')[0], data.objects);
 			 		},
				})
		}
			AUA.router.change();
	}}
	// DOM ready
	domready(function () {
		// Kickstart AUAlication
		AUA.controller.init();
	});
	
})();