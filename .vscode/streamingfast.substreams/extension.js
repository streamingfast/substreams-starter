// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');

// TODO: extract to some other file.
const getParentFolderWithFile = async function(currentFilePath, matchingFileName) {
    let currentDir = path.dirname(currentFilePath);
    while (true) {
        const thisLevelFile = vscode.Uri.joinPath(vscode.Uri.file(currentDir), matchingFileName)
        console.log("Looking for this file", thisLevelFile);
        try {
            const fileExists = await vscode.workspace.fs.stat(thisLevelFile)
            return currentDir
        } catch (e) {
            currentDir = path.dirname(currentDir)
            console.log("comparing", currentDir.toString(), "/")
            if (currentDir.toString() === "/") {
                return null
            }
            continue
        }
    }
}

const substreamsModuleSubfolderError = 'Run command on file inside a project with `substreams.yaml`'

async function findSubstreamsProjectRoot(vscode) {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return vscode.workspace.workspaceFolders[0].uri.fsPath
    }

    const parentFolder = await getParentFolderWithFile(activeEditor.document.uri.fsPath, "substreams.yaml")
    if (parentFolder === null) {
        vscode.window.showInformationMessage(substreamsModuleSubfolderError);
        return        
    }

    return parentFolder
}


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


	context.subscriptions.push(vscode.commands.registerCommand('substreams.marketAuth', async function() {
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
            'Authenticate to The Graph Market',
            'substreams',
            new vscode.ShellExecution('substreams auth')
        ));
    }));    

	context.subscriptions.push(vscode.commands.registerCommand('substreams.runBuild', async function() {
        const projectFolder = await findSubstreamsProjectRoot(vscode)
        if (!projectFolder) {
            return
        }
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
            'Build Substreams Package',
            'substreams',
            new vscode.ShellExecution('substreams build', {cwd: projectFolder})
        ))
    }))
	context.subscriptions.push(vscode.commands.registerCommand('substreams.newBlankModule', async function() {}));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.openRepository', async function() {}));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.initSubgraph', async function() {
        const projectFolder = await findSubstreamsProjectRoot(vscode)
        if (!projectFolder) {
            return
        }        
        vscode.tasks.executeTask(new vscode.Task(
            {type: 'shell'},
            vscode.TaskScope.Workspace,
            'Initialize subgraph',
            'substreams',
            new vscode.ShellExecution('substreams codegen subgraph', {cwd: projectFolder})
        ))
    }));
	context.subscriptions.push(vscode.commands.registerCommand('substreams.initSql', async function() {
        const projectFolder = await findSubstreamsProjectRoot(vscode)
        if (!projectFolder) {
            return
        }        
        vscode.tasks.executeTask(new vscode.Task(
            {type: 'shell'},
            vscode.TaskScope.Workspace,
            'Initialize Substreams:SQL',
            'substreams',
            new vscode.ShellExecution('substreams codegen subgraph', {cwd: projectFolder})
        ))

    }));

	context.subscriptions.push(vscode.commands.registerCommand('substreams.runGui', async function() {
        const projectFolder = await findSubstreamsProjectRoot(vscode)
        if (!projectFolder) {
            return
        }        
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
            'Substreams GUI',
            'substreams',
            new vscode.ShellExecution('substreams gui', {cwd: projectFolder})
        ))
    }));

    async function getPackageList(keywords) {
        return [{name: "sreamingfast/uniswap-v3"}, {name: "streamingfast/" + keywords}, {name: "streamingfast/solana-explorer"}, {name: "streamingfast/ethereum-explorer"}]
        // try {
        //     const response = await axios.get('https://api.substreams.dev/packages');
        //     return response.data;
        // } catch (error) {
        //     console.error('Error fetching package list:', error);
        //     return [];
        // }
    }

    context.subscriptions.push(vscode.commands.registerCommand('substreams.loadFromRegistry', async function() {

        const quickPick = vscode.window.createQuickPick();

        let packageList = []
        async function refreshList(search) {
            packageList = await getPackageList(search);
            quickPick.items = packageList.map(pkg => ({ label: pkg.name }));
        }
        refreshList("")
        quickPick.onDidChangeValue(async value => {
            refreshList(value)
        });
        quickPick.onDidChangeSelection(selection => {
            vscode.tasks.executeTask(new vscode.Task(
                {type: 'shell'},
                vscode.TaskScope.Workspace,
                'Download Package',
                'substreams',
                new vscode.ShellExecution(`curl -O https://spkg.io/${selection.label}`)
            ))
        });
        quickPick.show();
    }));


    vscode.commands.executeCommand(
        'workbench.action.openWalkthrough',
        `streamingfast.substreams#starter`,
        false,
    );
    
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}