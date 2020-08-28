import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let exportCompleteSettings = vscode.commands.registerCommand('export-settings.exportCompleteSettings', () => {
		const title = vscode.Uri.parse("untitled:settings.json");
		const config = vscode.workspace.getConfiguration();
		const output = JSON.stringify(config, null, 4);
		const beginning = new vscode.Position(0, 0);

		vscode.workspace.openTextDocument(title).then((document: vscode.TextDocument) => {
			vscode.window.showTextDocument(document, undefined, false).then((editor: vscode.TextEditor) => {
				editor.edit((editer: vscode.TextEditorEdit) => {
					editer.insert(beginning, output);
				});
			});
		}, (error: any) => {
			console.error(error);
		});
	});

	context.subscriptions.push(exportCompleteSettings);
}

export function deactivate() {}
