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
		tableHead1 : 'Score',
		tableHead2 : 'Team',
		tableHead3 : 'Points',
		tableHead4 : 'team',
		tableEntry2 : 'score' // table function neccessary here
	};

	WEDSTRIJDAPP.ranking = {
		title:'Pool A - Ranking',
		tableHead1 : "Team",
		tableHead2 : 'W',
		tableHead3 : 'L',
		tableHead4 : 'Points won',
		tableHead5 : 'Points Lost',
		tableHead6 : '+/-',

		tableEntry1 : 'Burning Snow',
		tableEntry2 : '3',
		tableEntry3 :  '1',
		tableEntry4 : '53',
		tableEntry5 : '30',
		tableEntry6 : '+23',
	};

	WEDSTRIJDAPP.schedule = {
		title:'Pool A - Schedule',
		description:'Pagina 3 is de derde pagina'
	};
	
	// Controller Init
	WEDSTRIJDAPP.controller = {
		init: function () {
			// Initialize router
			WEDSTRIJDAPP.router.init();
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
		}
	}
	// DOM ready
	domready(function () {
		// Kickstart WEDSTRIJDAPPlication
		WEDSTRIJDAPP.controller.init();
	});
	
})();