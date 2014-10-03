Meteor.startup(function(){
  profiles = [
    {
      name: 'Stephan',
      profileText: 'I am really good with words and like playing around with new gadgets!'
    },
    {
      name: 'Manuel',
      profileText: 'Good food makes me happy and cooking it myself even more.'
    }
  ]

  _.forEach(profiles, function(profile){
    // Updates the profile and inserts it if it does not exist
    ProfilesCollection.upsert(profile, profile);
  });

});
