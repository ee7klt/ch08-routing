/*
The user collection already lives under Meteor.users.
So this file is mainly used for methods relating to users.
*/

Meteor.methods({
  'User.updateProfileImage': function(data){
    check(data, {
      'img': String
    });

    var userId = Meteor.userId();

    if(!userId){
      throw new Meteor.Error(401, "You have to log in to do this");
    }

    Meteor.users.update({_id: userId}, {$set: {'profile.img': data.img}});
  }
});

