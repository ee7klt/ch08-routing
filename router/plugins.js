Iron.Router.plugins.bouncer = function(router, options){
  router.onBeforeAction(function(){
    if(!this.lookupOption('condition').apply(this)){
      this.render(this.lookupOption('bouncerTemplate'));
    } else {
      this.next();
    }
  }, options);
};