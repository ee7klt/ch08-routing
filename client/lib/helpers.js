var Helpers = {
  isActiveRoute: function(routeName) {
    return Router.current().route.getName() === routeName;
  }
};

_.each(Helpers, function(helper, name) {
  Template.registerHelper(name, helper);
});