/**
 * Created with IntelliJ IDEA.
 * User: nisheeth
 * Date: 19/05/13
 * Time: 13:32
 * To change this template use File | Settings | File Templates.
 */

ConsoleIO.namespace("ConsoleIO.View.Device.Console");

ConsoleIO.View.Device.Console = function ConsoleView(ctrl, model) {
    this.ctrl = ctrl;
    this.model = model;

    this.target = null;
};

ConsoleIO.View.Device.Console.prototype.render = function render(target){
    this.target = target;
};