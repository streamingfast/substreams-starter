// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, Substreams extension active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('substreams-sf.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Substreams!');
		var panel = vscode.window.createWebviewPanel(
			'toolbox',
			'Substreams',
			vscode.ViewColumn.One,
			{enableScripts: true}	
		);
        panel.iconPath = {
            light: vscode.Uri.file(context.asAbsolutePath('icons/light-icon.png')),
            dark: vscode.Uri.file(context.asAbsolutePath('icons/dark-icon.png'))
        };
		panel.webview.html = getWebviewContent()

		panel.webview.onDidReceiveMessage(
            message => {
                switch (message.command) {
                    case 'substreamsInit':
                        vscode.commands.executeCommand('workbench.action.terminal.sendSequence', { text: 'substreams init \r' });
                        break;
                    case 'substreamsRun':
                        vscode.commands.executeCommand('workbench.action.terminal.sendSequence', { text: 'substreams run \r' });
                        break;
                }
            },
            undefined,
            context.subscriptions
        );
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
function getWebviewContent() {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Substreams</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f5f5f5;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            h1 {
                color: #4B0082; /* Purple color from the screenshot */
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                background: #fff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                border-top: 10px solid #4B0082; /* Purple color from the screenshot */
            }
            #p1 {
                color: #555;
                font-size: 1.1em;
            }
            .button {
                padding: 8px 16px;
                margin: 5px;
                font-size: 0.9em;
                color: #fff;
                background-color: #FF7F50; /* Orange color from the screenshot */
                border: none;
                border-radius: 5px;
                cursor: pointer;
                text-align: center;
                text-decoration: none;
            }
            .button:hover {
                background-color: #FF6347; /* Slightly darker orange */
            }
            .button:active {
                background-color: #FF4500; /* Even darker orange */
            }
            ul {
                list-style-type: none;
                padding: 0;
            }
            li {
                margin-bottom: 20px;
            }
            .button-container {
                display: flex;
                flex-wrap: wrap;
                gap: 10px;
                margin-top: 10px;
            }
        </style>
        <script>
            const vscode = acquireVsCodeApi();
            document.addEventListener('DOMContentLoaded', function() {
                const p1 = document.getElementById('p1');
                p1.style.color = '#4B0082'; /* Purple color from the screenshot */
            });
        </script>
    </head>
    <body>
        <div class="container">
            <h1>Substreams</h1>
            <p id="p1">Substreams is a tool to help you manage your Salesforce orgs.</p>
            <ul>
                <li>
                    <strong>Step 1:</strong> First create a Substreams using the <code>substreams init</code> CLI in the VS Code terminal.
                    <div class="button-container">
                        <button class="button" onclick="vscode.postMessage({ command: 'substreamsInit' });">Initialize Substreams</button>
                    </div>
                </li>
                <li>
                    <strong>Step 2:</strong> (Optional) Build the Substreams package locally after downloading it.
                </li>
                <li>
                    <strong>Step 3:</strong> Run the Substreams package using <code>substreams run</code>.
                    <div class="button-container">
                        <button class="button" onclick="vscode.postMessage({ command: 'substreamsRun' });">Run Substreams</button>
                    </div>
                </li>
            </ul>
        </div>
    </body>
    </html>`;
}

