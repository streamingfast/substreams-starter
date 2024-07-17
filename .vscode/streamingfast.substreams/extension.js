// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    const dosomething = function () {
        vscode.tasks.executeTask(new vscode.Task({
            type: 'shell',
            command: 'echo hello world',
            problemMatcher: [],
            presentation: {
                reveal: 'always',
                panel: vscode.TaskPanelKind.Shared,
                showReuseMessage: true,
                clear: true
            },
            name: 'Build Substreams Package'
        }, vscode.TaskScope.Workspace, 'Build Substreams Package', 'substreams'));
	}
	context.subscriptions.push(vscode.commands.registerCommand('substreams.build', dosomething));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.runInit', dosomething));


    vscode.commands.executeCommand(
        'workbench.action.openWalkthrough',
        `streamingfast.substreams#starter`,
        false,
    );
	// context.subscriptions.push(vscode.commands.registerCommand('substreams.runInit', function () {
    //     vscode.tasks.executeTask({
    //         type: 'shell',
    //         command: 'substreams init',
    //         problemMatcher: [],
    //         presentation: {
    //             reveal: 'always',
    //             panel: vscode.TaskPanelKind.New,
    //             showReuseMessage: true,
    //             clear: true
    //         },
    //         name: 'Init new module'
    //     });
	// }));

    
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}