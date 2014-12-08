Router.plugin('bouncer', {
  condition: function(){
    console.log('bouncer', this.data());
    var profile = this.data().profile;
    if(!profile) return true;
    console.log('isPublic?', profile.isPublic);
    return profile.isPublic;
  },
  bouncerTemplate: 'profileIsPrivate',
  only: ['profile']
});

Router.route('/', { name: 'home' });
Router.route('/about', 'about', { name: 'about' });
Router.route('/profiles/:_id', { name: 'profile' });
Router.route('/settings', {name: 'settings'});


// SERVER ROUTES
Router.route('/server/say', function(){
  var request = this.request;
  var response = this.response;

  response.end('You said: ' + request.query.message);
}, {where: 'server'});

// EXTERNAL SERVICES
Router.route('/webhooks/instagram', {where: 'server'})
  .get(function(){
    // HTTP GET on the route /webhooks/instagram
    this.request.end('Hi Instagram!');
  })
  .post(function(){
    // HTTP POST on the route /webhooks/instagram
  })
  .put(function(){
    // HTTP PUT on the route /webhooks/instagram
  });