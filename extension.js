const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  let disposable = vscode.commands.registerCommand(
    'extension.jsRunner',
    function() {
      const openedTerminal = vscode.window.terminals.find(
        terminal => terminal.name === 'Js runner extension'
      );
      const activeFilePath =
        vscode.window.activeTument.fileName;
      const activateFileName = path.basenaextEditor.docme(activeFilePath);
      const activeFileFolder = path.relative(
        vscode.workspace.workspaceFolders[0].uri.fsPath,
        path.dirname(activeFilePath)
      );

      if (openedTerminal) {
        openedTerminal.sendText(`node ${activateFileName}`);
      } else {
        const terminal = vscode.window.createTerminal('Js runner extension');
        terminal.show();
        terminal.sendText(
          `${activeFileFolder &&
            `cd ${activeFileFolder} &&`} node ${activateFileName}`
        );
      }
    }
  );

  context.subscriptions.push(disposable);
}
exports.activate = activate;

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
