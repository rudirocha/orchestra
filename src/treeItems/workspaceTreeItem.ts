import * as vscode from 'vscode';
import { TreeItemType } from '../enums/treeItemType';
import { PHPProject } from '../entities/phpProject';

export class WorkspaceTreeItem extends vscode.TreeItem {
	constructor(
		public readonly label: string,
		public readonly description: string,
		public readonly collapsibleState: vscode.TreeItemCollapsibleState,
        public readonly phpProject: PHPProject,
        public readonly treeItemType: TreeItemType | undefined
	) {
		super(label, collapsibleState);
		this.tooltip = `${this.label}`;
	}
}