import * as vscode from 'vscode';
import { WorkspaceInspector } from '../inspectors/workspaceInspector';
import { WorkspaceTreeItem } from '../treeItems/workspaceTreeItem';
import { ProfileInspector } from '../inspectors/profilerInspector';
import { SortTypes } from '../enums/sortTypes';
import { ProfileTreeItem } from '../treeItems/profileTreeItem';

export class SymfonyProfilerProvider implements vscode.TreeDataProvider<vscode.TreeItem> {

	private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined | null | void> = new vscode.EventEmitter<vscode.TreeItem | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined | null | void> = this._onDidChangeTreeData.event;
	private profilerSortType: SortTypes = SortTypes.DESC;

	constructor() {
        setInterval(() => {
			if (vscode.workspace.isTrusted && vscode.workspace.workspaceFolders?.length) {
				this._onDidChangeTreeData.fire();
			}
		}
			, 10000);
    }

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

		} else if (element && element instanceof ProfileTreeItem) {
			element.profileObject.childProfiles.forEach((p => {
				sessions.push(ProfileInspector.buildProfileTreeItem(p));
			}));

		} else {
			const workspaceFolders = vscode.workspace.workspaceFolders;
			// Validate the workspace is not empty
			if (workspaceFolders === undefined ||
				workspaceFolders?.length === 0 ||
				!vscode.workspace.isTrusted) {
				vscode.window.showInformationMessage(`Workspace is empty or not trusted. Cannot look for Symfony execution profiles`);
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
		throw new Error('getParent :: Method not implemented.');
	}
	resolveTreeItem?(item: vscode.TreeItem, element: WorkspaceTreeItem, token: vscode.CancellationToken): vscode.ProviderResult<vscode.TreeItem> {
		throw new Error('resolveTreeItem :: Method not implemented.');
	}

	refresh(sortType: SortTypes) {
		this.profilerSortType = sortType;
		this._onDidChangeTreeData.fire();
	}

}
