var rapid = require('rapid-io')

const API_KEY = 'NDA1OWE0MWo1b3AzYm5rLnJhcGlkLmlv'

const RAPID_TODO_COLLECTION_NAME = 'MediEmi' // Add your collection name right here

const client = rapid.createClient(API_KEY)

//module.exports {

function contactUs(msg) {

  console.log("contactUs:" + msg);

  client
    .collection(RAPID_TODO_COLLECTION_NAME)
    .newDocument()
    .mutate({ // create a new to-do and assign it to John
      name: msg.name,
      email: msg.email,
      phone: msg.phone,
      msg: msg.msg
  })
  .then(
    () => console.log('success'),
    err => {
      if (err) {
        switch (err.type) {
          case 'timeout': break // mutation timed out
          case 'permission-denied': break // access control related error
        }
      }
    })

}



function getSearchResults(msg) {

  console.log('searchSettings!');
  console.log('msg data:' + JSON.stringify(msg, 2, 0));
  client
    .collection(RAPID_TODO_COLLECTION_NAME)
    .filter({ and: [
              { canDrive: msg.canDrive },
              { isDisabled: msg.isDisabled },
              { isMinority: msg.isMinority },
              { isLiterate: msg.isLiterate },
              { status: msg.status },
              { originCountry: msg.originCountry },
              { isEducated: msg.isEducated } ]
              })
    .order({ priority: 'asc' })
    .fetch(todos => {
      // TODO: update user interface
      console.log("Todos data:", JSON.stringify(todos));
      console.log("Todos data:", JSON.stringify(todos[0].body.countryName));
      if( Object.prototype.toString.call(msg) === '[object Array]' ) {
        console.log( 'Array ahoy!' );
      }
      console.log("length:" + todos.length);

      if(todos != null) {
        for(var i = 0; i < todos.length; i++) {
          socket.emit('searchResults', todos[i].body);
      }
      }
    /*  for (var key in todos) {
        if (todos.hasOwnProperty(key)) {
          console.log(key + " -> " + todos[key]);
            for (var key1 in todos[key]) {
              if (todos[key].hasOwnProperty(key1)) {
                console.log(key1 + " -> " + todos[key][key1]);
                for (var key2 in todos[key][key1]) {
                  if (todos[key][key1].hasOwnProperty(key2)) {
                    console.log(key2 + " -> " + todos[key][key1][key2]);
                  }
                }
              }
            }
        }
      }*/
      //console.log("Country name:" + todos[0].body.countryName);
    }, error => {
      // once the error block is called the subscription is automatically canceled
      // and will no longer receive and updates
      console.log(err.message)
      if (err.type === 'permission-denied') {
        console.log(err.message) // you are not allowed to access data
      }
    })
    console.log("Done with rapid io! ^-^")

}

//}
