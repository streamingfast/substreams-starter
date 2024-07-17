// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	context.subscriptions.push(vscode.commands.registerCommand('substreams.runInit', async function() {
        vscode.tasks.executeTask(new vscode.Task(
            {
                type: 'shell',
                presentation: {
                    reveal: 'always',
                    panel: vscode.TaskPanelKind.Dedicated,
                    showReuseMessage: false,
                    clear: true
                }
            },
            vscode.TaskScope.Workspace,
            'Init package from generators',
            'substreams',
            new vscode.ShellExecution('substreams init')
        ));
    }));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.build', async function() {
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            vscode.window.showInformationMessage('`substreams.yaml` not found below currently opened file.');
            return
        }
        const fileExists = await vscode.workspace.fs.stat(activeEditor.document.uri);
        if (fileExists) {
            // File exists
        } else {
            // File does not exist
        }

        // TODO: extract to some other file.
        const getParentFolderWithFile = async function(currentFilePath, matchingFileName) {
            let currentDir = path.dirname(currentFilePath);
            const root = vscode.Uri.file("/")
            while (true) {
                const thisLevelFile = vscode.Uri.joinPath(vscode.Uri.file(currentDir), matchingFileName)
                if (thisLevelFile === root) {
                    return null
                }
                console.log("Looking for this file", thisLevelFile);
                const fileExists = await vscode.workspace.fs.stat(thisLevelFile)
                if (fileExists) {
                    return currentDir
                } else {
                    currentDir = path.dirname(currentDir)
                    continue
                }
            }
        }

        const parentFolder = await getParentFolderWithFile(activeEditor.document.uri.fsPath, "substreams.yaml")
        if (parentFolder === null) {
            vscode.window.showInformationMessage('`substreams.yaml` not found below currently opened file.');
            return        
        }
        vscode.tasks.executeTask(new vscode.Task(
            {type: 'shell'},
            vscode.TaskScope.Workspace,
            'Build Substreams Package',
            'substreams',
            new vscode.ShellExecution('cargo build --target wasm32-unknown-unknown --release', {cwd: parentFolder})
        ))
    }))
	context.subscriptions.push(vscode.commands.registerCommand('substreams.newBlankModule', async function() {}));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.openRepository', async function() {}));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.buildFromExistingPackage', async function() {}));


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