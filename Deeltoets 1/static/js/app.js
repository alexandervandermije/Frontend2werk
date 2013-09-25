var WEDSTRIJDAPP = WEDSTRIJDAPP || {};

(function () {
	// Data objecten
	WEDSTRIJDAPP.game = {
		title:'Pool A - Score: Boomsquad vs. Burning Snow',
		//table : , 
		tableHeadFinale1 : 'team',
		tableHeadFinale2 : 'result',
		tableHeadFinale3 : 'team',
		tableEntryFinale1 : 'Boomsquad',
		tableEntryFinale2 : '15-8',
		tableEntryFinale3 : 'Burning Snow',
		gameDataArray: [   { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
    ],
	/*		gameTableFill : function(input1,input2,input3,input4)
		{
			tableEntry1 : input1,
			tableEntry2 : input2,
			tableEntry3 : input3,
			tableEntry4 : input4,
		}
		/*something : 'something',
		tableEntry1 : something,
		gameTableFill : function(a, b, c, d){
			tableEntry1 : 'a';
			tableEntry2 : 'b';
			tableEntry3 : 'c';
			tableEntry4 : 'd';
		}
		*/
	};

	WEDSTRIJDAPP.ranking = {
		title:'Pool A - Ranking',
		tableHead1 : "Team",
		tableHead2 : 'W',
		tableHead3 : 'L',
		tableHead4 : 'Points won',
		tableHead5 : 'Points Lost',
		tableHead6 : '+/-',

	};

	WEDSTRIJDAPP.schedule = {
		title:'Pool A - Schedule',

		scheduleDataArray : [{ date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}]
	};
	
	// Controller Init
	WEDSTRIJDAPP.controller = {
		init: function () {
			// Initialize router
			WEDSTRIJDAPP.router.init();
			//WEDSTRIJDAPP.game.gameTableFill(bla,gha,sds,sdsdc);
		}
	};

	// Router
	WEDSTRIJDAPP.router = {
		init: function () {
	  		routie({
			    '/game': function() {
			    	WEDSTRIJDAPP.page.game();
				},
			    '/ranking': function() {
			    	WEDSTRIJDAPP.page.ranking();
			    },

			    '/schedule': function() {
			    	WEDSTRIJDAPP.page.schedule();
			    },
			    '/films' : function()
			    {

			    },
			    '*': function() {
			    	WEDSTRIJDAPP.page.game();
			    }
			});
		},

		change: function () {
            var route = window.location.hash.slice(2),
                sections = qwery('section[data-route]'),
                section = qwery('[data-route=' + route + ']')[0];  

            // Show active section, hide all other
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
	WEDSTRIJDAPP.page = {
		game: function () {
			Transparency.render(qwery('[data-route=game')[0], WEDSTRIJDAPP.game);
			WEDSTRIJDAPP.router.change();
		},

		ranking: function () {
			Transparency.render(qwery('[data-route=ranking')[0], WEDSTRIJDAPP.ranking);
			WEDSTRIJDAPP.router.change();
		},

		schedule: function () {
			Transparency.render(qwery('[data-route=schedule')[0], WEDSTRIJDAPP.schedule);
			WEDSTRIJDAPP.router.change();
		},
	}
	// DOM ready
	domready(function () {
		// Kickstart WEDSTRIJDAPPlication
		WEDSTRIJDAPP.controller.init();
	});
	
})();