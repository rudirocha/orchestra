import * as vscode from 'vscode';
import { SymfonyProfilerProvider } from './providers/SymfonyProfilerProvider';

export function activate(context: vscode.ExtensionContext) {
	const symfonyProfiler = new SymfonyProfilerProvider();
	vscode.window.registerTreeDataProvider('symfonyDebugProfiles', symfonyProfiler);
	vscode.commands.registerCommand('orchestra.refreshProfiles', () =>
		symfonyProfiler.refresh()
	);
}

export function deactivate() { }