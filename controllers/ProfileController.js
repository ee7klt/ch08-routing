ProfileController = RouteController.extend({
  layoutTemplate: 'profileLayout',
  template: 'profileDetail',
  yieldTemplates: {
    'profileDetailLeft': {to: 'left'}
  },
  waitOn: function(){
    return [
      Meteor.subscribe('profile', this.params._id),
      Meteor.subscribe('complimentsByUserId', this.params._id)
    ]
  },
  data: function(){
    var self = this;
    console.log('DATA');
    var data = {
      profile: function(){
        console.log('PROFILE');
        return ProfilesCollection.findOne({_id: self.params._id});
      },
      compliments: function(){
        console.log('COMPLIMENTS');
        return ComplimentsCollection.find({userId: self.params._id});
      }
    };
    return data;
  },
  stars: function(){
    // guard the function in case data.profile is undefined
    if(!this.data().profile()) { return; }

    // one star for each 50 views
    stars = parseInt(this.data().profile().views / 50);

    // maximum of 5 stars, min 1 star
    stars = stars > 5 ? 5 : stars == 0 ? 1 : stars;

    // we just need an array to iterate through in the template
    // the values do not matter
    arr = []
    for(var i=0; i < stars; i++){
      arr.push(1);
    }
    return arr;
  }
});

ProfileController.events({
  'submit form#new-compliment': function(evt, tpl){
    // the form should not perform a http post
    evt.preventDefault();

    var form = tpl.find('form');
    var compliment = tpl.find('textarea[name=compliment]').value;

    ComplimentsCollection.insert({
      text: compliment,
      userId: this.data().profile()._id
    });
    form.reset();
  }
});
