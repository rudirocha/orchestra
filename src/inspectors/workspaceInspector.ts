import * as vscode from 'vscode';
import { PHPProject } from '../entities/phpProject';
import { WorkspaceTreeItem } from '../treeItems/workspaceTreeItem';
import { TreeItemType } from '../enums/treeItemType';

export class WorkspaceInspector {
	static buildWorkspaceProfileTreeItem(folder: vscode.WorkspaceFolder) {
		const phpProject = new PHPProject(folder.uri.path);
		
		if (phpProject.frameworkVersion === undefined) {
			return null;
		}

		return new WorkspaceTreeItem(
			folder.name,
			phpProject.frameworkVersion,
			vscode.TreeItemCollapsibleState.Collapsed,
			phpProject,
			TreeItemType.Workspace
		);
	}
}