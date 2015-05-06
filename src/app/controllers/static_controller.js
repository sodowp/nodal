module.exports = (function() {

  var Nodal = require('nodal');
  var Controller = Nodal.Controller;
  var Error404Controller = Nodal.require('app/controllers/error/404_controller.js');

  function StaticController() {
    Controller.apply(this, arguments);
  }

  StaticController.prototype = Object.create(Controller.prototype);
  StaticController.prototype.constructor = StaticController;

  StaticController.prototype.get = function(self, params, app) {

    var staticData = app.static(this.path().substr('/static/'.length));

    if (!staticData) {
      Error404Controller.prototype.get.apply(this, arguments);
      return;
    }

    self.setHeader('Content-Type', staticData.mime);
    self.render(staticData.buffer);

  };

  return StaticController;

})();