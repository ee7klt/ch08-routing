Meteor.startup(function(){
  profiles = [
    {
      name: 'Stephan',
      profileText: 'I am really good with words and like playing around with new gadgets!',
      profileImg: 'https://pbs.twimg.com/profile_images/519901371340828672/szqBnZr3_400x400.jpeg',
      views: 10,
      isPublic: true
    },
    {
      name: 'Manuel',
      profileText: 'Good food makes me happy and cooking it myself even more.',
      profileImg: 'https://pbs.twimg.com/profile_images/378800000123289551/1f63258a55d204a327ac2b5a1bf1d673_400x400.jpeg',
      views: 153,
      isPublic: false
    }
  ]

  _.forEach(profiles, function(profile){
    // Updates the profile and inserts it if it does not exist
    ProfilesCollection.upsert({name: profile.name}, profile);
  });

});
