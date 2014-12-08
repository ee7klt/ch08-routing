Template.settings.events({
  'submit form': function(evt, tpl) {
    evt.preventDefault();

    var data = $(evt.currentTarget).serializeObject();

    Meteor.call('User.updateProfileImage', data, function(err, result){
      if(err){
        alert(err.reason);
        return;
      }
      alert('Settings updated!');
    });
  }
});