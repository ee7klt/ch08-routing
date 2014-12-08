Template.profileDetail.helpers({
  log:function(){
    console.log('this', this);
  },
  ownProfile: function(){
    return this.userId === Meteor.userId();
  },
  stars: function(){
    // guard the function in case data.profile is undefined
    if(!this.profile) { return; }

    // one star for each 50 views
    stars = parseInt(this.profile.views / 50);

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

Template.profileDetail.events({
  'submit form#new-compliment': function(evt, tpl){
    // the form should not perform a http post
    evt.preventDefault();

    var data = $(evt.currentTarget).serializeObject();
    data.userId = this.userId;

    Meteor.call('Compliments.insert', data, function(err, result){
      if(err) { return alert(err.reason); }
      $(evt.currentTarget)[0].reset();
    });
  },
  'click .delete-compliment': function(evt, tpl){
    evt.preventDefault();

    if(confirm('Are you sure you want to delete this compliment?')){
      Meteor.call('Compliments.remove', this._id, function(err, result){
        if(err){ return alert(err.reason); }
      });
    }
  }
});