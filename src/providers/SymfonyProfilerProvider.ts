import * as vscode from 'vscode';
import { WorkspaceInspector } from '../inspectors/workspaceInspector';
import { WorkspaceTreeItem } from '../treeItems/workspaceTreeItem';
import { ProfileInspector } from '../inspectors/profilerInspector';
import { SortTypes } from '../enums/sortTypes';

export class SymfonyProfilerProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
	private profilerSortType: SortTypes = SortTypes.DESC;

	getTreeItem(element: WorkspaceTreeItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
		return element;
	}
	getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
		const sessions: vscode.TreeItem[] = new Array();

		if (element && element instanceof WorkspaceTreeItem) {
			sessions.push(...ProfileInspector.buildProfileTreeItems(
				element.phpProject,
				this.profilerSortType === SortTypes.DESC
			));

			if (sessions.length === 0) {
				sessions.push(new vscode.TreeItem('No sessions detected', vscode.TreeItemCollapsibleState.None));
			}

		} else {
			const workspaceFolders = vscode.workspace.workspaceFolders;
			// Validate the workspace is not empty
			if (workspaceFolders === undefined ||
				workspaceFolders?.length === 0) {
				vscode.window.showInformationMessage(`Workspace is empty. Cannot look for Symfony execution profiles`);
				return Promise.resolve([]);
			}

			workspaceFolders?.forEach(folder => {
				const item = WorkspaceInspector.buildWorkspaceProfileTreeItem(folder);
				if (item) {
					sessions.push(item);
				}
			});
		}
		return Promise.resolve(sessions);
	}

	getParent?(element: WorkspaceTreeItem): vscode.ProviderResult<WorkspaceTreeItem> {
		throw new Error('Method not implemented.');
	}
	resolveTreeItem?(item: vscode.TreeItem, element: WorkspaceTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
		throw new Error('Method not implemented.');
	}

	refresh(sortType: SortTypes) {
		this.profilerSortType = sortType;
		this._onDidChangeTreeData.fire();
	}

}
