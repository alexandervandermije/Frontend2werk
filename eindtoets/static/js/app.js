var AUA = AUA || {};

(function () { 

var pageCounter;
'use strict';
AUA.dataObject = {// URL's or other data strings needed multiple times
	gameScores : 'https://api.leaguevine.com/v1/game_scores/',
	gamesSchedule : 'https://api.leaguevine.com/v1/games/?pool_id=19222&access_token=c1ca9f3ab3',
	rankingData : 'https://api.leaguevine.com/v1/stats/ultimate/team_stats_per_tournament/?tournament_ids=%5B19389%5D&order_by=%5Blosses%2Cpoints_allowed%5D&access_token=4eb9dfd6ff',
	// niet mooi
	basicGames : 'https://api.leaguevine.com/v1/games/?game_ids=%5B',
	basicGames2: '%5D&access_token=c1ca9f3ab3'
}
AUA.functionObject = {// collection of functions
	changeData: function(type,url,postData,callback)// main AJAX loader has GET and POST functionality
	{
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = checkIfReady;
	function checkIfReady(){// checks if everything is ready for the callback to initiate
		    if(xhr.readyState < 4) {
				return;  
            }
			if(xhr.readyState == 0)
			{
				//AUA.functionObject.pageLoading(true);
			}
			if(xhr.readyState == 2)
			{
				AUA.functionObject.pageLoading(false);
			}
			   
            else if(xhr.readyState === 4) {  
                callback(JSON.parse(xhr.response));
            }
	}
	xhr.open(type,url,false);
	
	// Set request headers
	xhr.setRequestHeader('Content-type','application/json');
	xhr.setRequestHeader('Authorization','bearer 82996312dc');
	
    xhr.send(postData);
	
	
	},
	getGameID:function(id){// function controlling getting to the update page
		var gameID = id.innerHTML;
		console.log(gameID);
		
		AUA.functionObject.changeData('GET',AUA.dataObject.basicGames+gameID+AUA.dataObject.basicGames2,"",function(data){
			console.log(data);
			Transparency.render(qwery('[data-route=updatePage]')[0], data);
		});
	},
	updateScore: function(id){// Function controlling the page where users can update the score
		console.log(id);
		//get input data for PostData
		var	team1Score = document.getElementById("team1Score").value,
		team2Score = document.getElementById("team2Score").value,
		postInput 	= JSON.stringify({game_id: id.innerHTML,team_1_score: team1Score,team_2_score: team2Score,is_final: 'True'});
		console.log(postInput)
		console.log(team1Score,team2Score);
		// checks if the input is correct
		var scoreInput1 = isNaN(parseFloat(team1Score));
		var scoreInput2 = isNaN(parseFloat(team2Score));
		
		if(scoreInput1 == true || scoreInput2 == true)// if user input is not correct, he will get an error message and sent back to the earlier page
		{
			var errorMessage = document.getElementById('errorMessage');
			errorMessage.innerHTML = 'Error - Wrong Data Input';
			window.history.back();
		}
		else if(team1Score > 15 || team2Score > 15)
		{
			var errorMessage = document.getElementById('errorMessage');
			errorMessage.innerHTML = 'Error - Score input is too high. Maximum of 15 points per team allowed.';
			window.history.back();
		}
		else// if everything is good the data is posted en the updated information is displayed
		{
			var errorMessage = document.getElementById('errorMessage');
			errorMessage.innerHTML = '';
			AUA.functionObject.changeData('POST',AUA.dataObject.gameScores,postInput,function(data){});
			AUA.functionObject.changeData('GET',AUA.dataObject.basicGames+id.innerHTML+AUA.dataObject.basicGames2,'',function(data){
				console.log(data);
				Transparency.render(qwery('[data-route=updateGame]')[0], data);
			});
			AUA.functionObject.checkWinner(document.getElementById('scoreTeam1').innerHTML,document.getElementById('scoreTeam2').innerHTML)
		}
	},
	refreshPage: function(){// refresh function
		AUA.functionObject.pageLoading(true);
		console.log('refresh');
		AUA.router.change();
		location.reload(true);
	},
	pageLoading : function(loading)// function controlling the loader
	{
		var loader = document.getElementById('loader');
		//console.log(loader,loading);
		if(loading == true)
		{	
			loader.style.display = 'block';
		}
		else if(loading == false)
		{
			loader.style.display = 'none';
			console.log('loaderStop');
		}
	},/*
	detectSwipe : function(element,callback)
	{
		var touchSurface =  element,
		swipeDir,
		startX,
		startY,
		distX,
		distY,
		threshold = 150, //required min distance traveled to be considered swipe
		restraint = 100, // maximum distance allowed at the same time in perpendicular direction
 		allowedTime = 300, // maximum time allowed to travel that distance
 		elapsedTime,
		startTime,
		handleSwipe = callback || function(swipeDir){}
 		

		touchSurface.addEventListener('touchstart', function(e)
		{
			var touchObject = e.changedTouches[0]
  			swipeDir = 'none'
  			dist = 0
  			startX = touchObject.pageX
  			startY = touchObject.pageY
  			startTime = new Date().getTime() // record time when finger first makes contact with surface
  			e.preventDefault()

		}
		,false)
		touchSurface.addEventListener('touchmove', function(e){
  			e.preventDefault()
 		}, false)
		
		touchSurface.addEventListener('touchend', function(e){
  			var touchObject = e.changedTouches[0]
 			distX = touchObject.pageX - startX // get horizontal dist traveled by finger while in contact with surface
  			distY = touchObject.pageY - startY // get vertical dist traveled by finger while in contact with surface
 			elapsedTime = new Date().getTime() - startTime // get time elapsed
  			if (elapsedTime <= allowedTime){ // first condition for awipe met
   				if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
    				swipeDir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
  				}
   				else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
    				swipeDir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
  				}
  			}
		handleSwipe(swipeDir);
 		 e.preventDefault()
		 }
		 , false)
	},*/
	quoDetectSwipe : function()// detects swipe gestures
	{
		$$('body').swipeDown(function(){
			AUA.functionObject.refreshPage();
		})
		
		$$('body').swipeLeft(function(){
			// first checks the page it's on and the change's the content of the page
			var errorMessage = document.getElementById('errorMessage');// remove error message
			errorMessage.innerHTML = '';
			if(pageCounter == 'ranking')
			{
				console.log('swipeLeftRanking');
				AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
					console.log(data);
					Transparency.render(qwery('[data-route=games]')[0], data);
				});
				AUA.router.changeActive('games');
				AUA.functionObject.pageLoading(false);
			}
			else if(pageCounter == 'games')
			{
				console.log('swipeLeftGames');
				AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
					var timeTransform = data.objects;
					console.log(timeTransform);
				
					for (var i=0;i<timeTransform.length;i++){
					var startTime = timeTransform[i].start_time;
					var time = new Date(timeTransform);
					console.log(time);		
					}	
					Transparency.render(qwery('[data-route=schedule]')[0], data);
				 });
				 AUA.router.changeActive('schedule');
				 AUA.functionObject.pageLoading(false);
			}
			else if(pageCounter == 'schedule')
			{
				console.log('swipeLeftSchedule');
				AUA.functionObject.changeData('GET',AUA.dataObject.rankingData,"",function(data){
					console.log(data);
					Transparency.render(qwery('[data-route=ranking]')[0], data);
				 });
				 AUA.router.changeActive('ranking');
				 AUA.functionObject.pageLoading(false);
			}
			
		})
		$$('body').swipeRight(function(){
			var errorMessage = document.getElementById('errorMessage');// remove error message
			errorMessage.innerHTML = '';
			if(pageCounter == 'ranking')
			{
				AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
					var timeTransform = data.objects;
					console.log(timeTransform);
				
					for (var i=0;i<timeTransform.length;i++){
					var startTime = timeTransform[i].start_time;
					var time = new Date(timeTransform);
					console.log(time);		
					}	
					Transparency.render(qwery('[data-route=schedule]')[0], data);
				 });
				 AUA.router.changeActive('schedule');
				 AUA.functionObject.pageLoading(false);
				 
			}
			else if(pageCounter == 'games')
			{
				AUA.functionObject.changeData('GET',AUA.dataObject.rankingData,"",function(data){
					console.log(data);
					Transparency.render(qwery('[data-route=ranking]')[0], data);
				 });
				 AUA.router.changeActive('ranking');
				 AUA.functionObject.pageLoading(false);
			}
			else if(pageCounter == 'schedule')
			{
				AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
					console.log(data);
					Transparency.render(qwery('[data-route=games]')[0], data);
				 });
				AUA.router.changeActive('games');
				AUA.functionObject.pageLoading(false);
			}
		})
		
		$$('body').swipeUp(function(){
		console.log(pageCounter);	
		})
		
	},
	checkWinner : function(scoreTeam1,scoreTeam2)
	{
		var winner1 = document.getElementById('team1Name');
		var winner2 = document.getElementById('team2Name');
		winner1.style.color = 'black';
		winner2.style.color = 'black';
		console.log(scoreTeam1,scoreTeam2);
		
		if(scoreTeam1 == 15 || scoreTeam2 == 15)
		{
			if(scoreTeam1 == 15)
			{
				console.log('team1 won');
				winner1.style.color = 'red';
			}
			if(scoreTeam2 == 15)
			{
				console.log('team2 won');
				winner2.style.color = 'red';
			}
		}
		
	}
	
};
	
	
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
	// checkt de url
		routie('/:pageID', function(pageID) {
				AUA.page.render(pageID);
				console.log(pageID);
			});
		routie({
			'*':function(){
			AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
				console.log(data);
				Transparency.render(qwery('[data-route=games]')[0], data);
				 });
				}
			})
		},
		change: function (route) {
			if(route == undefined)
			{
				var route = window.location.hash.slice(2)
			}
            var sections = qwery('section[data-route]'),
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
			//AUA.functionObject.pageLoading(false);
		},
		changeActive: function(target)
		{
			 var sections = qwery('section[data-route]'),
                section = qwery('[data-route='+target+']')[0];
				for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}
            	section.classList.add('active');
				pageCounter = target;
		}
	};

	// Pages
	AUA.page = {
	render: function (route) {
		//AUA.functionObject.pageLoading(true);
		if (route == "ranking")//check route
		{	
			var errorMessage = document.getElementById('errorMessage');// remove error message
			errorMessage.innerHTML = '';
			pageCounter = 'ranking';// set the pageCounter
			AUA.functionObject.changeData('GET',AUA.dataObject.rankingData,"",function(data){// get Data 
				console.log(data);
				Transparency.render(qwery('[data-route='+route+']')[0], data);//display
				 });
			AUA.functionObject.pageLoading(false);
		}
		else if( route == "games")
		{
			var errorMessage = document.getElementById('errorMessage');
			errorMessage.innerHTML = '';
			pageCounter = 'games';
			AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
				console.log(data);
				Transparency.render(qwery('[data-route='+route+']')[0], data);
				 });
			AUA.functionObject.pageLoading(false);
		}
		else if (route == "schedule")
		{
			var errorMessage = document.getElementById('errorMessage');
			errorMessage.innerHTML = '';
			pageCounter = 'schedule';
			AUA.functionObject.changeData('GET',AUA.dataObject.gamesSchedule,"",function(data){
			var timeTransform = data.objects;
			console.log(timeTransform);
				
			for (var i=0;i<timeTransform.length;i++){
				var startTime = timeTransform[i].start_time;
				var time = new Date(timeTransform);
				console.log(time);		
				}	
				Transparency.render(qwery('[data-route='+route+']')[0], data);
				 });
			AUA.functionObject.pageLoading(false);
		}
			AUA.router.change();
	}}
	
		
window.addEventListener('load', function(){// added on window load
	AUA.functionObject.pageLoading(false);
	AUA.functionObject.quoDetectSwipe();
	
	//AUA.functionObject.detectSwipe(document.getElementById('detectSwipe'), function(swipeDir){});
	
	})
	// DOM ready
domready(function () {
		// Kickstart AUAlication
		AUA.controller.init();
	});
	
})();