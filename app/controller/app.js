/**
 * Created with IntelliJ IDEA.
 * User: nisheeth
 * Date: 19/05/13
 * Time: 07:09
 * To change this template use File | Settings | File Templates.
 */

ConsoleIO.namespace("ConsoleIO.App");

ConsoleIO.App = function AppController() {
    this.context = {
        browser: "a",
        editor: "b",
        manager: "c"
    };

    this.view = new ConsoleIO.View.App(this, {
        target: document.body,
        type: "3U",
        status: "<a style='float:left;' target='_blank' href='http://nkashyap.github.io/console.io/'>Welcome to Console.IO</a><span style='float:right;'>Author: Nisheeth Kashyap, Email: nisheeth.k.kashyap@gmail.com</span>"
    });

    this.browser = new ConsoleIO.App.Browser(this, {
        title: 'Device List',
        contextId: 'browser',
        width: 200,
        height: 250,
        toolbar: [
            ConsoleIO.Model.DHTMLX.ToolBarItem.Refresh
            //ConsoleIO.Model.DHTMLX.ToolBarItem.SearchText,
            //ConsoleIO.Model.DHTMLX.ToolBarItem.Search
        ]
    });

    this.editor = new ConsoleIO.App.Editor(this, {
        contextId: 'editor',
        title: 'Editor',
        placeholder: 'Write javascript code to execute on remote client',
        codeMirror: {
            mode: 'javascript',
            readOnly: false
        },
        toolbar: [
            ConsoleIO.Model.DHTMLX.ToolBarItem.Open,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Save,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Separator,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Cut,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Copy,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Paste,
            ConsoleIO.Model.DHTMLX.ToolBarItem.SelectAll,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Separator,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Undo,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Redo,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Separator,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Clear,
            ConsoleIO.Model.DHTMLX.ToolBarItem.WordWrap,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Separator,
            ConsoleIO.Model.DHTMLX.ToolBarItem.Execute
        ]
    });

    this.manager = new ConsoleIO.App.Manager(this, {
        title: 'Manager',
        contextId: 'manager'
    });

    ConsoleIO.Service.Socket.on('user:error', function (data) {
        console.log('user:error', data);
    }, this);

    ConsoleIO.Service.Socket.on('user:listScripts', this.listScripts, this);
    ConsoleIO.Service.Socket.on('user:scriptContent', this.add, this);
    ConsoleIO.Service.Socket.on('user:scriptSaved', this.scriptSaved, this);

};

ConsoleIO.App.prototype.render = function render() {
    this.view.render();
    this.browser.render(this.view.getContextById(this.context.browser));
    this.editor.render(this.view.getContextById(this.context.editor));
    this.manager.render(this.view.getContextById(this.context.manager));
};

ConsoleIO.App.prototype.setTitle = function setTitle(name, title) {
    this.view.setTitle(this.context[name], title);
};

ConsoleIO.App.prototype.listScripts = function listScripts(files) {
    this.editor.listScripts(files);
};

ConsoleIO.App.prototype.scriptSaved = function scriptSaved(file) {
    this.editor.fileName = file.name;
    this.editor.addScript(file);
};

ConsoleIO.App.prototype.add = function add(data) {
    this.editor.add(data);
};

ConsoleIO.App.prototype.getActiveDeviceGuid = function getActiveDeviceGuid() {
    return this.manager.getActiveDeviceGuid();
};