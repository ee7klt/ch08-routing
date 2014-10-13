Router.plugin('bouncer', {
  condition: function(){
    var profile = this.data().profile();
    if(!profile) return true;
    return profile.isPublic;
  },
  bouncerTemplate: 'profileIsPrivate',
  only: ['profile']
});

Router.route('/', { name: 'home' });
Router.route('/about', 'about', { name: 'about' });
Router.route('/profiles/:_id', { name: 'profile' });
