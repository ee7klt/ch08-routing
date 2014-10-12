Router.route('/', {
  waitOn: function(){
    return Meteor.subscribe('profiles');
  },
  template: 'home',
  data: function(){
    return {profiles: ProfilesCollection.find()};
  }
});

// the most basic route could also be just a string
// that relates to a template directly
Router.route('/about', 'about');

Router.route('/profiles/:_id', {
  layoutTemplate: 'profileLayout',
  waitOn: function(){
    return Meteor.subscribe('profile', this.params._id);
  },
  template: 'profileDetail',
  yieldTemplates: {
    'profileDetailLeft': {to: 'left'}
  },
  data: function(){
    return ProfilesCollection.findOne({_id: this.params._id});
  }
});
