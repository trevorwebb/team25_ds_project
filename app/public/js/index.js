const ref = {
    data() {
    return {
        refs: [],
        refForm : {}
    }
},

    computed: {

    },
    methods: {
       
         fetchRefData() {
            fetch('/api/referees/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.refs = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        
    


        postNewRef(evt) {
  
            console.log("Posting!", this.refForm);
            fetch('api/books/create.php',
            {
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
            this.refs = json;
                
                // reset the form
                this.refForm = {};
          });
      
  }
},
    
    created() {
        this.fetchRefsData();
    }
  }
  
Vue.createApp(ref).mount('#RefApp');