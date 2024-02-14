import * as vscode from 'vscode';
import { SymfonyProfilerProvider } from './providers/SymfonyProfilerProvider';
import { SortTypes } from './enums/sortTypes';
import { ContextVariables } from './enums/contextVariables';

export function activate(context: vscode.ExtensionContext) {
	/**
	 * Context keys
	 */

	setProfilerSortType(context, SortTypes.DESC);

	/**
	 * Providers
	 */
	const symfonyProfiler = new SymfonyProfilerProvider();
	vscode.window.registerTreeDataProvider('symfony-profiler', symfonyProfiler);

	/**
	 * Commands
	 */
	vscode.commands.registerCommand('orchestra.refreshProfiles', () =>
		symfonyProfiler.refresh(
			context.globalState.get(ContextVariables.ProfilerSortType) || SortTypes.DESC
		)
	);
	vscode.commands.registerCommand('orchestra.refreshProfilesDesc', () => {
		symfonyProfiler.refresh(SortTypes.DESC);
		setProfilerSortType(context, SortTypes.DESC);
	}
	);
	vscode.commands.registerCommand('orchestra.refreshProfilesAsc', () => {
		symfonyProfiler.refresh(SortTypes.ASC);
		setProfilerSortType(context, SortTypes.ASC);
	}
	);
}

export function deactivate() { }

function setProfilerSortType(context: vscode.ExtensionContext, type: SortTypes) {
	context.globalState.update(ContextVariables.ProfilerSortType, type);
	vscode.commands.executeCommand('setContext', ContextVariables.ProfilerSortType, type);
}