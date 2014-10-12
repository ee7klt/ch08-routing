Router.route('/', { name: 'home' });
Router.route('/about', 'about', { name: 'about' });
Router.route('/profiles/:_id', { name: 'profile' });
