ProfileController = RouteController.extend({
  layoutTemplate: 'profileLayout',
  waitOn: function() {
    return [
      Meteor.subscribe('profiles', this.params._id),
      IRLibLoader.load("/jquery.fittext.js")
    ];
  },
  template: 'profileDetail',
  yieldTemplates: {
    'profileDetailLeft': {
      to: 'left'
    }
  },
  onRun: function() {
    ProfilesCollection.update({
      _id: this.params._id
    }, {
      $inc: {
        views: 1
      }
    });
    this.next();
  },
  data: function() {
    return ProfilesCollection.findOne({
      _id: this.params._id
    });
  }
});