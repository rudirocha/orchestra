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

    static buildProfileTreeItems(phpProject: PHPProject, sortDescending: boolean = true): ProfileTreeItem[] {
        const profilerPath = `${phpProject.rootPath}${phpProject.getProfilerFilePath()}`;
        const treeItems: Array<ProfileTreeItem> = [];

        let profiles = ProfilerCsvParser.getProfileRows(profilerPath);

        if (sortDescending) {
            profiles = profiles.sort((a,b) => (a.createdAt > b.createdAt ? 1 : -1));
        }
 
        profiles.forEach((profile: SymfonyProfile) => {
            treeItems.push(
                this.buildProfileTreeItem(profile)
            );
        });
        
        return treeItems;
    } 

    static buildProfileTreeItem(profile: SymfonyProfile) {
        return new ProfileTreeItem(
            `${profile.token} - HTTP ${profile.statusCode}`,
            '',
            profile
        );
    }
}