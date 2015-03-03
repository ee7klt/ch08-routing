Meteor.startup(function() {
  // only add if no users are in the db
  if (Meteor.users.find().count() > 0) {
    return;
  }

  var users = [{
    profile: {
      name: 'Stephan',
      text: 'I am really good with words and like playing around with new gadgets!',
      img: 'stephan.jpg',
      views: 10,
      isPublic: true
    },
    email: 'stephan@example.com',
    password: 'stephan@example.com'
  }, {
    profile: {
      name: 'Manuel',
      text: 'Good food makes me happy and cooking it myself even more.',
      img: 'manuel.jpg',
      views: 153,
      isPublic: false
    },
    email: 'manuel@example.com',
    password: 'manuel@example.com'
  }];

  Meteor.users.remove({});

  _.forEach(users, function(user) {
    // Updates the profile and inserts it if it does not exist
    Accounts.createUser({
      email: user.email,
      password: user.password,
      profile: user.profile
    });
  });

});