const ref = {
    data() {
        return {
            games: [],
            selectedRef: null,
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
       
        selectReferee(r) {
            if (r == this.selectedRef) {
                return;
            }
            this.selectedRef = r;
            this.referees = [];
            this.fetchRefData(this.selectedRef);
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
                this.books = json;
                
                // reset the form
                this.handleResetEdit();
              });
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

        postDeleteRef(r) {  
            if ( !confirm("Are you sure you want to delete " + r.first_name + r.last_name + "from the database?") ) {
                return;
            }  
            
            console.log("Delete!", r);
    
            fetch('api/referees/delete.php', {
                method:'POST',
                body: JSON.stringify(r),
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
    },
    
    created() {
        this.fetchRefData();
        this.fetchGameData();
    }
}
  
Vue.createApp(ref).mount('#RefApp');