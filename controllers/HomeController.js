HomeController = RouteController.extend({
  waitOn: function(){
    return Meteor.subscribe('users');
  },
  data: function(){
    return {users: Meteor.users.find({})};
  }

});
