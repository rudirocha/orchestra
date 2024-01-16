import * as assert from 'assert';
import { WorkspaceTreeItem } from '../../treeItems/workspaceTreeItem';
import { TreeItemCollapsibleState } from 'vscode';
import { TreeItemType } from '../../enums/treeItemType';
import { PHPProject } from '../../entities/phpProject';
import * as path from 'path';

suite('Workspace Tree Item', () => {
    test('Tooltip has the same value as the Label', () => {
        const workspaceTreeItem = new WorkspaceTreeItem(
            'the Label',
            ' A description',
            TreeItemCollapsibleState.None,
            new PHPProject(path.resolve('src/test/mocks/composerFiles/valid')),
            TreeItemType.Workspace
         );
        assert.strictEqual(workspaceTreeItem.label, 'the Label');
        assert.strictEqual(workspaceTreeItem.tooltip, workspaceTreeItem.label);
    });
});