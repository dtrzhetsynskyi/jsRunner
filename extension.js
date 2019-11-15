const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('extension.jsRunner', function () {
		const currentlyOpenTabfilePath = vscode.window.activeTextEditor.document.fileName;
		const currentlyOpenTabfileName = path.basename(currentlyOpenTabfilePath);
		const currentlyOpenTabfileDirectory = path.relative(
			vscode.workspace.workspaceFolders[0].uri.fsPath, 
			path.dirname(currentlyOpenTabfilePath)
		);
		const terminal = vscode.window.createTerminal('Js runner extension');

		// vscode.window.showInformationMessage(`${currentlyOpenTabfileDirectory}`);
		terminal.show();
		terminal.sendText(`${currentlyOpenTabfileDirectory && `cd ${currentlyOpenTabfileDirectory} &&`} node ${currentlyOpenTabfileName}`);
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
