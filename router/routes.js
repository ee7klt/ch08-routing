Router.route('/', { controller: 'HomeController' });
Router.route('/about', 'about');
Router.route('/profiles/:_id', { controller: 'ProfileController' });
