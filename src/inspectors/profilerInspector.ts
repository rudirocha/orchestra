import { PHPProject } from "../entities/phpProject";
import { ProfileTreeItem } from "../treeItems/profileTreeItem";
import { ProfilerCsvParser } from "../helpers/profilerCsvParser";
import { SymfonyProfile } from "../entities/symfonyProfile";

export class ProfileInspector {
    
    readonly phpProject: PHPProject | undefined;
    readonly profilesPath: string | undefined;
    
    constructor(phpProject: PHPProject, path: string) {
        this.phpProject = phpProject;
        this.profilesPath = path;

    }

    static buildProfileTreeItems(phpProject: PHPProject): ProfileTreeItem[] {
        const profilerPath = `${phpProject.rootPath}${phpProject.getProfilerFilePath()}`;
        const treeItems: Array<ProfileTreeItem> = [];

        ProfilerCsvParser.getProfileRows(profilerPath).forEach((profile: SymfonyProfile) => {
            treeItems.push(
                new ProfileTreeItem(
                    `${profile.token} - HTTP ${profile.statusCode}`,
                    '',
                    profile
                )
            );
        });
        
        return treeItems;
    } 
}