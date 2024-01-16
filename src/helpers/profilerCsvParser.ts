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
            rows.forEach((row: any) => {
                profiles.push(new SymfonyProfile(
                    row.token,
                    row.idAddress,
                    row.method,
                    row.url,
                    row.statusCode,
                    new Date(row.time)
                ));
            });
        }
        return profiles;
    }
}