Meteor.publish('users', function(){
  // simulate a 1 second waiting time
  profiles = Meteor.wrapAsync(function(cb){
    Meteor.setTimeout(function(){
      cb(null, Meteor.users.find({}, {limit: 10}));
    }, 1000);
  })();

  return profiles;
});

Meteor.publish('user', function(_id){
  check(_id, String);
  console.log("[Publish:user]", _id);
  return Meteor.users.find({_id: _id});
});
