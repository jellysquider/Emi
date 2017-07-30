// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'        : 'your-secret-clientID-here', // your App ID
        'clientSecret'    : 'your-client-secret-here', // your App Secret
        'callbackURL'     : 'http://localhost:3000/auth/facebook/callback',
        'profileURL': 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email'

    },

    'twitterAuth' : {
        'consumerKey'        : 'your-consumer-key-here',
        'consumerSecret'     : 'your-client-secret-here',
        'callbackURL'        : 'http://localhost:3000/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'        : '123228630579-16fm11cqq1as2prr05ofvk7irq3c58j6.apps.googleusercontent.com',
        'clientSecret'    : 'jHs8j6pWU3CTYAgCmLZH55lf',
        'callbackURL'      : 'http://localhost:3000/auth/google/callback'
    }

};
