import * as fs from 'fs';
import { PHPFramework } from '../enums/phpFramework';

export class PHPProject {
	public readonly rootPath: string;
	public readonly composerFilePath: string;
	
	public frameworkVersion: PHPFramework | undefined = undefined;

	constructor(path: string) {
		this.rootPath = path;
		this.composerFilePath = `${this.rootPath}/composer.json`;

		this.initialize();
	}

	initialize() {
		if (undefined !== this.composerFilePath && !fs.existsSync(this.composerFilePath)) {
			throw new Error(`No such file ${this.composerFilePath}`);
		}
		const composerContent = this.getComposerContent();

		this.frameworkVersion = this.getMappedFramework(composerContent['require']);
	}

    getProfilerFilePath() {
        switch (this.frameworkVersion) {
            case PHPFramework.Symfony7:
                return '/var/cache/dev/profiler/index.csv';
        }
        return undefined;
    }

	/**
	 * 
	 * @param requiredDependencies 
	 * @todo: take care of this ANY type dependency
	 */
	getMappedFramework(requiredDependencies: any): PHPFramework | undefined {
		// Is it Symfony framework?
		//@TODO: make this code block more performant
		if (requiredDependencies && requiredDependencies['symfony/framework-bundle'] !== undefined) {
			const dependency: string = requiredDependencies['symfony/framework-bundle'];
			switch (dependency.substring(0, 1)) {
				case ('5'):
					return PHPFramework.Symfony5;
				case ('6'):
					return PHPFramework.Symfony6;
				case ('7'):
					return PHPFramework.Symfony7;
			}
		}
		return undefined;
	}

	getComposerContent() {
		return JSON.parse(fs.readFileSync(this.composerFilePath, 'utf-8'));
	}
}