var rapid = require('rapid-io')
var express = require('express');
var app = express();
var server = require('http').Server(app);
var passport = require('passport');
var path = require('path');

// set up static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/bower_components', express.static(path.join(__dirname + '/bower_components')));

app.set('port', (process.env.PORT || 3000));

server.listen(app.get('port'));


var io = require('socket.io')(server);

const API_KEY = 'NDA1OWE0MWo1b3AzYm5rLnJhcGlkLmlv'

const RAPID_TODO_COLLECTION_NAME = 'MediEmi' // Add your collection name right here

const client = rapid.createClient(API_KEY)

//export default client
//const todos = client.collection(RAPID_TODO_COLLECTION_NAME)

/*app.get('/', function(req, res) {
  res.sendFile(__dirname + '/client/index.html');
=======
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
>>>>>>> c9b89bbd0a482e805001caf3e2a434e1982039da
  /*console.log(req.path.replace("/", "").split("\n")[0])
  const newToDo = todos.newDocument()
  newToDo.mutate({
    name: req.path.replace("/", "").split("\n")[0]
  })
  // subscribe to all incomplete to-dos
client
  .collection(RAPID_TODO_COLLECTION_NAME)
  .subscribe(todos => {
    // TODO: update user interface
    console.log(todos)
  }, error => {
    // once the error block is called the subscription is automatically canceled
    // and will no longer receive and updates
    if (err.type === 'permission-denied') {
      console.log(err.message) // you are not allowed to access data
    }
  })*/

//})

var session      = require('express-session');
require('./config/passport')(passport); // pass passport for configuration

// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch', // session secret
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

function googleAuth() {

  const passport = require('passport');
  const GoogleStrategy = require('passport-google-oauth20').Strategy;

  function extractProfile (profile) {
    let imageUrl = '';
    if (profile.photos && profile.photos.length) {
      imageUrl = profile.photos[0].value;
    }
    return {
      id: profile.id,
      displayName: profile.displayName,
      image: imageUrl
    };
  }

  // Configure the Google strategy for use by Passport.js.
  //
  // OAuth 2-based strategies require a `verify` function which receives the
  // credential (`accessToken`) for accessing the Google API on the user's behalf,
  // along with the user's profile. The function must invoke `cb` with a user
  // object, which will be set at `req.user` in route handlers after
  // authentication.
  passport.use(new GoogleStrategy({
    clientID: config.get('OAUTH2_CLIENT_ID'),
    clientSecret: config.get('OAUTH2_CLIENT_SECRET'),
    callbackURL: config.get('OAUTH2_CALLBACK'),
    accessType: 'offline'
  }, (accessToken, refreshToken, profile, cb) => {
    // Extract the minimal profile information we need from the profile object
    // provided by Google
    cb(null, extractProfile(profile));
  }));

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser((obj, cb) => {
    cb(null, obj);
  });

  router.get(
    // Login url
    '/auth/login',

    // Save the url of the user's current page so the app can redirect back to
    // it after authorization
    (req, res, next) => {
      if (req.query.return) {
        req.session.oauth2return = req.query.return;
      }
      next();
    },

    // Start OAuth 2 flow using Passport.js
    passport.authenticate('google', { scope: ['email', 'profile'] })
  );

  router.get(
    // OAuth 2 callback url. Use this url to configure your OAuth client in the
    // Google Developers console
    '/auth/google/callback',

    // Finish OAuth 2 flow using Passport.js
    passport.authenticate('google'),

    // Redirect back to the original page, if any
    (req, res) => {
      const redirect = req.session.oauth2return || '/';
      delete req.session.oauth2return;
      res.redirect(redirect);
    }
  );


}

function getProfileData(msg) {

  console.log("getProfileData:" + msg);

  client
    .collection(RAPID_TODO_COLLECTION_NAME)
    .filter({ and: [
            { $id: msg.uuid }
            ]})
    .fetch(userData =>  {
      socket.emit("userData", userData[0].body);
    }, error => {
      // once the error block is called the subscription is automatically canceled
      // and will no longer receive and updates
      console.log(err.message)
      if (err.type === 'permission-denied') {
        console.log(err.message) // you are not allowed to access data
      }
    })

}

io.on('connection', function(socket){
  socket.on('getProfileData', function(msg){
    getProfileData(msg);
  });
  socket.on('saveProfileData', function(msg){
    console.log("saveProfileData:" + msg);

    client
      .collection(RAPID_TODO_COLLECTION_NAME)
      .newDocument(msg.uuid)
      .mutate({ // create a new to-do and assign it to John
        name: msg.name,
        email: msg.email,
        phone: msg.phone,
        gender: msg.gender,
        canDrive: msg.canDrive,
        isDisabled: msg.isDisabled,
        isMinority: msg.isMinority,
        isLiterate: msg.isLiterate,
        status: msg.status,
        originCountry: msg.originCountry,
        isEducated: msg.isEducated,
        priority: msg.priority
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
  });
  socket.on('contactUs', function(msg){
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

  });
  socket.on('welcome', function(msg){
      console.log("Welcome user:" + msg.msg);
  });
  socket.on('searchSettings', function(msg){
  console.log('searchSettings!');
  msg = getProfileData(uuid);
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
});
});

/*http.listen(app.get('port'), function(){
  console.log('listening on *:' + app.get('port'));
});*/

/*app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});*/
