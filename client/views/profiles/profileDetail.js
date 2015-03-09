Template.profileDetail.helpers({
  log: function() {
    console.log('this', this, UI._parentData(), UI._parentData(1), UI._parentData(2));
  }
});

Template.profileDetail.rendered = function() {
  console.log("right side rendered");
  var template = Template.instance();
  template.$('h1').fitText();
}