Router.route('/', function(){
  this.render('home');
});

Router.route('/about', function(){
  this.render('about');
});

Router.route('/profiles/manuel', function(){
  this.layout('profileLayout');

  /*
  Example for rendering a template to a
  named yield with JavaScript
  */
  // this.render('profileImage', {to: 'left'});

  this.render('profileDetail');
});
