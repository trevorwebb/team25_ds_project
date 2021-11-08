const ref = {
    data() {
        return {
            games: [],
            selectedRef: null,
            gameForm: {},
            selectedGame: null,
            referees: [],
            refForm : {},
            selectedAssignment: null,
            assignments: [],
            assignmentForm: {},
            daterangeassignments: [],
            reportForm: {},
            futureAssignments : [],
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('D MMM YYYY');
        }
    },

    methods: {
        calculateAge(birthday) {
            ageDifMs = Date.now() - new Date(birthday).getTime();
            ageDate = new Date(ageDifMs);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        },
        parseGames(){
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += Object.keys(this.futureAssignments[0]).join(",")+"\r\n";         
            this.futureAssignments.forEach(function(rowObj) {       
            let row = Object.values(rowObj).join(",");          
            csvContent += row + "\r\n";  
            });
            
            var encodedUri = encodeURI(csvContent);         
            var link = document.createElement("a");
            
            link.setAttribute("href", encodedUri);       
            link.setAttribute("download", "Future_Games.csv");
            
            document.body.appendChild(link); 
            link.click();     
            },

        parseDateGames(){   
            let csvContent = "data:text/csv;charset=utf-8,";
            csvContent += Object.keys(this.daterangeassignments[0]).join(",")+"\r\n";       
            this.daterangeassignments.forEach(function(rowObj) {         
            let row = Object.values(rowObj).join(",");           
            csvContent += row + "\r\n";
            });
            
            var encodedUri = encodeURI(csvContent);           
            var link = document.createElement("a");
            
            link.setAttribute("href", encodedUri);           
            link.setAttribute("download", "game_assigned_report.csv");
            
            document.body.appendChild(link);         
            link.click();            
            },
        
        fetchFutureGame() {
            fetch('/api/report/future_game.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.futureAssignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        selectReferee(r) {
            if (r == this.selectedRef) {
                return;
            }
            this.selectedRef = r;
            this.games = [];
            this.fetchGameData2(this.selectedRef);
        },
        
        fetchGameData2(r) {
            console.log("Fetching game data for ", r);
            fetch('/api/gamedetail/?referee=' + r.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },

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
        fetchAssignmentData() {
            fetch('/api/assignments/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
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

        fetchAssignmentDataDetail(g) {
            console.log("Fetching assignment data for", g);
            fetch('/api/assignmentDetail/?game=' + g.game_ID)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postRef(evt) {
            console.log ("Test:", this.selectedRef);
          if (this.selectedRef) {
              this.postEditRef(evt);
          } else {
              this.postNewRef(evt);
          }
        },
        
        postEditRef(evt) {
            this.refForm.id = this.selectedRef.id;        
            
            console.log("Editing!", this.refForm);
    
            fetch('api/referees/update.php', {
                method:'POST',
                body: JSON.stringify(this.refForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.referees = json;
                
                // reset the form
                this.handleResetEdit();
              });
        },

        postNewRef(evt) {
  
            console.log("Posting!", this.refForm);
            fetch('api/referees/create.php', {
                
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


        postDeleteRef(ref) {  
            if ( !confirm("Are you sure you want to delete " + ref.first_name + ref.last_name + "from the database?") ) {
                return;
            }  
            
            console.log("Delete!", ref);
    
            fetch('api/referees/delete.php', {
                method:'POST',
                body: JSON.stringify(ref),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
              
                this.referees = json;
              
               // reset the form
                this.handleResetEdit();
              });
          },
          postAssignment(evt) {
            console.log ("Test:", this.selectedAssignment);
          if (this.selectedAssignment) {
              this.postEditAssignment(evt);
          } else {
              this.postNewAssignment(evt);
          }
        },
        
        postEditAssignment(evt) {
            this.assignmentForm.id = this.selectedAssignment.id;        
            
            console.log("Editing!", this.assignmentForm);
    
            fetch('api/assignments/update.php', {
                method:'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.assignments = json;
                
                // reset the form
                this.handleResetEdit();
              });
        },

        postNewAssignment(evt) {
  
            console.log("Posting!", this.assignmentForm);
            fetch('api/assignments/create.php', {
                
                method:'POST',
                body: JSON.stringify(this.assignmentForm),
                headers: {
                    "Content-Type" : "application/json: charset=utf-8"
                }
              })
               

              .then( response => response.json() )
              .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.assignments = json;
                
                // reset the form
                this.assignmentForm = {};
          });
        },


        postDeleteAssignment(a) {  
            if ( !confirm("Are you sure you want to delete this from the database?") ) {
                return;
            }  
            
            console.log("Delete!", a);
    
            fetch('api/assignments/delete.php', {
                method:'POST',
                body: JSON.stringify(a),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
              
                this.assignments = json;
              
               // reset the form
                this.handleResetEdit();
              });
          },

        selectGame(g) {
            if (g == this.selectedGame) {
                return;
            }
            this.selectedGame = g;
            this.games = [];
            this.fetchGameData(this.selectedGame);
        },

        selectGameAssignments(g) {
            if (g == this.selectedGame) {
                return;
            }
            this.selectedGame = g;
            this.assignments = [];
            this.fetchAssignmentDataDetail(this.selectedGame);
        },

        selectAssignment(a) {
            if (a == this.selectedAssignment) {
                return;
            }
            this.selectedAssignment = a;
            this.assignments = [];
            this.fetchAssignmentData(this.selectedAssignment);
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
        GameAssignedByDate(evt){
          
            fetch('api/report/game_assignment.php', {
               method:'POST',
               body: JSON.stringify(this.reportForm),
               headers: {
                 "Content-Type": "application/json; charset=utf-8"
               }
             })
             .then( response => response.json() )
             .then( json => {
               console.log("Returned from post:", json);
               // TODO: test a result was returned!
               this.daterangeassignments = json;
               
             
             })
             .catch( err => {
               alert("Oops, we have an error. Can you try again with correct values.");
             });
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
              this.selectedRef = null;
              this.refForm = {};
              this.selectedAssignment = null;
              this.assignmentForm = {};
        },

        handleEditRef(ref) {
            this.selectedRef = ref;
            this.refForm = Object.assign({}, this.selectedRef);
        },
        handleEditAssignment(assignment) {
            this.selectedAssignment = assignment;
            this.assignmentForm = Object.assign({}, this.selectedAssignment);
        },
    },
    

    created() {
        this.fetchRefData();
        this.fetchGameData();
        this.fetchAssignmentData();
        this.fetchFutureGame();
    }
}
  
Vue.createApp(ref).mount('#reportApp');