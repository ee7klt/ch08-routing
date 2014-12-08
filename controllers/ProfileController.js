ProfileController = RouteController.extend({
  layoutTemplate: 'profileLayout',
  template: 'profileDetail',
  yieldTemplates: {
    'profileDetailLeft': {to: 'left'}
  },
  onRun: function(){
    Meteor.users.update({_id: this.params._id}, {$inc: {'profile.views': 1}});
    this.next();
  },
  waitOn: function(){
    return [
      Meteor.subscribe('user', this.params._id),
      Meteor.subscribe('complimentsByUserId', this.params._id)
    ]
  },
  data: function(){
    var self = this;
    var user = Meteor.users.findOne({_id: self.params._id});
    var profile = user && user.profile;
    var compliments = ComplimentsCollection.find({userId: self.params._id});

    var data = {
      profile: profile,
      userId: self.params._id,
      compliments: compliments
    };
    return data;
  }
});
