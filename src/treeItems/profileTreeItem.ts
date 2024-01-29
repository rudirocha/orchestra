import * as vscode from 'vscode';
import * as path from 'path';
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

        this.iconPath = {
            light: path.join(__filename, '..', '..', '..', 'resources', 'light', (profileObject.httpMethod || '').toLowerCase()+'.svg'),
            dark: path.join(__filename, '..', '..', '..', 'resources', 'dark',  (profileObject.httpMethod || '').toLowerCase()+'.svg')
          };

    }
}