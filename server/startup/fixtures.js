Meteor.startup(function(){
  // only add if no users are in the db
  if(Meteor.users.find().count() > 0){
    return;
  }

  var users = [
    {
      profile: {
        name: 'Stephan',
        text: 'I am really good with words and like playing around with new gadgets!',
        img: 'https://pbs.twimg.com/profile_images/519901371340828672/szqBnZr3_400x400.jpeg',
        views: 10,
        isPublic: true
      },
      email: 'stephan@example.com',
      password: 'stephan@example.com'
    },
    {
      profile: {
        name: 'Manuel',
        text: 'Good food makes me happy and cooking it myself even more.',
        img: 'https://pbs.twimg.com/profile_images/378800000123289551/1f63258a55d204a327ac2b5a1bf1d673_400x400.jpeg',
        views: 153,
        isPublic: false
      },
      email: 'manuel@example.com',
      password: 'manuel@example.com'
    }
  ];

  Meteor.users.remove({});

  _.forEach(users, function(user){
    // Updates the profile and inserts it if it does not exist
    Accounts.createUser({email: user.email, password: user.password, profile: user.profile});
  });

});
