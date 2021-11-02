const ref = {
    data() {
        return {
            refs: [],
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
        }
    },
    
    created() {
        this.fetchRefData();
    }
}
  
Vue.createApp(ref).mount('#RefApp');