Meteor.publish('complimentsByUserId', function(_id){
  check(_id, String);


  profiles = Meteor.wrapAsync(function(cb){
    Meteor.setTimeout(function(){
      cb(null, ComplimentsCollection.find({userId: _id}));
    }, 1000);
  })() || [];

  return profiles;
});
