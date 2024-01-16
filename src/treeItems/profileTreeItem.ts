import * as vscode from 'vscode';
import { SymfonyProfile } from '../entities/symfonyProfile';

export class ProfileTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
		public readonly description: string,
        public readonly profileObject: SymfonyProfile
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        
        if (profileObject.url) {
            this.command = {
                command: 'vscode.open',
                title: 'Inspect profile',
                arguments: [
                    profileObject.getProfileWebLink()
                ]
            };
        }
    }
}