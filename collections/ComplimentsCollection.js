ComplimentsCollection = new Meteor.Collection('compliments');

Meteor.methods({
  'Compliments.remove': function(complimentId){
    check(complimentId, String);

    // does the compliment exist?
    compliment = ComplimentsCollection.findOne(
      {_id: complimentId},
      {fields:{_id: 1, userId: 1}} // faster if you only get the fields you really need
    );

    if(!compliment){
      throw new Meteor.Error(404, 'The compliment does not exist.');
    }

    // is users compliment?
    if(compliment.userId !== Meteor.userId()){
      throw new Meteor.Error(403, 'Not permitted.');
    }

    ComplimentsCollection.remove({_id: complimentId});
  },

  'Compliments.insert': function(data){
    check(data, {
      text: String,
      userId: String
    });

    var userId = Meteor.userId();

    if(!userId){
      throw new Meteor.Error(403, 'You have to be logged in.');
    }

    data.fromUserId = Meteor.userId();
    data.createdAt = new Date();
    ComplimentsCollection.insert(data);
  }
});