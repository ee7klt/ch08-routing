Template.profileDetail.rendered = function(){
  ctx = $('#chart')[0].getContext("2d");

  data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "My First dataset",
        fillColor: "rgba(220,220,220,0.2)",
        strokeColor: "rgba(220,220,220,1)",
        pointColor: "rgba(220,220,220,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(220,220,220,1)",
        data: [65, 59, 80, 81, 56, 55, 40]
      },
      {
        label: "My Second dataset",
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };

  newChart = new Chart(ctx).Line(data, {});
};

Template.profileDetail.helpers({
  log:function(){
    console.log('this', this);
  },
  ownProfile: function(){
    return this.userId === Meteor.userId();
  },
  stars: function(){
    console.log('[ProfileDetail.stars]', Iron.controller());
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