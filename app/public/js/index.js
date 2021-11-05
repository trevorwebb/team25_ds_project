const ref = {
    data() {
        return {
            games: [],
            gameForm: {},
            selectGame: null,
            referees: [],
            refForm : {},
            person: []
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },

    methods: {
       
        fetchRefData() {
            fetch('/api/referees/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        fetchGameData() {
            fetch('/api/games/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },   

        postNewRef(evt) {
  
            console.log("Posting!", this.refForm);
            fetch('api/refs/create.php', {
                
                method:'POST',
                body: JSON.stringify(this.refForm),
                headers: {
                    "Content-Type" : "application/json: charset=utf-8"
                }
              })
               

              .then( response => response.json() )
              .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.referees = json;
                
                // reset the form
                this.refForm = {};
          });
        },
        selectGame(g) {
            if (g == this.selectedGame) {
                return;
            }
            this.selectedGame = g;
            this.games = [];
            this.fetchGamesData(this.selectedGame);
        },
        postNewGame(evt) {
  
            console.log("Posting!", this.gameForm);
            fetch('api/games/create.php', {
                
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                    "Content-Type" : "application/json: charset=utf-8"
                }
              })
               

              .then( response => response.json() )
              .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.games = json;
                
                // reset the form
                this.gameForm = {};
          });
        },
        postEditGame(evt) {
            this.gameForm.id = this.selectedGame.id;
      
            
            console.log("Editing!", this.gameForm);
    
            fetch('api/games/update.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },
        postGame(evt) {
            console.log ("Test:", this.selectedGame);
          if (this.selectedGame) {
              this.postEditGame(evt);
          } else {
              this.postNewGame(evt);
          }
        },
        postDeleteGame(o) {  
            if ( !confirm("Are you sure you want to delete " + o.game_ID + "?") ) {
                return;
            }  
            
            console.log("Delete!", o);
        
            fetch('api/games/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },
          handleEditGame(game) {
            this.selectedGame = game;
            this.gameForm = Object.assign({}, this.selectedGame);
        },
        
          handleResetEdit() {
              this.selectedGame = null;
              this.gameForm = {};
          },
        
    },
    
    created() {
        this.fetchRefData();
        this.fetchGameData();
    }
}
  
Vue.createApp(ref).mount('#RefApp');