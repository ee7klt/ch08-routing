// without using controllers:
//Router.route('/', {
//  waitOn: function() {
//    return Meteor.subscribe('profiles');
//  },
//  template: 'home',
//  data: function() {
//    return {
//      profiles: ProfilesCollection.find()
//    };
//  }
//});
//Router.route('/about', function() {
//  this.render('about');
//});
//
//Router.route('/profiles/:_id', {
//  layoutTemplate: 'profileLayout',
//  waitOn: function() {
//    return [
//      Meteor.subscribe('profiles', this.params._id),
//      IRLibLoader.load("/jquery.fittext.js")
//    ];
//  },
//  template: 'profileDetail',
//  yieldTemplates: {
//    'profileDetailLeft': {
//      to: 'left'
//    }
//  },
//  data: function() {
//    return ProfilesCollection.findOne({
//      _id: this.params._id
//    });
//  }
//});


Router.route('/', {
  name: 'home'
});
Router.route('/about', 'about', {
  name: 'about'
});
Router.route('/profiles/:_id', {
  name: 'profile'
});

Router.route('/api/profiles/name/:_id', function() {
  var request = this.request;
  var response = this.response;
  if (ProfilesCollection.findOne({
      _id: this.params._id
    })) {
    var name = ProfilesCollection.findOne({
      _id: this.params._id
    }).name
  } else {
    var name = 'no user with that ID found';
  }
  console.log("name:", name)
  response.end(name);
}, {
  where: 'server'
})

// Test GET with curl:
// curl http://localhost:3000/webhooks/find/profiles
Router.route('/api/find/profiles', {
    where: 'server'
  })
  .get(function() {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // returns all profiles
    this.response.end(JSON.stringify(ProfilesCollection.find().fetch()));
  })


// Test PUT with curl:
// curl -H "Content-Type: application/json" -d '{"name":"Dan","profileText":"I came in through the REST API"}' http://localhost:3000/webhooks/insert/profile
Router.route('/api/insert/profile', {
    where: 'server'
  })
  .post(function() {
    this.response.statusCode = 200;
    this.response.setHeader("Content-Type", "application/json");
    this.response.setHeader("Access-Control-Allow-Origin", "*");
    this.response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // returns ID for new profile
    this.response.end(JSON.stringify(
      ProfilesCollection.insert(this.request.body)
    ));
    console.log(this.request.body);
  })