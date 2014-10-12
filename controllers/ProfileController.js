ProfileController = RouteController.extend({
  layoutTemplate: 'profileLayout',
  template: 'profileDetail',
  yieldTemplates: {
    'profileDetailLeft': {to: 'left'}
  },
  waitOn: function(){
    return Meteor.subscribe('profile', this.params._id);
  },
  data: function(){
    return ProfilesCollection.findOne({_id: this.params._id});
  },
  stars: function(){
    // guard the function in case data is undefined
    if(!this.data()) { return; }

    // one star for each 50 views
    stars = parseInt(this.data().views / 50);

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

    console.log(this.data(), tpl.data);

    var form = tpl.find('form');
    var compliment = tpl.find('textarea[name=compliment]').value;

    ComplimentsCollection.insert({
      text: compliment,
      userId: this.data()._id
    });
  }
});
