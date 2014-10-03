Router.route('/', function(){
  this.render('Home');
});

Router.route('/profiles/:name', function(){
  this.render('ProfileDetail', {
    data: function(){
      return ProfilesCollection.findOne({name: this.params.name});
    }
  });
});
