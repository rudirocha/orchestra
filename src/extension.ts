import * as vscode from 'vscode';
import { SymfonyProfilerProvider } from './providers/SymfonyProfilerProvider';
import { SortTypes } from './enums/sortTypes';
import { ContextVariables } from './enums/contextVariables';

export function activate(context: vscode.ExtensionContext) {
	/**
	 * Context keys
	 */
	context.globalState.update(ContextVariables.ProfilerSortType, SortTypes.DESC);

	/**
	 * Providers
	 */
	const symfonyProfiler = new SymfonyProfilerProvider();
	vscode.window.registerTreeDataProvider('symfony-profiler', symfonyProfiler);

	/**
	 * Commands
	 */
	vscode.commands.registerCommand('orchestra.refreshProfiles', () =>
		symfonyProfiler.refresh(context.globalState.get(ContextVariables.ProfilerSortType) || SortTypes.DESC)
	);
	vscode.commands.registerCommand('orchestra.refreshProfilesDesc', () => {
		symfonyProfiler.refresh(SortTypes.DESC);
		context.globalState.update(ContextVariables.ProfilerSortType, SortTypes.DESC);
	}
	);
	vscode.commands.registerCommand('orchestra.refreshProfilesAsc', () => {
		symfonyProfiler.refresh(SortTypes.ASC);
		context.globalState.update(ContextVariables.ProfilerSortType, SortTypes.ASC);
	}
	);
}

export function deactivate() { }