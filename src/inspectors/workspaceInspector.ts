import * as vscode from 'vscode';
import { PHPProject } from '../entities/phpProject';
import { WorkspaceTreeItem } from '../treeItems/workspaceTreeItem';

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
			phpProject
		);
	}
}