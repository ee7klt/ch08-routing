Router.configure({
  layoutTemplate: 'masterLayout'
});

Router.route('/', {
  waitOn: function(){
    return Meteor.subscribe('profiles');
  },
  action: function(){
    this.render('home', {
      data: function(){
        return {profiles: ProfilesCollection.find()};
      }
    });
  }
});

Router.route('/about', function(){
  this.render('about');
});

Router.route('/profiles/:_id', {
  layoutTemplate: 'profileLayout',
  waitOn: function(){
    return Meteor.subscribe('profile', this.params._id);
  },
  action: function(){
    profile = ProfilesCollection.findOne({_id: this.params._id});
    this.render('profileDetailLeft', {
      to: 'left',
      data: function(){
        return profile;
      }
    });
    this.render('profileDetail', {
      data: function(){
        return profile;
      }
    });
  }
});
