import * as csvParser from 'csv-parse/sync';
import * as fs from 'fs';
import { SymfonyProfile } from '../entities/symfonyProfile';

export class ProfilerCsvParser {
    static getProfileRows(filePath: string) {
        const profiles: Array<SymfonyProfile> = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const rows = csvParser.parse(
                fileContent, {
                delimiter: ',',
                escape: null,
                columns: ['token', 'ipAddress', 'method', 'url', 'time', 'parent', 'statusCode', 'virtualCode'],
                skip_empty_lines: true
            }
            );
            let rootProfiles = rows.filter((r: { parent: string; }) => r.parent === '');

            rootProfiles.forEach((row: any) => {

                const profile = new SymfonyProfile(
                    row.token,
                    row.idAddress,
                    row.method,
                    row.url,
                    row.statusCode,
                    new Date(row.time)
                );
                profile.childProfiles.push(...this.getProfilesByParent(profile.token, rows));

                profiles.push(profile);
            });
        }
        return profiles;
    }

    static getProfilesByParent(parent:string, profilesList:any ) {
        const childProfiles = profilesList.filter((r: { parent: string; }) => r.parent === parent);

        if (!childProfiles) { return []; }
        const profiles:Array<SymfonyProfile> = [];

        childProfiles.forEach((p: any) => {

            const profile = new SymfonyProfile(
                p.token,
                p.idAddress,
                p.method,
                p.url,
                p.statusCode,
                new Date(p.time)
            );

            profile.childProfiles.push(...this.getProfilesByParent(profile.token, profilesList));

            profiles.push(profile);
        });

        return profiles;
    }
}